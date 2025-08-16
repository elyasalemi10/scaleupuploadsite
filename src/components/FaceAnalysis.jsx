import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import { Camera } from 'lucide-react';

const FaceAnalysis = () => {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [permissionState, setPermissionState] = useState('requesting');
  const detectionInterval = useRef();

  // Load face-api models and auto-start camera
  useEffect(() => {
    const initializeComponent = async () => {
      try {
        // Load all models for comprehensive face analysis
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
        await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
        await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
        await faceapi.nets.faceExpressionNet.loadFromUri('/models');
        await faceapi.nets.ageGenderNet.loadFromUri('/models');
        
        // Auto-start camera
        await startCamera();
      } catch (error) {
        console.error('Error loading models:', error);
        // Try to start camera anyway
        await startCamera();
      }
    };
    initializeComponent();
  }, []);

  // Start camera function
  const startCamera = async () => {
    try {
      setPermissionState('requesting');
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: 'user' }
      });
      
      videoRef.current.srcObject = stream;
      setPermissionState('granted');
      
      // Start face detection
      videoRef.current.onloadedmetadata = () => {
        startDetection();
      };
    } catch (error) {
      console.error('Error accessing camera:', error);
      setPermissionState('denied');
    }
  };

  // Start face detection loop
  const startDetection = () => {
    detectionInterval.current = setInterval(async () => {
      await detectFaces();
    }, 50); // 20 FPS for real-time
  };

  // Detect faces and analyze
  const detectFaces = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (!video || !canvas || video.paused || video.ended) return;

    const displaySize = { width: video.videoWidth, height: video.videoHeight };
    canvas.width = displaySize.width;
    canvas.height = displaySize.height;

    try {
      // Detect faces with all features
      const detections = await faceapi.detectAllFaces(
        video, 
        new faceapi.TinyFaceDetectorOptions({ inputSize: 416 })
      )
      .withFaceLandmarks()
      .withFaceExpressions()
      .withAgeAndGender();

      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (detections.length > 0) {
        const detection = detections[0]; // Use first face
        const { x, y, width, height } = detection.detection.box;
        
        // Draw blue bounding box
        ctx.strokeStyle = '#3b82f6'; // Blue color
        ctx.lineWidth = 3;
        ctx.strokeRect(x, y, width, height);
        
        // Get analysis data
        const expressions = detection.expressions;
        const topExpression = Object.entries(expressions)
          .sort(([,a], [,b]) => b - a)[0];
        
        const faceData = {
          confidence: (detection.detection.score * 100).toFixed(1),
          age: Math.round(detection.age),
          gender: detection.gender,
          genderConfidence: (detection.genderProbability * 100).toFixed(1),
          emotion: topExpression[0],
          emotionConfidence: (topExpression[1] * 100).toFixed(1)
        };

        // Draw information next to the face box
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.font = '14px Arial';
        
        const infoX = x + width + 10;
        let infoY = y + 20;
        
        // Background for text
        const texts = [
          `Confidence: ${faceData.confidence}%`,
          `Age: ${faceData.age}`,
          `Gender: ${faceData.gender} (${faceData.genderConfidence}%)`,
          `Emotion: ${faceData.emotion} (${faceData.emotionConfidence}%)`
        ];
        
        const textWidth = Math.max(...texts.map(text => ctx.measureText(text).width));
        const textHeight = texts.length * 20 + 10;
        
        // Draw background rectangle
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(infoX - 5, infoY - 15, textWidth + 15, textHeight);
        
        // Draw text
        ctx.fillStyle = '#ffffff';
        texts.forEach((text, index) => {
          ctx.fillText(text, infoX, infoY + (index * 20));
        });
      }
    } catch (error) {
      console.error('Detection error:', error);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
      if (detectionInterval.current) {
        clearInterval(detectionInterval.current);
      }
    };
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Video Container - Full width, no grid */}
      <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video max-w-4xl mx-auto">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{ transform: 'scaleX(-1)' }}
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
          style={{ transform: 'scaleX(-1)' }}
        />
        
        {/* Loading/Permission States */}
        {permissionState === 'requesting' && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-90">
            <div className="text-center text-white">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-lg">Requesting camera access...</p>
            </div>
          </div>
        )}
        
        {permissionState === 'denied' && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-90">
            <div className="text-center text-white">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8" />
              </div>
              <p className="text-lg mb-4">Permission Needed</p>
              <button
                onClick={startCamera}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Grant Permission
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FaceAnalysis;
