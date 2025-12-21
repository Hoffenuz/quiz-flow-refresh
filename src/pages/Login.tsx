import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Car, LogIn, Eye, EyeOff, AlertCircle } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username.trim() || !password.trim()) {
      setError('Login va parolni kiriting');
      return;
    }

    setIsSubmitting(true);
    
    const result = await login(username.trim(), password);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error || 'Kirish xatosi');
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 md:p-8 bg-card border-border shadow-xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <Car className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Avtomaktab Test</h1>
          <p className="text-sm text-muted-foreground mt-1">Tizimga kirish</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/30 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0" />
            <span className="text-sm text-destructive">{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Login</Label>
            <Input
              id="username"
              type="text"
              placeholder="Loginni kiriting"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isSubmitting}
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Parol</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Parolni kiriting"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
                className="h-11 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-11 text-base font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Tekshirilmoqda...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <LogIn className="w-4 h-4" />
                Kirish
              </span>
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
