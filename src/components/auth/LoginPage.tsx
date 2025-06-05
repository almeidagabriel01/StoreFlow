import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { loginSchema } from '../../schemas/validation';
import type { LoginFormData } from '../../schemas/validation';
import { FormInput } from '../forms/FormInput';
import { Button } from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';

interface LoginPageProps {
  onNavigate: (page: 'home' | 'login') => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      await login(data);
      onNavigate('home');
    } catch {
      setError('Invalid username or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8 relative">
          <button
            onClick={() => onNavigate('home')}
            className="absolute top-4 left-4 p-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h1>
          <p className="text-gray-600 dark:text-gray-400">Log in to your account</p>
        </div>

        <div className="mb-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-xl p-3">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            Demo credentials: <br />
            <span className="font-medium">Username:</span> mor_2314 <br />
            <span className="font-medium">Password:</span> 83r5^_
          </p>
        </div>

        <FormProvider {...form}>
          <form autoComplete="off" className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            {error && (
              <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl p-4">
                <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
              </div>
            )}

            <FormInput
              name="username"
              label="Username"
              placeholder="Enter your username"
              leftIcon={<User size={20} />}
              defaultValue=""
              autoComplete="username"
            />

            <div className="relative">
              <FormInput
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                leftIcon={<Lock size={20} />}
                defaultValue=""
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-10 top-9 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <Button
              type="submit"
              className="w-full"
              isLoading={isLoading}
              disabled={!form.formState.isValid || isLoading}
            >
              Log In
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};