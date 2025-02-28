'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { postSchema } from '@/lib/validation';
import { PostFormData } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface PostFormProps {
  defaultValues?: PostFormData;
  onSubmit: (data: PostFormData) => Promise<void>;
  isSubmitting: boolean;
}

export function PostForm({ defaultValues, onSubmit, isSubmitting }: PostFormProps) {
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: defaultValues || {
      title: '',
      body: '',
      userId: 1, // Default user ID
    },
  });

  const onSubmitHandler = async (data: PostFormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6">
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Title</span>
        </label>
        <input
          type="text"
          placeholder="Enter post title"
          className={`input input-bordered w-full ${errors.title ? 'input-error' : ''}`}
          {...register('title')}
        />
        {errors.title && (
          <label className="label">
            <span className="label-text-alt text-error">{errors.title.message}</span>
          </label>
        )}
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Content</span>
        </label>
        <textarea
          placeholder="Enter post content"
          className={`textarea textarea-bordered h-32 w-full ${errors.body ? 'textarea-error' : ''}`}
          {...register('body')}
        />
        {errors.body && (
          <label className="label">
            <span className="label-text-alt text-error">{errors.body.message}</span>
          </label>
        )}
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">User ID</span>
        </label>
        <input
          type="number"
          placeholder="Enter user ID"
          className={`input input-bordered w-full ${errors.userId ? 'input-error' : ''}`}
          {...register('userId', { valueAsNumber: true })}
        />
        {errors.userId && (
          <label className="label">
            <span className="label-text-alt text-error">{errors.userId.message}</span>
          </label>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <span className="loading loading-spinner loading-sm"></span>
            Submitting...
          </>
        ) : (
          'Submit'
        )}
      </button>
    </form>
  );
}