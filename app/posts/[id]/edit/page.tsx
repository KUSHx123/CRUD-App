import { Navbar } from '@/components/Navbar';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { EditPostClientWrapper } from '@/components/EditPostClientWrapper';

export default function EditPostPage({ params }: { params: { id: string } }) {
  const postId = parseInt(params.id);
  
  return (
    <main className="min-h-screen bg-base-200">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Link href={`/posts/${postId}`} className="btn btn-ghost mb-6 gap-2">
          <ArrowLeft size={18} />
          Back to Post
        </Link>

        <div className="card bg-base-100 shadow-xl max-w-2xl mx-auto">
          <div className="card-body">
            <h1 className="card-title text-2xl mb-6">Edit Post</h1>
            <EditPostClientWrapper postId={postId} />
          </div>
        </div>
      </div>
    </main>
  );
}