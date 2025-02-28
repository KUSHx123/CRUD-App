'use client';

import { useQuery } from '@tanstack/react-query';
import { getPost } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { PostFormWrapper } from '@/components/PostFormWrapper';

interface EditPostClientWrapperProps {
  postId: number;
}

export function EditPostClientWrapper({ postId }: EditPostClientWrapperProps) {
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
        <PostFormWrapper post={post} postId={postId} />
      ) : null}
    </>
  );
}