import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { User, LogOut, ArrowLeft } from 'lucide-react';

interface ProfileData {
  login: string;
  fio?: string;
}

const Profile = () => {
  const { user, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('user2')
          .select('login')
          .eq('id', user.id)
          .single();

        if (!error && data) {
          setProfileData({ login: data.login });
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, isLoading, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (isLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="max-w-md mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Orqaga
        </Button>

        <Card className="p-6 bg-card border-border">
          {/* Avatar */}
          <div className="text-center mb-6">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Profil</h1>
          </div>

          {/* Profile Info */}
          <div className="space-y-4 mb-6">
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="text-xs text-muted-foreground mb-1">Login</div>
              <div className="text-base font-medium text-foreground">
                {profileData?.login || user?.login || '-'}
              </div>
            </div>

            {profileData?.fio && (
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="text-xs text-muted-foreground mb-1">F.I.O</div>
                <div className="text-base font-medium text-foreground">
                  {profileData.fio}
                </div>
              </div>
            )}
          </div>

          {/* Logout Button */}
          <Button
            variant="outline"
            className="w-full text-destructive border-destructive/30 hover:bg-destructive/10"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Chiqish
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
