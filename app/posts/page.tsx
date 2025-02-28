'use client';

import { Navbar } from '@/components/Navbar';
import { PostCard } from '@/components/PostCard';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '@/lib/api';
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Post } from '@/lib/types';

export default function PostsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  
  const { data: posts, isLoading, isError, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  useEffect(() => {
    if (posts) {
      const localPosts = localStorage.getItem('createdPosts');
      if (localPosts) {
        try {
          const parsedLocalPosts = JSON.parse(localPosts) as Post[];
          setAllPosts([...parsedLocalPosts, ...posts]);
        } catch (e) {
          console.error('Error parsing local posts:', e);
          setAllPosts(posts);
        }
      } else {
        setAllPosts(posts);
      }
    }
  }, [posts]);

  const filteredPosts = allPosts?.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    post.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-base-200">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Posts</h1>
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search posts..."
              className="input input-bordered w-full pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : isError ? (
          <div className="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Failed to load posts. Please try again.</span>
            <button className="btn btn-sm" onClick={() => refetch()}>Retry</button>
          </div>
        ) : filteredPosts?.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-2">No posts found</h2>
            <p className="text-gray-500">
              {searchTerm ? 'Try a different search term' : 'There are no posts available'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts?.map((post) => (
              <PostCard key={post.id} post={post} onDelete={() => refetch()} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}