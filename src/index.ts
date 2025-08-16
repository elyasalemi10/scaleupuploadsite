// FaceGuard - Real-time Face Authentication Web Component
// Export all public APIs

export { FaceGuardElement } from './face-guard';
export { storage } from './storage';
export type { UserDescriptor, StorageData } from './storage';
export { 
  throttle, 
  drawBox, 
  resizeCanvas, 
  getOptimalInputSize,
  getAdjustedThreshold,
  debounce,
  formatFileSize,
  isValidDescriptor,
  descriptorToArray,
  arrayToDescriptor
} from './face-guard-utils';
export type { 
  Box, 
  DetectionResult
} from './face-guard-utils';

// Register the web component
import './face-guard';

// Version
export const VERSION = '1.0.0';
