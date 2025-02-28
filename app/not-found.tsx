import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
        <p className="mb-8">The page you are looking for doesn't exist or has been moved.</p>
        <Link href="/" className="btn btn-primary">
          Go Home
        </Link>
      </div>
    </div>
  );
}