import { X, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

export function WelcomeBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-orange/10 via-primary/10 to-accent/10 border-b border-orange/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
              <Heart className="h-6 w-6 text-orange" style={{ color: '#FF7A3A' }} />
            </div>
            <div className="flex-1">
              <h3 className="mb-1">Welcome to Espoo Together! 👋</h3>
              <p className="text-muted-foreground">
                Join our warm community of neighbors connecting through shared activities. Browse events below 
                or create your own to share your skills and hobbies!
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsVisible(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
