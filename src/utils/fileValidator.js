/**
 * Client-side file validation utility for print-ready artwork & site photos.
 * Prevents memory exhaustion, buffer issues, and unsupported formats.
 */

export const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024; // 25 MB limit
export const ALLOWED_EXTENSIONS = ['pdf', 'ai', 'psd', 'cdr', 'tiff', 'tif', 'jpg', 'jpeg', 'png', 'webp'];

export function validatePrintFile(file) {
  if (!file) {
    return { valid: false, error: 'No file selected.' };
  }

  // 1. Check size limit
  if (file.size > MAX_FILE_SIZE_BYTES) {
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: `File exceeds maximum upload limit of 25MB (Selected: ${sizeInMB}MB). Please share larger files via Google Drive or WeTransfer.`
    };
  }

  // 2. Check extension whitelist
  const ext = file.name.split('.').pop()?.toLowerCase();
  if (!ext || !ALLOWED_EXTENSIONS.includes(ext)) {
    return {
      valid: false,
      error: `Unsupported file format (.${ext || 'unknown'}). Supported formats: PDF, AI, PSD, CDR, TIFF, JPG, PNG.`
    };
  }

  return { 
    valid: true, 
    error: null,
    fileName: file.name,
    fileSizeMB: (file.size / (1024 * 1024)).toFixed(1)
  };
}
