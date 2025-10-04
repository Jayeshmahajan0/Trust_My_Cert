import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, FileCheck, AlertCircle, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const Verify = () => {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  }, []);

  const handleFileSelect = (selectedFile: File) => {
    const validTypes = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(selectedFile.type)) {
      toast.error("Invalid file type. Please upload PDF, JPG, or PNG files.");
      return;
    }

    if (selectedFile.size > maxSize) {
      toast.error("File size exceeds 10MB limit.");
      return;
    }

    setFile(selectedFile);
    toast.success("Certificate uploaded successfully!");
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  const handleVerify = () => {
    if (!file) {
      toast.error("Please upload a certificate first");
      return;
    }

    setIsProcessing(true);

    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      navigate("/results", { state: { fileName: file.name } });
    }, 3000);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Verify Academic Certificate
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload your certificate for instant AI-powered verification. Supports PDF, JPG, and PNG formats.
          </p>
        </div>

        {/* Upload Section */}
        <Card className="p-8 md:p-12 mb-8 animate-slide-up">
          <div
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
              isDragging
                ? "border-primary bg-primary/5 scale-105"
                : file
                ? "border-trust bg-trust/5"
                : "border-border hover:border-primary/50"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileInput}
            />

            {!file ? (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="p-6 rounded-full bg-primary/10">
                    <Upload className="w-12 h-12 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Drag and drop your certificate here
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    or click the button below to browse files
                  </p>
                  <label htmlFor="file-upload">
                    <Button variant="hero" className="cursor-pointer">
                      Browse Files
                    </Button>
                  </label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Supported formats: PDF, JPG, PNG (Max 10MB)
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="p-6 rounded-full bg-trust/10">
                    <FileCheck className="w-12 h-12 text-trust" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Certificate Ready</h3>
                  <p className="text-muted-foreground mb-1">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <div className="flex gap-3 justify-center">
                  <label htmlFor="file-upload">
                    <Button variant="outline" className="cursor-pointer">
                      Change File
                    </Button>
                  </label>
                  <Button
                    variant="trust"
                    onClick={handleVerify}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <FileCheck className="w-4 h-4" />
                        Verify Certificate
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Processing Status */}
        {isProcessing && (
          <Card className="p-6 bg-primary/5 border-primary/20 animate-fade-in">
            <div className="flex items-start gap-4">
              <Loader2 className="w-6 h-6 text-primary animate-spin flex-shrink-0 mt-1" />
              <div className="space-y-2 flex-1">
                <h3 className="font-semibold text-lg">Processing Certificate...</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    Extracting text using OCR
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    Verifying certificate ID and institution
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    Checking for tampering and fraud
                  </p>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Information Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
                <FileCheck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">What We Verify</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Certificate ID and authenticity</li>
                  <li>• Issuing institution details</li>
                  <li>• Student information match</li>
                  <li>• Document tampering detection</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-trust/10 flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-trust" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Security & Privacy</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• End-to-end encryption</li>
                  <li>• Secure data processing</li>
                  <li>• Auto-deletion after verification</li>
                  <li>• GDPR compliant</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Verify;
