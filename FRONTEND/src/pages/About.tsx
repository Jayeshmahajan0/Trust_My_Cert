import { Card } from "@/components/ui/card";
import { Shield, Users, TrendingUp, Award, Target, Eye } from "lucide-react";

export const About = () => {
  const values = [
    {
      icon: Shield,
      title: "Trust & Security",
      description: "Built with government-grade security standards to protect sensitive data",
    },
    {
      icon: Target,
      title: "Accuracy",
      description: "99.8% verification accuracy using advanced AI and blockchain technology",
    },
    {
      icon: Users,
      title: "Accessibility",
      description: "Easy-to-use platform accessible to employers, institutions, and government",
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "Continuously improving with the latest technology and user feedback",
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Trust My Cert</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            India's premier certificate verification platform, combating academic fraud
            with cutting-edge technology
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="p-8 animate-slide-up">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold">Our Mission</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              To eliminate certificate fraud in India by providing a secure, accessible, and
              reliable verification platform that empowers employers, institutions, and
              government officials to make informed decisions based on authentic credentials.
            </p>
          </Card>

          <Card className="p-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-trust/10">
                <Eye className="w-6 h-6 text-trust" />
              </div>
              <h2 className="text-2xl font-semibold">Our Vision</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              To become the national standard for academic verification, creating a
              transparent ecosystem where every certificate can be instantly verified,
              ensuring trust in India's education system.
            </p>
          </Card>
        </div>

        {/* Story Section */}
        <Card className="p-8 md:p-12 mb-16 animate-fade-in">
          <h2 className="text-3xl font-semibold mb-6">The Problem We're Solving</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Certificate fraud has become a growing concern in India, with thousands of fake
              certificates circulating in the job market each year. Traditional verification
              methods are slow, expensive, and often ineffective.
            </p>
            <p>
              Trust My Cert was developed as part of the Smart India Hackathon initiative to
              address this critical issue. Using advanced OCR technology, AI-powered analysis,
              and blockchain verification, we provide instant, reliable certificate verification
              that protects employers, maintains institutional integrity, and ensures
              deserving candidates get recognition.
            </p>
            <p>
              Our platform serves employers who need to verify candidate credentials, educational
              institutions that want to protect their brand, government officials monitoring
              the system, and students who want to prove their achievements are genuine.
            </p>
          </div>
        </Card>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <Card className="p-8 md:p-12 gradient-primary text-white text-center animate-fade-in">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-sm opacity-90">Certificates Verified</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-sm opacity-90">Institutions</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.8%</div>
              <div className="text-sm opacity-90">Accuracy</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-sm opacity-90">Available</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default About;
