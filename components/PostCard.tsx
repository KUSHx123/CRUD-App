'use client';

import { Post } from '@/lib/types';
import Link from 'next/link';
import { Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { deletePost } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

interface PostCardProps {
  post: Post;
  onDelete?: () => void;
}

export function PostCard({ post, onDelete }: PostCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deletePost(post.id);
      toast({
        title: 'Post deleted',
        description: 'The post has been successfully deleted.',
      });
      if (onDelete) {
        onDelete();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete the post. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{post.title}</h2>
        <p className="text-sm text-gray-500">Post ID: {post.id} | User ID: {post.userId}</p>
        <p className="mt-2">{post.body}</p>
        <div className="card-actions justify-end mt-4">
          {showConfirm ? (
            <div className="flex items-center gap-2">
              <span className="text-sm">Are you sure?</span>
              <button 
                className="btn btn-sm btn-error" 
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
              <button 
                className="btn btn-sm btn-ghost" 
                onClick={() => setShowConfirm(false)}
                disabled={isDeleting}
              >
                Cancel
              </button>
            </div>
          ) : (
            <>
              <Link href={`/posts/${post.id}`} className="btn btn-sm btn-ghost">
                View
              </Link>
              <Link href={`/posts/${post.id}/edit`} className="btn btn-sm btn-primary">
                <Edit size={16} />
                Edit
              </Link>
              <button 
                className="btn btn-sm btn-error" 
                onClick={() => setShowConfirm(true)}
              >
                <Trash2 size={16} />
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}