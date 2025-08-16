import React, { useState, useRef, useEffect } from 'react';
import * as faceapi from 'face-api.js';

const StandaloneFaceDetection = () => {
  const videoRef = useRef();
  const canvasRef = useRef();
  
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isVideoStarted, setIsVideoStarted] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Loading AI Models... 0%');
  const [showLoading, setShowLoading] = useState(true);
  const [showError, setShowError] = useState(false);
  const [errorText, setErrorText] = useState('');
  
  const detections = useRef([]);
  const lastDetectionTime = useRef(0);

  useEffect(() => {
    const init = async () => {
      await loadModels();
      if (isModelLoaded) {
        await startVideo();
      }
    };
    
    init();
    
    return () => {
      setIsDetecting(false);
    };
  }, []);

  // This effect runs when models are loaded
  useEffect(() => {
    if (isModelLoaded && !isVideoStarted) {
      startVideo();
    }
  }, [isModelLoaded]);

  // This effect starts detection when video is ready
  useEffect(() => {
    if (isVideoStarted && isModelLoaded && !isDetecting) {
      console.log('Starting detection with video ready...');
      setIsDetecting(true);
      // Call detectFaces directly with a flag to bypass state check
      setTimeout(() => {
        console.log('Actually calling detectFaces...');
        detectFacesForced();
      }, 200);
    }
  }, [isVideoStarted, isModelLoaded]);

  // Force detection to start regardless of isDetecting state
  const detectFacesForced = async () => {
    console.log('detectFacesForced called - bypassing state check');
    if (!videoRef.current || !canvasRef.current || !isModelLoaded) {
      console.log('Missing required elements for detection');
      return;
    }
    
    console.log('All elements available, starting forced detection...');
    // Set detecting to true and start the detection loop manually
    setIsDetecting(true);
    
    // Start detection directly without state dependency
    setTimeout(() => {
      console.log('Starting detection loop with forced flag...');
      detectFacesLoop();
    }, 100);
  };

  // Detection loop that runs regardless of state
  const detectFacesLoop = async () => {
    if (!videoRef.current || !canvasRef.current || !isModelLoaded) {
      // Don't stop completely, just skip this cycle
      setTimeout(() => detectFacesLoop(), 100);
      return;
    }

    try {
      const detectionResults = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions({ 
          inputSize: 512,
          scoreThreshold: 0.3
        }))
        .withFaceLandmarks()
        .withFaceExpressions()
        .withAgeAndGender();

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (detectionResults.length > 0) {
        const resizedDetections = faceapi.resizeResults(detectionResults, {
          width: canvas.width,
          height: canvas.height
        });

        resizedDetections.forEach((detection) => {
          drawDetection(detection, ctx);
        });
      }

    } catch (error) {
      console.error('Detection error:', error);
    }

    // Continue the loop with faster update rate
    const now = Date.now();
    if (now - lastDetectionTime.current >= 100) { // Faster: 100ms = ~10 FPS
      lastDetectionTime.current = now;
      setTimeout(() => detectFacesLoop(), 100);
    } else {
      setTimeout(() => detectFacesLoop(), 30);
    }
  };

  const updateProgress = (percentage, text) => {
    setLoadingProgress(percentage);
    setLoadingText(`${text} ${percentage}%`);
  };

  const loadModels = async () => {
    try {
      const modelPath = '/models';
      console.log('Starting to load models from:', modelPath);
      
      updateProgress(20, 'Loading face detector...');
      await faceapi.nets.tinyFaceDetector.loadFromUri(modelPath);
      console.log('Face detector loaded');
      
      updateProgress(40, 'Loading landmarks...');
      await faceapi.nets.faceLandmark68Net.loadFromUri(modelPath);
      console.log('Landmarks loaded');
      
      updateProgress(60, 'Loading face recognition...');
      await faceapi.nets.faceRecognitionNet.loadFromUri(modelPath);
      console.log('Face recognition loaded');
      
      updateProgress(80, 'Loading age/gender models...');
      await faceapi.nets.ageGenderNet.loadFromUri(modelPath);
      console.log('Age/gender loaded');
      
      updateProgress(90, 'Loading expression models...');
      await faceapi.nets.faceExpressionNet.loadFromUri(modelPath);
      console.log('Expression models loaded');
      
      updateProgress(100, 'Models loaded successfully!');
      setIsModelLoaded(true);
      console.log('All models loaded successfully');
      
      setTimeout(() => {
        setShowLoading(false);
      }, 500);
      
    } catch (error) {
      console.error('Error loading models:', error);
      showErrorMessage('Failed to load face detection models. Please check browser console for details.');
      return false;
    }
  };

  const showErrorMessage = (message) => {
    setErrorText(message);
    setShowError(true);
    setShowLoading(false);
  };

  const startVideo = async () => {
    try {
      console.log('Starting video...');
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        }
      });

      console.log('Got camera stream, setting up video...');
      videoRef.current.srcObject = stream;
      videoRef.current.onloadedmetadata = () => {
        console.log('Video metadata loaded, starting playback...');
        videoRef.current.play();
        setIsVideoStarted(true);
        setupCanvas();
        startDetection();
      };

    } catch (error) {
      console.error('Error accessing camera:', error);
      showErrorMessage('Failed to access camera. Please ensure you have granted camera permissions.');
    }
  };

  const setupCanvas = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    console.log('Setting up canvas:', video.videoWidth, 'x', video.videoHeight);
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
  };

  const startDetection = () => {
    console.log('Video ready, detection will start via useEffect...');
  };

  const detectFaces = async () => {
    const conditions = {
      video: !!videoRef.current,
      canvas: !!canvasRef.current,
      modelLoaded: isModelLoaded,
      detecting: isDetecting
    };
    console.log('detectFaces called, checking conditions:', conditions);
    
    if (!videoRef.current || !canvasRef.current || !isModelLoaded || !isDetecting) {
      console.log('Detection blocked - conditions not met. Failed checks:', {
        noVideo: !videoRef.current,
        noCanvas: !canvasRef.current,
        noModels: !isModelLoaded,
        notDetecting: !isDetecting
      });
      return; // Just return, don't retry
    }

    console.log('All conditions met, starting face detection...');
    try {
      const detectionResults = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions({ 
          inputSize: 512, // Higher resolution for better accuracy
          scoreThreshold: 0.3 // Lower threshold for better detection
        }))
        .withFaceLandmarks()
        .withFaceExpressions()
        .withAgeAndGender();

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (detectionResults.length > 0) {
        const resizedDetections = faceapi.resizeResults(detectionResults, {
          width: canvas.width,
          height: canvas.height
        });

        resizedDetections.forEach((detection) => {
          drawDetection(detection, ctx);
        });

        detections.current = detectionResults;
      } else {
        detections.current = [];
      }

    } catch (error) {
      console.error('Detection error:', error);
    }

    if (isDetecting) {
      // Use requestAnimationFrame for optimal performance, with minimum 50ms delay
      const now = Date.now();
      if (now - lastDetectionTime.current >= 50) {
        lastDetectionTime.current = now;
        requestAnimationFrame(() => detectFaces());
      } else {
        setTimeout(() => detectFaces(), 20);
      }
    }
  };

  const drawDetection = (detection, ctx) => {
    const { x, y, width, height } = detection.detection.box;
    
    // Draw bounding box with brighter blue for dark theme
    ctx.strokeStyle = '#60a5fa';
    ctx.lineWidth = 3;
    ctx.strokeRect(x, y, width, height);
    
    // Draw semi-transparent background for text
    const labelHeight = 80;
    const labelY = y > labelHeight ? y - labelHeight : y + height + 5;
    
    ctx.fillStyle = 'rgba(37, 99, 235, 0.95)';
    ctx.fillRect(x, labelY, Math.max(width, 150), labelHeight);
    
    // Draw text info
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'left';
    
    const age = Math.round(detection.age);
    const gender = detection.gender;
    const topExpression = getTopExpression(detection.expressions);
    const expressionConfidence = Math.round(detection.expressions[topExpression] * 100);
    
    ctx.fillText(`Age: ${age}`, x + 5, labelY + 18);
    ctx.fillText(`Gender: ${gender}`, x + 5, labelY + 36);
    ctx.fillText(`Emotion: ${topExpression}`, x + 5, labelY + 54);
    ctx.fillText(`Confidence: ${expressionConfidence}%`, x + 5, labelY + 72);
    
    // Draw landmarks with brighter red for dark theme
    ctx.fillStyle = '#f87171';
    detection.landmarks.positions.forEach(point => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 1.5, 0, 2 * Math.PI);
      ctx.fill();
    });
  };

  const getTopExpression = (expressions) => {
    return Object.entries(expressions).reduce((a, b) => 
      expressions[a[0]] > expressions[b[0]] ? a : b
    )[0];
  };

  const retryCamera = () => {
    setShowError(false);
    startVideo();
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Loading overlay */}
      {showLoading && (
        <div className="absolute inset-0 bg-gray-900 bg-opacity-95 flex items-center justify-center z-10 rounded-lg border border-gray-700">
          <div className="text-center text-white">
            <div className="w-64 h-3 bg-gray-700 rounded-full mb-4 mx-auto overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <p className="text-gray-200">{loadingText}</p>
          </div>
        </div>
      )}

      {/* Error overlay */}
      {showError && (
        <div className="absolute inset-0 bg-gray-900 bg-opacity-95 flex items-center justify-center z-10 rounded-lg border border-gray-700">
          <div className="text-center text-red-400 max-w-md">
            <p className="mb-4 text-gray-300">{errorText}</p>
            <button 
              onClick={retryCamera}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Retry Camera Access
            </button>
          </div>
        </div>
      )}

      {/* Video container */}
      <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl border border-gray-700">
        <video
          ref={videoRef}
          autoPlay
          muted
          className={`w-full h-auto block ${!isVideoStarted ? 'hidden' : ''}`}
        />
        <canvas
          ref={canvasRef}
          className={`absolute top-0 left-0 w-full h-full pointer-events-none ${!isVideoStarted ? 'hidden' : ''}`}
        />
        
        {/* Placeholder */}
        {!isVideoStarted && !showLoading && !showError && (
          <div className="w-full h-96 bg-gray-800 flex items-center justify-center border border-gray-700">
            <div className="text-center text-gray-300">
              <div className="w-16 h-16 border-4 border-gray-600 border-t-blue-400 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-lg">Initializing Camera...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StandaloneFaceDetection;