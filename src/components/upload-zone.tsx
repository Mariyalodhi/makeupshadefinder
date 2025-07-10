import { useCallback, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Camera, X, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface UploadZoneProps {
  onImageUpload: (file: File) => void;
  isUploading?: boolean;
}

export function UploadZone({ onImageUpload, isUploading }: UploadZoneProps) {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onImageUpload(acceptedFiles[0]);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
    disabled: isUploading
  });

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Camera access denied or not available');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const switchCamera = async () => {
    stopCamera();
    setFacingMode(facingMode === 'user' ? 'environment' : 'user');
    setTimeout(() => startCamera(), 100);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      if (context) {
        context.drawImage(video, 0, 0);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'selfie.jpg', { type: 'image/jpeg' });
            onImageUpload(file);
            setIsCameraOpen(false);
            stopCamera();
          }
        }, 'image/jpeg', 0.8);
      }
    }
  };

  const handleCameraOpen = () => {
    setIsCameraOpen(true);
    startCamera();
  };

  const handleCameraClose = () => {
    setIsCameraOpen(false);
    stopCamera();
  };

  return (
    <div className="space-y-6">
      <h3 className="text-3xl font-bold text-gray-800 mb-8">Upload Your Selfie</h3>
      
      <div
        {...getRootProps()}
        className={`upload-zone rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
          isDragActive ? 'border-primary bg-primary/5' : ''
        } ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />
        
        <div className="space-y-4">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
            {isUploading ? (
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            ) : (
              <Upload className="w-8 h-8 text-primary" />
            )}
          </div>
          
          <div>
            <p className="text-lg font-semibold text-gray-700">
              {isDragActive ? 'Drop your selfie here' : 'Drag & drop your selfie here'}
            </p>
            <p className="text-gray-500">or click to browse files</p>
          </div>
          
          <div className="flex space-x-3">
            <Button 
              type="button" 
              variant="default" 
              disabled={isUploading}
              className="bg-primary hover:bg-primary/90"
            >
              <Upload className="w-4 h-4 mr-2" />
              {isUploading ? 'Analyzing...' : 'Choose File'}
            </Button>
            
            <Dialog open={isCameraOpen} onOpenChange={setIsCameraOpen}>
              <DialogTrigger asChild>
                <Button 
                  type="button" 
                  variant="outline" 
                  disabled={isUploading}
                  onClick={handleCameraOpen}
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Take Selfie
                </Button>
              </DialogTrigger>
              
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Take Your Selfie</DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div className="relative bg-black rounded-lg overflow-hidden">
                    <video 
                      ref={videoRef}
                      autoPlay 
                      playsInline
                      className="w-full h-64 object-cover"
                    />
                    <canvas 
                      ref={canvasRef} 
                      className="hidden"
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <Button 
                      onClick={switchCamera}
                      variant="outline"
                      size="sm"
                      className="flex items-center"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Switch Camera
                    </Button>
                    
                    <div className="flex space-x-2">
                      <Button 
                        onClick={handleCameraClose}
                        variant="outline"
                        size="sm"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                      
                      <Button 
                        onClick={capturePhoto}
                        className="bg-primary hover:bg-primary/90"
                        size="sm"
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        Capture
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      
      <div className="text-center text-sm text-gray-500">
        <p>Supported formats: JPEG, PNG, WebP</p>
        <p>Max file size: 10MB</p>
      </div>
    </div>
  );
}
