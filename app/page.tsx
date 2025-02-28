import { Navbar } from '@/components/Navbar';
import Link from 'next/link';
import { FileText, Plus, Database } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-base-200">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="hero bg-base-100 rounded-lg shadow-xl p-8 mb-8">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">CRUD Application</h1>
              <p className="py-6">
                A simple CRUD application built with Next.js, TailwindCSS, and DaisyUI.
                This application demonstrates how to create, read, update, and delete posts
                using the JSONPlaceholder API.
              </p>
              <Link href="/posts" className="btn btn-primary">Get Started</Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <FileText className="w-16 h-16 text-primary" />
              <h2 className="card-title">View Posts</h2>
              <p>Browse through all the posts fetched from the JSONPlaceholder API.</p>
              <div className="card-actions justify-end">
                <Link href="/posts" className="btn btn-primary">View Posts</Link>
              </div>
            </div>
          </div>
          
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <Plus className="w-16 h-16 text-primary" />
              <h2 className="card-title">Create Post</h2>
              <p>Create a new post with a title and content of your choice.</p>
              <div className="card-actions justify-end">
                <Link href="/posts/new" className="btn btn-primary">Create Post</Link>
              </div>
            </div>
          </div>
          
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <Database className="w-16 h-16 text-primary" />
              <h2 className="card-title">API Integration</h2>
              <p>This app demonstrates integration with the JSONPlaceholder API for CRUD operations.</p>
              <div className="card-actions justify-end">
                <a 
                  href="https://jsonplaceholder.typicode.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-primary"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}