import { Navbar } from '@/components/Navbar';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { PostClientWrapper } from '@/components/PostClientWrapper';

export default function PostDetailPage({ params }: { params: { id: string } }) {
  const postId = parseInt(params.id);
  
  return (
    <main className="min-h-screen bg-base-200">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Link href="/posts" className="btn btn-ghost mb-6 gap-2">
          <ArrowLeft size={18} />
          Back to Posts
        </Link>

        <PostClientWrapper postId={postId} />
      </div>
    </main>
  );
}