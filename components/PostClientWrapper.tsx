'use client';

import { useQuery } from '@tanstack/react-query';
import { getPost } from '@/lib/api';
import { Edit } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

interface PostClientWrapperProps {
  postId: number;
}

export function PostClientWrapper({ postId }: PostClientWrapperProps) {
  const { toast } = useToast();

  const { data: post, isLoading, isError } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPost(postId),
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to load post details. Please try again.',
        variant: 'destructive',
      });
    },
  });

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : isError ? (
        <div className="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Failed to load post details. Please try again.</span>
        </div>
      ) : post ? (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex justify-between items-start">
              <h1 className="card-title text-3xl">{post.title}</h1>
              <Link href={`/posts/${post.id}/edit`} className="btn btn-primary gap-2">
                <Edit size={18} />
                Edit
              </Link>
            </div>
            <div className="badge badge-neutral my-2">Post ID: {post.id}</div>
            <div className="badge badge-primary mb-4">User ID: {post.userId}</div>
            <div className="divider"></div>
            <p className="text-lg whitespace-pre-line">{post.body}</p>
          </div>
        </div>
      ) : null}
    </>
  );
}