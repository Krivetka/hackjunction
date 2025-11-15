import { Plus } from 'lucide-react';
import { Button } from './ui/button';

interface EmptyStateProps {
  onCreateEvent: () => void;
}

export function EmptyState({ onCreateEvent }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      {/* Warm illustration of teacup */}
      <div className="mb-8 relative flex items-center justify-center">
        <div 
          className="rounded-full pt-10 pb-6 pl-10 pr-6 flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, rgba(255,122,58,0.05), rgba(160,155,231,0.10))' }}
        >
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Teacup illustration */}
            <path
              d="M20 40C20 37 22 35 25 35H75C78 35 80 37 80 40V70C80 80 70 90 60 90H40C30 90 20 80 20 70V40Z"
              fill="#A09BE7"
              opacity="0.15"
            />
            <path
              d="M20 40C20 37 22 35 25 35H75C78 35 80 37 80 40V70C80 80 70 90 60 90H40C30 90 20 80 20 70V40Z"
              stroke="#A09BE7"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Handle */}
            <path
              d="M80 45C80 45 90 45 90 55C90 65 80 65 80 65"
              stroke="#A09BE7"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            {/* Steam */}
            <path
              d="M35 25C35 25 35 15 40 15M50 25C50 25 50 12 55 12M65 25C65 25 65 15 70 15"
              stroke="rgba(160,155,231,0.6)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Heart */}
            <path
              d="M50 55C50 55 38 52 38 45C38 41 41 38 45 38C47 38 49 39 50 41C51 39 53 38 55 38C59 38 62 41 62 45C62 52 50 55 50 55Z"
              fill="#FF7A3A"
            />
          </svg>
        </div>
      </div>
      
      <h2 className="mb-3 text-center">No events found</h2>
      <p className="text-muted-foreground text-center max-w-xl mb-8 leading-relaxed">
        We couldn't find any events matching your search. Try adjusting your filters, or why not create 
        your own event? Share your skills, hobbies, and stories with the Espoo community!
      </p>
      <Button 
        onClick={onCreateEvent} 
        size="lg" 
        className="h-12 px-8 text-lg shadow-sm" 
        style={{ backgroundColor: '#FF7A3A' }}
      >
        <Plus className="h-5 w-5 mr-2" />
        Create Your First Event
      </Button>
      <p className="text-sm text-muted-foreground mt-4">
        Everyone is welcome — let's build community together! 🤝
      </p>
    </div>
  );
}
