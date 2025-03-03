
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { AnimatedContainer } from '@/components/AnimatedContainer';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { OTPInput } from '@/components/ui/input-otp';
import { ArrowLeft } from 'lucide-react';

const Verify = () => {
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(60);
  const { verifyOtp, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const phoneNumber = location.state?.phoneNumber || '';

  // If no phone number is provided or already authenticated, redirect
  if (!phoneNumber) {
    return <Navigate to="/register" replace />;
  }
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // Countdown timer for resend code
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleVerify = async () => {
    if (otp.length === 6) {
      const success = await verifyOtp(phoneNumber, otp);
      if (success) {
        navigate('/dashboard');
      }
    }
  };

  const handleResend = () => {
    // Reset OTP
    setOtp('');
    // Reset countdown
    setCountdown(60);
    // Show message
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-muted/50">
      <AnimatedContainer className="w-full max-w-md">
        <Card className="shadow-lg border-muted/50">
          <CardHeader className="space-y-1">
            <div className="flex items-center mb-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate('/register')}
                className="h-8 w-8 mr-2"
              >
                <ArrowLeft size={16} />
              </Button>
              <CardTitle className="text-2xl">Verify your phone</CardTitle>
            </div>
            <CardDescription>
              We've sent a verification code to {phoneNumber}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center my-4">
              <OTPInput
                value={otp}
                onChange={setOtp}
                maxLength={6}
                containerClassName="input-otp-wrapper gap-2"
              />
            </div>
            
            <Button 
              onClick={handleVerify} 
              className="w-full"
              disabled={otp.length !== 6 || isLoading}
            >
              {isLoading ? 'Verifying...' : 'Verify'}
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm text-muted-foreground">
              Didn't receive the code?{' '}
              {countdown > 0 ? (
                <span>Resend in {countdown}s</span>
              ) : (
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-primary underline"
                  onClick={handleResend}
                >
                  Resend Code
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </AnimatedContainer>
    </div>
  );
};

export default Verify;
