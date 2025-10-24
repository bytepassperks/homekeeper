import { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { createClient } from '../utils/supabase/client';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { Logo } from './Logo';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onAuthSuccess: (accessToken: string, userId: string) => void;
}

export function AuthModal({ open, onClose, onAuthSuccess }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'signin' | 'register'>('signin');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Sign In form state
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  // Register form state
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');

  const validatePassword = (password: string): string | null => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/[0-9]/.test(password)) {
      return 'Password must contain at least one number';
    }
    return null;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const supabase = createClient();
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: signInEmail,
        password: signInPassword,
      });

      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }

      if (data.session?.access_token && data.user?.id) {
        onAuthSuccess(data.session.access_token, data.user.id);
      }
    } catch (err) {
      setError('An error occurred during sign in. Please try again.');
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate passwords match
    if (registerPassword !== registerConfirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate password strength
    const passwordError = validatePassword(registerPassword);
    if (passwordError) {
      setError(passwordError);
      setLoading(false);
      return;
    }

    try {
      // Call server endpoint to create user
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-7627b83a/signup`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: registerEmail,
            password: registerPassword,
            name: registerName,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'Registration failed');
        setLoading(false);
        return;
      }

      // Now sign in the user
      const supabase = createClient();
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: registerEmail,
        password: registerPassword,
      });

      if (signInError) {
        setError('Account created! Please sign in.');
        setActiveTab('signin');
        setLoading(false);
        return;
      }

      if (data.session?.access_token && data.user?.id) {
        onAuthSuccess(data.session.access_token, data.user.id);
      }
    } catch (err) {
      setError('An error occurred during registration. Please try again.');
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="items-center">
          <Logo variant="full" size="lg" className="mb-4" />
          <DialogTitle>Welcome to HomeKeeper</DialogTitle>
          <DialogDescription>
            Sign in to your account or create a new one to get started.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'signin' | 'register')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <Label htmlFor="signin-email">Email</Label>
                <Input
                  id="signin-email"
                  type="email"
                  placeholder="you@example.com"
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="signin-password">Password</Label>
                <Input
                  id="signin-password"
                  type="password"
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sign In'}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Forgot password? Contact support@homemaker.co.site
              </p>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <Label htmlFor="register-name">Full Name</Label>
                <Input
                  id="register-name"
                  type="text"
                  placeholder="John Doe"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="you@example.com"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="register-password">Password</Label>
                <Input
                  id="register-password"
                  type="password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Min 8 characters, including uppercase, lowercase, and number
                </p>
              </div>
              <div>
                <Label htmlFor="register-confirm-password">Confirm Password</Label>
                <Input
                  id="register-confirm-password"
                  type="password"
                  value={registerConfirmPassword}
                  onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create Account'}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Note: Email verification is handled via support@homemaker.co.site
              </p>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}