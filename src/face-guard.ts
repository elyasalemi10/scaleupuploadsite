import * as faceapi from '@vladmandic/face-api';
import { storage, UserDescriptor } from './storage';
import { 
  throttle, 
  drawBox, 
  resizeCanvas, 
  getOptimalInputSize,
  getAdjustedThreshold,
  formatFileSize,
  isValidDescriptor,
  descriptorToArray,
  arrayToDescriptor,
  Box
} from './face-guard-utils';

interface FaceGuardEvents {
  'faceguard:recognised': CustomEvent<{ label: string; distance: number; box: Box }>;
  'faceguard:unknown': CustomEvent<{ distance: number; box: Box }>;
  'faceguard:enrolled': CustomEvent<{ label: string; count: number }>;
  'faceguard:error': CustomEvent<{ message: string; error?: Error }>;
  'faceguard:status': CustomEvent<{ status: string; isLoading?: boolean }>;
}

declare global {
  interface HTMLElementEventMap extends FaceGuardEvents {}
}

export class FaceGuardElement extends HTMLElement {
  private video!: HTMLVideoElement;
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private stream: MediaStream | null = null;
  private isStarted = false;
  private isModelsLoaded = false;
  private animationId: number | null = null;
  private faceMatcher: faceapi.FaceMatcher | null = null;
  private users: UserDescriptor[] = [];
  
  // Controls
  private startBtn!: HTMLButtonElement;
  private stopBtn!: HTMLButtonElement;
  private enrollBtn!: HTMLButtonElement;
  private clearBtn!: HTMLButtonElement;
  private exportBtn!: HTMLButtonElement;
  private importBtn!: HTMLButtonElement;
  private importInput!: HTMLInputElement;
  private nameInput!: HTMLInputElement;
  private statusDiv!: HTMLDivElement;
  private usersDiv!: HTMLDivElement;
  
  // Settings
  private threshold = 0.55;
  private fps = 24;
  private maxFaces = 5;
  private inputSize = 320;
  
  // Throttled detection function
  private throttledDetect: () => void;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.throttledDetect = throttle(this.detectFaces.bind(this), this.fps);
    this.init();
  }

  static get observedAttributes() {
    return ['threshold', 'fps', 'max-faces'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    
    switch (name) {
      case 'threshold':
        this.threshold = parseFloat(newValue) || 0.55;
        this.rebuildMatcher();
        break;
      case 'fps':
        this.fps = parseInt(newValue) || 24;
        this.throttledDetect = throttle(this.detectFaces.bind(this), this.fps);
        break;
      case 'max-faces':
        this.maxFaces = parseInt(newValue) || 5;
        break;
    }
  }

  connectedCallback() {
    this.loadModelsAndInit();
  }

  disconnectedCallback() {
    this.stop();
  }

  private async init() {
    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          border: 1px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
          background: #fff;
        }
        
        .container {
          padding: 20px;
        }
        
        .video-container {
          position: relative;
          background: #000;
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 20px;
        }
        
        video {
          width: 100%;
          height: auto;
          display: block;
          transform: scaleX(-1);
        }
        
        canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transform: scaleX(-1);
          pointer-events: none;
        }
        
        .controls {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 20px;
          align-items: center;
        }
        
        .enroll-controls {
          display: flex;
          gap: 10px;
          align-items: center;
          flex: 1;
        }
        
        button {
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          transition: background-color 0.2s;
        }
        
        button:disabled {
          cursor: not-allowed;
          opacity: 0.6;
        }
        
        .start-btn {
          background: #4CAF50;
          color: white;
        }
        
        .start-btn:hover:not(:disabled) {
          background: #45a049;
        }
        
        .stop-btn {
          background: #f44336;
          color: white;
        }
        
        .stop-btn:hover:not(:disabled) {
          background: #da190b;
        }
        
        .enroll-btn {
          background: #2196F3;
          color: white;
        }
        
        .enroll-btn:hover:not(:disabled) {
          background: #1976D2;
        }
        
        .clear-btn, .export-btn, .import-btn {
          background: #ff9800;
          color: white;
        }
        
        .clear-btn:hover:not(:disabled),
        .export-btn:hover:not(:disabled),
        .import-btn:hover:not(:disabled) {
          background: #f57c00;
        }
        
        input[type="text"] {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
          flex: 1;
          min-width: 120px;
        }
        
        input[type="file"] {
          display: none;
        }
        
        .status {
          padding: 10px;
          border-radius: 4px;
          margin-bottom: 15px;
          font-size: 14px;
        }
        
        .status.loading {
          background: #e3f2fd;
          color: #1976d2;
        }
        
        .status.ready {
          background: #e8f5e8;
          color: #4caf50;
        }
        
        .status.error {
          background: #ffebee;
          color: #f44336;
        }
        
        .users {
          border-top: 1px solid #eee;
          padding-top: 15px;
        }
        
        .users h3 {
          margin: 0 0 10px 0;
          font-size: 16px;
          color: #333;
        }
        
        .user-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        
        .user-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          background: #f5f5f5;
          border-radius: 16px;
          font-size: 12px;
          color: #333;
        }
        
        .user-chip .count {
          background: #2196f3;
          color: white;
          padding: 2px 6px;
          border-radius: 10px;
          font-size: 10px;
        }
        
        .user-chip .delete {
          cursor: pointer;
          color: #f44336;
          font-weight: bold;
          margin-left: 4px;
        }
        
        .user-chip .delete:hover {
          color: #d32f2f;
        }
        
        .no-users {
          color: #999;
          font-style: italic;
          font-size: 14px;
        }
        
        @media (max-width: 600px) {
          .controls {
            flex-direction: column;
            align-items: stretch;
          }
          
          .enroll-controls {
            flex-direction: column;
          }
        }
      </style>
      
      <div class="container">
        <div class="video-container">
          <video autoplay muted playsinline></video>
          <canvas></canvas>
        </div>
        
        <div class="status loading">Loading AI models...</div>
        
        <div class="controls">
          <button class="start-btn" disabled>Start Camera</button>
          <button class="stop-btn" disabled>Stop Camera</button>
          
          <div class="enroll-controls">
            <input type="text" placeholder="Enter name to enroll" disabled>
            <button class="enroll-btn" disabled>Add User</button>
          </div>
          
          <button class="clear-btn" disabled>Clear All</button>
          <button class="export-btn" disabled>Export</button>
          <button class="import-btn" disabled>Import</button>
          <input type="file" accept=".json">
        </div>
        
        <div class="users">
          <h3>Enrolled Users</h3>
          <div class="user-chips">
            <div class="no-users">No users enrolled</div>
          </div>
        </div>
      </div>
    `;
    
    this.setupElements();
    this.setupEventListeners();
  }

  private setupElements() {
    const shadow = this.shadowRoot!;
    
    this.video = shadow.querySelector('video')!;
    this.canvas = shadow.querySelector('canvas')!;
    this.ctx = this.canvas.getContext('2d')!;
    
    this.startBtn = shadow.querySelector('.start-btn')!;
    this.stopBtn = shadow.querySelector('.stop-btn')!;
    this.enrollBtn = shadow.querySelector('.enroll-btn')!;
    this.clearBtn = shadow.querySelector('.clear-btn')!;
    this.exportBtn = shadow.querySelector('.export-btn')!;
    this.importBtn = shadow.querySelector('.import-btn')!;
    this.importInput = shadow.querySelector('input[type="file"]')!;
    this.nameInput = shadow.querySelector('input[type="text"]')!;
    this.statusDiv = shadow.querySelector('.status')!;
    this.usersDiv = shadow.querySelector('.user-chips')!;
  }

  private setupEventListeners() {
    this.startBtn.addEventListener('click', () => this.start());
    this.stopBtn.addEventListener('click', () => this.stop());
    this.enrollBtn.addEventListener('click', () => this.enrollCurrentFace());
    this.clearBtn.addEventListener('click', () => this.clearUsers());
    this.exportBtn.addEventListener('click', () => this.exportUsers());
    this.importBtn.addEventListener('click', () => this.importInput.click());
    this.importInput.addEventListener('change', (e) => this.importUsers(e));
    
    this.nameInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.enrollCurrentFace();
      }
    });
  }

  private async loadModelsAndInit() {
    try {
      this.updateStatus('Loading AI models...', true);
      
      // Initialize storage
      await storage.init();
      
      // Load face-api models
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
      
      this.isModelsLoaded = true;
      this.updateStatus('Models loaded. Ready to start!', false);
      
      // Load saved users
      await this.loadUsers();
      
      this.enableControls();
      
    } catch (error) {
      console.error('Error loading models:', error);
      this.updateStatus('Error loading AI models. Please refresh.', false);
      this.dispatchEvent(new CustomEvent('faceguard:error', {
        detail: { message: 'Failed to load AI models', error: error as Error }
      }));
    }
  }

  private async loadUsers() {
    try {
      this.users = await storage.getUsers();
      this.rebuildMatcher();
      this.updateUsersDisplay();
    } catch (error) {
      console.error('Error loading users:', error);
    }
  }

  private rebuildMatcher() {
    if (this.users.length === 0) {
      this.faceMatcher = null;
      return;
    }

    try {
      const labeledDescriptors: faceapi.LabeledFaceDescriptors[] = [];
      
      for (const user of this.users) {
        const descriptors = user.descriptors.map(desc => arrayToDescriptor(desc));
        labeledDescriptors.push(
          new faceapi.LabeledFaceDescriptors(user.label, descriptors)
        );
      }
      
      const adjustedThreshold = getAdjustedThreshold(this.threshold, this.inputSize);
      this.faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, adjustedThreshold);
      
    } catch (error) {
      console.error('Error building face matcher:', error);
      this.faceMatcher = null;
    }
  }

  private enableControls() {
    this.startBtn.disabled = false;
    this.nameInput.disabled = false;
    this.clearBtn.disabled = false;
    this.exportBtn.disabled = false;
    this.importBtn.disabled = false;
  }

  private updateStatus(message: string, isLoading: boolean = false) {
    this.statusDiv.textContent = message;
    this.statusDiv.className = `status ${isLoading ? 'loading' : 'ready'}`;
    
    this.dispatchEvent(new CustomEvent('faceguard:status', {
      detail: { status: message, isLoading }
    }));
  }

  private updateUsersDisplay() {
    if (this.users.length === 0) {
      this.usersDiv.innerHTML = '<div class="no-users">No users enrolled</div>';
      return;
    }

    const chips = this.users.map(user => `
      <div class="user-chip">
        <span>${user.label}</span>
        <span class="count">${user.descriptors.length}</span>
        <span class="delete" data-label="${user.label}">×</span>
      </div>
    `).join('');
    
    this.usersDiv.innerHTML = chips;
    
    // Add delete listeners
    this.usersDiv.querySelectorAll('.delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const label = (e.target as HTMLElement).dataset.label!;
        this.deleteUser(label);
      });
    });
  }

  // Public API Methods
  
  async start(): Promise<void> {
    if (!this.isModelsLoaded || this.isStarted) return;

    try {
      this.updateStatus('Starting camera...', true);
      
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        }
      });
      
      this.video.srcObject = this.stream;
      
      await new Promise<void>((resolve) => {
        this.video.onloadedmetadata = () => {
          this.video.play();
          
          // Set optimal input size based on video resolution
          this.inputSize = getOptimalInputSize(this.video.videoWidth, this.video.videoHeight);
          
          resizeCanvas(this.canvas, this.video);
          resolve();
        };
      });
      
      this.isStarted = true;
      this.updateStatus(`Camera started (${this.video.videoWidth}x${this.video.videoHeight})`, false);
      
      this.startBtn.disabled = true;
      this.stopBtn.disabled = false;
      this.enrollBtn.disabled = false;
      
      this.startDetectionLoop();
      
    } catch (error) {
      console.error('Error starting camera:', error);
      this.updateStatus('Error accessing camera. Please allow camera access.', false);
      this.dispatchEvent(new CustomEvent('faceguard:error', {
        detail: { message: 'Failed to access camera', error: error as Error }
      }));
    }
  }

  stop(): void {
    if (!this.isStarted) return;

    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }

    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }

    this.video.srcObject = null;
    this.isStarted = false;
    
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.updateStatus('Camera stopped', false);
    
    this.startBtn.disabled = false;
    this.stopBtn.disabled = true;
    this.enrollBtn.disabled = true;
  }

  async enroll(name: string): Promise<void> {
    if (!name.trim()) {
      throw new Error('Name is required for enrollment');
    }

    if (!this.isStarted) {
      throw new Error('Camera must be started before enrollment');
    }

    try {
      this.updateStatus('Detecting face for enrollment...', true);
      
      const detection = await faceapi.detectSingleFace(
        this.video, 
        new faceapi.TinyFaceDetectorOptions({ inputSize: this.inputSize })
      ).withFaceLandmarks().withFaceDescriptor();

      if (!detection) {
        throw new Error('No face detected. Please ensure your face is clearly visible.');
      }

      const descriptor = descriptorToArray(detection.descriptor);
      
      if (!isValidDescriptor(descriptor)) {
        throw new Error('Invalid face descriptor generated');
      }

      // Find or create user
      let user = this.users.find(u => u.label === name.trim());
      if (!user) {
        user = {
          label: name.trim(),
          descriptors: [],
          createdAt: Date.now()
        };
        this.users.push(user);
      }

      // Add descriptor
      user.descriptors.push(descriptor);
      
      // Save to storage
      await storage.saveUser(user);
      
      // Rebuild matcher
      this.rebuildMatcher();
      this.updateUsersDisplay();
      
      this.updateStatus(`Enrolled ${name.trim()} (${user.descriptors.length} samples)`, false);
      
      this.dispatchEvent(new CustomEvent('faceguard:enrolled', {
        detail: { label: name.trim(), count: user.descriptors.length }
      }));
      
    } catch (error) {
      console.error('Enrollment error:', error);
      this.updateStatus('Enrollment failed. ' + (error as Error).message, false);
      this.dispatchEvent(new CustomEvent('faceguard:error', {
        detail: { message: 'Enrollment failed', error: error as Error }
      }));
      throw error;
    }
  }

  async clearUsers(): Promise<void> {
    if (confirm('Are you sure you want to delete all enrolled users?')) {
      try {
        await storage.clearAll();
        this.users = [];
        this.faceMatcher = null;
        this.updateUsersDisplay();
        this.updateStatus('All users cleared', false);
      } catch (error) {
        console.error('Error clearing users:', error);
      }
    }
  }

  async exportUsers(): Promise<void> {
    try {
      const data = await storage.exportData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `faceguard-users-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      
      URL.revokeObjectURL(url);
      
      this.updateStatus(`Exported ${this.users.length} users (${formatFileSize(blob.size)})`, false);
      
    } catch (error) {
      console.error('Export error:', error);
      this.updateStatus('Export failed', false);
    }
  }

  async importUsers(event: Event): Promise<void> {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    try {
      this.updateStatus('Importing users...', true);
      
      const text = await file.text();
      const data = JSON.parse(text);
      
      if (!data.users || !Array.isArray(data.users)) {
        throw new Error('Invalid file format');
      }

      await storage.importData(data);
      await this.loadUsers();
      
      this.updateStatus(`Imported ${data.users.length} users`, false);
      
    } catch (error) {
      console.error('Import error:', error);
      this.updateStatus('Import failed. Please check file format.', false);
    } finally {
      // Reset file input
      (event.target as HTMLInputElement).value = '';
    }
  }

  private async enrollCurrentFace() {
    const name = this.nameInput.value.trim();
    if (!name) {
      alert('Please enter a name');
      return;
    }

    try {
      await this.enroll(name);
      this.nameInput.value = '';
    } catch (error) {
      // Error already handled in enroll method
    }
  }

  private async deleteUser(label: string) {
    if (confirm(`Delete user "${label}"?`)) {
      try {
        await storage.deleteUser(label);
        this.users = this.users.filter(u => u.label !== label);
        this.rebuildMatcher();
        this.updateUsersDisplay();
        this.updateStatus(`Deleted user ${label}`, false);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  }

  private startDetectionLoop() {
    const detect = () => {
      if (this.isStarted && this.video.readyState === 4) {
        this.throttledDetect();
      }
      
      if (this.isStarted) {
        this.animationId = requestAnimationFrame(detect);
      }
    };
    
    detect();
  }

  private async detectFaces() {
    try {
      const detections = await faceapi.detectAllFaces(
        this.video,
        new faceapi.TinyFaceDetectorOptions({ inputSize: this.inputSize })
      ).withFaceLandmarks().withFaceDescriptors();

      // Clear canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      if (detections.length === 0) return;

      // Limit to maxFaces
      const limitedDetections = detections.slice(0, this.maxFaces);

      for (const detection of limitedDetections) {
        const box = {
          x: detection.detection.box.x,
          y: detection.detection.box.y,
          width: detection.detection.box.width,
          height: detection.detection.box.height
        };

        if (this.faceMatcher) {
          const match = this.faceMatcher.findBestMatch(detection.descriptor);
          const isRecognized = match.label !== 'unknown';
          
          if (isRecognized) {
            drawBox(this.ctx, box, {
              color: '#4CAF50',
              lineWidth: 3,
              label: match.label,
              distance: match.distance
            });
            
            this.dispatchEvent(new CustomEvent('faceguard:recognised', {
              detail: { label: match.label, distance: match.distance, box }
            }));
          } else {
            drawBox(this.ctx, box, {
              color: '#f44336',
              lineWidth: 3,
              distance: match.distance
            });
            
            this.dispatchEvent(new CustomEvent('faceguard:unknown', {
              detail: { distance: match.distance, box }
            }));
          }
        } else {
          // No users enrolled, show all as unknown
          drawBox(this.ctx, box, {
            color: '#ff9800',
            lineWidth: 3,
            label: 'No users enrolled'
          });
        }
      }
    } catch (error) {
      console.error('Detection error:', error);
    }
  }
}

// Register the custom element
customElements.define('face-guard', FaceGuardElement);
