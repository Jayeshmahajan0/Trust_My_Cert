import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  AlertTriangle,
  Download,
  ArrowLeft,
  Shield,
  Calendar,
  User,
  Building,
  Hash,
  Award,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

export const Results = () => {
  const location = useLocation();
  const fileName = location.state?.fileName || "certificate.pdf";

  // Mock verification data
  const verificationData = {
    status: "verified",
    confidenceScore: 94,
    certificateId: "CERT-2024-12345",
    studentName: "Rajesh Kumar Singh",
    institution: "Indian Institute of Technology, Delhi",
    course: "Bachelor of Technology in Computer Science",
    issueDate: "June 15, 2024",
    verifiedAt: new Date().toLocaleString(),
    checks: [
      { name: "Certificate ID Match", status: "passed", confidence: 98 },
      { name: "Institution Verification", status: "passed", confidence: 96 },
      { name: "Document Authenticity", status: "passed", confidence: 92 },
      { name: "Tampering Detection", status: "passed", confidence: 95 },
      { name: "Format Validation", status: "passed", confidence: 89 },
    ],
  };

  const isVerified = verificationData.status === "verified";

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Back Button */}
        <Link to="/verify">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Upload
          </Button>
        </Link>

        {/* Main Status Card */}
        <Card
          className={`p-8 md:p-12 mb-8 animate-fade-in ${
            isVerified ? "border-trust bg-trust/5" : "border-destructive bg-destructive/5"
          }`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div
                className={`p-6 rounded-full ${
                  isVerified ? "bg-trust/20" : "bg-destructive/20"
                }`}
              >
                {isVerified ? (
                  <CheckCircle className="w-16 h-16 text-trust" />
                ) : (
                  <AlertTriangle className="w-16 h-16 text-destructive" />
                )}
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {isVerified ? "Certificate Verified" : "Verification Failed"}
                </h1>
                <p className="text-lg text-muted-foreground">
                  {isVerified
                    ? "This certificate has been successfully verified"
                    : "This certificate could not be verified"}
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-trust mb-2">
                {verificationData.confidenceScore}%
              </div>
              <p className="text-sm text-muted-foreground">Confidence Score</p>
            </div>
          </div>
        </Card>

        {/* Confidence Score Breakdown */}
        <Card className="p-6 md:p-8 mb-8 animate-slide-up">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            Verification Details
          </h2>

          <div className="space-y-6">
            {verificationData.checks.map((check, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{check.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {check.confidence}%
                    </span>
                    <Badge
                      variant="default"
                      className="bg-trust/10 text-trust hover:bg-trust/20"
                    >
                      Passed
                    </Badge>
                  </div>
                </div>
                <Progress value={check.confidence} className="h-2" />
              </div>
            ))}
          </div>
        </Card>

        {/* Certificate Information */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <h3 className="text-xl font-semibold mb-4">Certificate Details</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Hash className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground">Certificate ID</p>
                  <p className="font-medium">{verificationData.certificateId}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground">Student Name</p>
                  <p className="font-medium">{verificationData.studentName}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground">Course</p>
                  <p className="font-medium">{verificationData.course}</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-xl font-semibold mb-4">Institution Information</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Building className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground">Issuing Institution</p>
                  <p className="font-medium">{verificationData.institution}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground">Issue Date</p>
                  <p className="font-medium">{verificationData.issueDate}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground">Verified At</p>
                  <p className="font-medium">{verificationData.verifiedAt}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Actions */}
        <Card className="p-6 animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div>
              <h3 className="font-semibold mb-1">Download Verification Report</h3>
              <p className="text-sm text-muted-foreground">
                Get a detailed PDF report with all verification details
              </p>
            </div>
            <Button variant="hero" className="w-full md:w-auto">
              <Download className="w-4 h-4" />
              Download Report
            </Button>
          </div>
        </Card>

        {/* Verify Another */}
        <div className="text-center mt-8">
          <Link to="/verify">
            <Button variant="outline" size="lg">
              Verify Another Certificate
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Results;
