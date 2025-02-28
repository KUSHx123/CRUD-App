'use client';

import { Navbar } from '@/components/Navbar';
import { PostForm } from '@/components/PostForm';
import { createPost } from '@/lib/api';
import { PostFormData } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NewPostPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (data: PostFormData) => {
    try {
      setIsSubmitting(true);
      await createPost(data);
      toast({
        title: 'Success',
        description: 'Post created successfully!',
      });
      router.push('/posts');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create post. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-base-200">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="card bg-base-100 shadow-xl max-w-2xl mx-auto">
          <div className="card-body">
            <h1 className="card-title text-2xl mb-6">Create New Post</h1>
            <PostForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          </div>
        </div>
      </div>
    </main>
  );
}