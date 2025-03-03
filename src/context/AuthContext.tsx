
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (phoneNumber: string, password: string) => Promise<boolean>;
  register: (phoneNumber: string) => Promise<boolean>;
  verifyOtp: (phoneNumber: string, otp: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock data for authentication - in a real app, this would be handled by a backend service
const mockUser: User = {
  id: '1',
  phoneNumber: '+1234567890',
  name: 'John Doe',
  properties: []
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingPhone, setPendingPhone] = useState<string | null>(null);

  useEffect(() => {
    // Check for saved session in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (phoneNumber: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Mock API call - replace with real authentication
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, accept any credentials with valid format
      if (phoneNumber && password && password.length >= 6) {
        const loggedInUser = { ...mockUser, phoneNumber };
        setUser(loggedInUser);
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        toast.success('Login successful');
        return true;
      } else {
        toast.error('Invalid credentials');
        return false;
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (phoneNumber: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Mock API call - replace with real registration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (phoneNumber) {
        setPendingPhone(phoneNumber);
        toast.success('Verification code sent to your phone');
        return true;
      } else {
        toast.error('Please provide a valid phone number');
        return false;
      }
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (phoneNumber: string, otp: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Mock API call - replace with real verification
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo, accept any 6-digit OTP
      if (otp && otp.length === 6) {
        const verifiedUser = { ...mockUser, phoneNumber };
        setUser(verifiedUser);
        localStorage.setItem('user', JSON.stringify(verifiedUser));
        setPendingPhone(null);
        toast.success('Phone verified successfully');
        return true;
      } else {
        toast.error('Invalid verification code');
        return false;
      }
    } catch (error) {
      toast.error('Verification failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        verifyOtp,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
