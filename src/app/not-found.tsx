import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center p-8 rounded-lg border border-border bg-card shadow-md">
        <h1 className="text-5xl font-bold mb-6 text-primary">404</h1>
        <p className="text-xl text-card-foreground mb-6">Page not found</p>
        <Link
          href="/"
          className="text-primary hover:text-primary/80 underline transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
