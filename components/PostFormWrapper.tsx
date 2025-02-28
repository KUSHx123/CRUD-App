'use client';

import { PostForm } from '@/components/PostForm';
import { updatePost } from '@/lib/api';
import { Post, PostFormData } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface PostFormWrapperProps {
  post: Post;
  postId: number;
}

export function PostFormWrapper({ post, postId }: PostFormWrapperProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (data: PostFormData) => {
    try {
      setIsSubmitting(true);
      await updatePost(postId, data);
      toast({
        title: 'Success',
        description: 'Post updated successfully!',
      });
      router.push(`/posts/${postId}`);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update post. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PostForm 
      defaultValues={{
        title: post.title,
        body: post.body,
        userId: post.userId,
      }}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    />
  );
}