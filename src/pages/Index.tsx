
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { AnimatedContainer } from '@/components/AnimatedContainer';
import { Button } from '@/components/ui/button';
import { Building2, Users, Briefcase, ArrowRight } from 'lucide-react';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // If already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const features = [
    {
      icon: Building2,
      title: 'Manage Properties',
      description: 'Browse and manage your real estate portfolio with detailed analytics and insights.'
    },
    {
      icon: Users,
      title: 'Connect with Developers',
      description: 'Discover top real estate developers and explore their latest projects.'
    },
    {
      icon: Briefcase,
      title: 'Explore Projects',
      description: 'Find new investment opportunities and track ongoing development projects.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/50 flex flex-col">
      {/* Header */}
      <header className="w-full bg-background/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">RealEstate App</h1>
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => navigate('/login')}>
              Log In
            </Button>
            <Button onClick={() => navigate('/register')}>
              Register
            </Button>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <main className="flex-1">
        <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
          <AnimatedContainer className="flex-1 text-center md:text-left max-w-xl mx-auto md:mx-0">
            <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Premium Real Estate Platform
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              Discover Your Perfect Property Investment
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-lg text-balance">
              Connect with top developers, explore premium projects, and manage your real estate portfolio all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button size="lg" onClick={() => navigate('/register')} className="group">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/login')}>
                Sign In
              </Button>
            </div>
          </AnimatedContainer>
          
          <AnimatedContainer className="flex-1 mt-12 md:mt-0" delay={0.2}>
            <div className="relative w-full max-w-md mx-auto">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1073&q=80"
                  alt="Luxury property"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-4 w-32 opacity-90">
                <div className="text-xs text-muted-foreground">Starting at</div>
                <div className="text-lg font-bold">$250,000</div>
              </div>
            </div>
          </AnimatedContainer>
        </section>

        {/* Features */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <AnimatedContainer className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Our platform provides all the tools you need to manage your real estate investments with ease.
            </p>
          </AnimatedContainer>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <AnimatedContainer key={index} delay={index * 0.1} animation="fadeInUp">
                <div className="bg-card rounded-xl p-6 h-full shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </AnimatedContainer>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-muted/30 border-t py-8">
        <div className="container mx-auto px-4">
          <div className="text-center text-muted-foreground">
            <p>© 2023 RealEstate App. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
