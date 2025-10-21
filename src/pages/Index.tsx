import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Brain, Car, ArrowRight } from "lucide-react";
import heroTech from "@/assets/hero-tech.jpg";
import heroTraffic from "@/assets/hero-traffic.jpg";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(198_93%_60%/0.1)_0%,transparent_50%)]" />
        
        <div className="container relative z-10 mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-glow animate-float">
              Tech Assessment Platform
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Master technical concepts and monitor real-time traffic with advanced AI surveillance
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Quiz Card */}
            <Card className="gradient-card shadow-card border-border/50 overflow-hidden group hover:scale-105 transition-transform duration-300">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={heroTech} 
                  alt="Technical Assessment" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <Brain className="w-12 h-12 text-primary mb-2" />
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-3 text-foreground">Technical Quiz</h2>
                <p className="text-muted-foreground mb-6">
                  Test your knowledge in Django, React, TypeScript, and System Design with comprehensive assessments
                </p>
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="w-full"
                  onClick={() => navigate("/quiz")}
                >
                  Start Quiz
                  <ArrowRight className="ml-2" />
                </Button>
              </div>
            </Card>

            {/* Traffic Monitor Card */}
            <Card className="gradient-card shadow-card border-border/50 overflow-hidden group hover:scale-105 transition-transform duration-300">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={heroTraffic} 
                  alt="Traffic Monitoring" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <Car className="w-12 h-12 text-traffic-alert mb-2" />
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-3 text-foreground">Traffic Monitor</h2>
                <p className="text-muted-foreground mb-6">
                  Real-time AI-powered surveillance system for monitoring traffic conditions and disruptions
                </p>
                <Button 
                  variant="traffic" 
                  size="lg" 
                  className="w-full"
                  onClick={() => navigate("/traffic")}
                >
                  Open Dashboard
                  <ArrowRight className="ml-2" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Brain className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Comprehensive Assessment</h3>
              <p className="text-muted-foreground">
                Cover Django REST, React hooks, System Design, and leadership concepts
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-traffic-alert/10 flex items-center justify-center">
                <Car className="w-8 h-8 text-traffic-alert" />
              </div>
              <h3 className="text-xl font-bold mb-2">Real-Time Monitoring</h3>
              <p className="text-muted-foreground">
                AI-powered surveillance for instant traffic condition assessment
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-glow/10 flex items-center justify-center">
                <ArrowRight className="w-8 h-8 text-primary-glow" />
              </div>
              <h3 className="text-xl font-bold mb-2">Instant Insights</h3>
              <p className="text-muted-foreground">
                Get immediate feedback and actionable intelligence from data
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
