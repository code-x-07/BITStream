import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="text-6xl font-bold text-primary animate-fade-in">404</div>
        <h1 className="text-3xl font-bold text-foreground animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
          Page Not Found
        </h1>
        <p className="text-foreground/70 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
          The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back on track.
        </p>
        <Link href="/" className="inline-block" style={{ animationDelay: '0.3s' }}>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold glow-cyan">
            Go Back Home
          </Button>
        </Link>
      </div>
    </main>
  );
}
