import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, CheckCircle, TrendingUp, Lock, Upload, FileCheck, Award } from "lucide-react";
import { Link } from "react-router-dom";

export const Home = () => {
  const stats = [
    { value: "50,000+", label: "Certificates Verified", icon: FileCheck },
    { value: "500+", label: "Institutions Registered", icon: Award },
    { value: "99.8%", label: "Accuracy Rate", icon: TrendingUp },
    { value: "24/7", label: "System Uptime", icon: Lock },
  ];

  const features = [  
    {
      icon: Upload,
      title: "Quick Upload",
      description: "Drag and drop or click to upload certificates. Support for PDF, JPG, and PNG formats.",
    },
    {
      icon: Shield,
      title: "Advanced Verification",
      description: "AI-powered OCR and blockchain verification ensure authenticity with 99.8% accuracy.",
    },
    {
      icon: CheckCircle,
      title: "Instant Results",
      description: "Get detailed verification reports with confidence scores in seconds, not days.",
    },
    {
      icon: Lock,
      title: "Secure & Private",
      description: "Government-grade encryption ensures your data remains confidential and secure.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Upload Certificate",
      description: "Simply drag and drop your certificate or click to browse files",
    },
    {
      number: "02",
      title: "AI Processing",
      description: "Our advanced OCR extracts and verifies all key information",
    },
    {
      number: "03",
      title: "Get Results",
      description: "Receive detailed verification report with confidence score",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-hero pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary border border-primary/20">
              <Shield className="w-4 h-4" />
              Trusted by Government of India
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Verify Academic
              <br />
              <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                Certificates Instantly
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Combat certificate fraud with AI-powered verification. Trusted by employers,
              institutions, and government officials across India.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/verify">
                <Button variant="hero" size="lg" className="w-full sm:w-auto">
                  <Upload className="w-5 h-5" />
                  Verify Certificate Now
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Learn More
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-20">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-center mb-3">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose Trust My Cert?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built with cutting-edge technology to ensure the highest standards of verification
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-secondary/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to verify any academic certificate
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center text-3xl font-bold text-white mb-4 shadow-lg">
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary to-transparent" />
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/verify">
              <Button variant="hero" size="lg">
                Start Verification
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="p-8 md:p-12 gradient-primary text-white text-center shadow-xl">
            <Shield className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Verify Certificates?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of employers and institutions using Trust My Cert for secure verification
            </p>
            <Link to="/verify">
              <Button variant="secondary" size="lg" className="shadow-lg hover:shadow-xl">
                Get Started Now
              </Button>
            </Link>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;
