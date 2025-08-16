export interface Box {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface DetectionResult {
  box: Box;
  label?: string;
  distance?: number;
  isRecognized: boolean;
}

/**
 * Throttle function execution to a specific FPS
 */
export function throttle(func: Function, fps: number): () => void {
  let lastCall = 0;
  const interval = 1000 / fps;

  return function(this: any, ...args: any[]) {
    const now = Date.now();
    if (now - lastCall >= interval) {
      lastCall = now;
      func.apply(this, args);
    }
  };
}

/**
 * Draw a bounding box on canvas
 */
export function drawBox(
  ctx: CanvasRenderingContext2D,
  box: Box,
  options: {
    color: string;
    lineWidth: number;
    label?: string;
    distance?: number;
  }
): void {
  const { x, y, width, height } = box;
  const { color, lineWidth, label, distance } = options;

  // Draw bounding box
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.strokeRect(x, y, width, height);

  // Draw label and distance if provided
  if (label || distance !== undefined) {
    const text = label 
      ? distance !== undefined 
        ? `${label} (${distance.toFixed(2)})`
        : label
      : distance !== undefined 
        ? `Unknown (${distance.toFixed(2)})`
        : 'Unknown';

    // Text background
    ctx.font = '14px Arial';
    const textMetrics = ctx.measureText(text);
    const textWidth = textMetrics.width;
    const textHeight = 20;
    
    const textX = x;
    const textY = y > textHeight ? y - 5 : y + height + textHeight;
    
    ctx.fillStyle = color;
    ctx.fillRect(textX, textY - textHeight, textWidth + 10, textHeight);
    
    // Text
    ctx.fillStyle = 'white';
    ctx.fillText(text, textX + 5, textY - 5);
  }
}

/**
 * Resize canvas to match video dimensions
 */
export function resizeCanvas(canvas: HTMLCanvasElement, video: HTMLVideoElement): void {
  const { videoWidth, videoHeight } = video;
  if (videoWidth && videoHeight) {
    canvas.width = videoWidth;
    canvas.height = videoHeight;
    canvas.style.width = `${videoWidth}px`;
    canvas.style.height = `${videoHeight}px`;
  }
}

/**
 * Get optimal input size for face detection based on video dimensions
 */
export function getOptimalInputSize(videoWidth: number, videoHeight: number): number {
  const minSize = 160;
  const maxSize = 416;
  
  // Calculate based on video resolution
  const maxDimension = Math.max(videoWidth, videoHeight);
  
  if (maxDimension <= 480) return Math.max(minSize, Math.min(224, maxDimension));
  if (maxDimension <= 720) return Math.max(224, Math.min(320, maxDimension / 2));
  if (maxDimension <= 1080) return Math.max(320, Math.min(384, maxDimension / 3));
  
  return Math.min(maxSize, maxDimension / 4);
}

/**
 * Calculate distance threshold based on input size for better accuracy
 */
export function getAdjustedThreshold(baseThreshold: number, inputSize: number): number {
  // Smaller input sizes need slightly higher thresholds due to less detail
  const factor = inputSize < 224 ? 1.1 : inputSize > 384 ? 0.95 : 1.0;
  return Math.min(1.0, baseThreshold * factor);
}

/**
 * Debounce function for UI updates
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: number;
  
  return function(this: any, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => func.apply(this, args), delay);
  };
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Validate face descriptor array
 */
export function isValidDescriptor(descriptor: any): descriptor is number[] {
  return Array.isArray(descriptor) && 
         descriptor.length === 128 && 
         descriptor.every(val => typeof val === 'number' && !isNaN(val));
}

/**
 * Convert Float32Array to regular number array for storage
 */
export function descriptorToArray(descriptor: Float32Array): number[] {
  return Array.from(descriptor);
}

/**
 * Convert number array back to Float32Array
 */
export function arrayToDescriptor(array: number[]): Float32Array {
  return new Float32Array(array);
}
