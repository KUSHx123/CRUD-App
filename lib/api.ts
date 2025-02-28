import { Post, PostFormData } from './types';

const API_URL = 'https://jsonplaceholder.typicode.com';

const getLocalStorage = () => {
  if (typeof window !== 'undefined') {
    return window.localStorage;
  }
  return null;
};

export async function getPosts(): Promise<Post[]> {
  const response = await fetch(`${API_URL}/posts`);
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
}

export async function getPost(id: number): Promise<Post> {
  const localStorage = getLocalStorage();
  if (localStorage) {
    const localPosts = localStorage.getItem('createdPosts');
    if (localPosts) {
      try {
        const parsedLocalPosts = JSON.parse(localPosts) as Post[];
        const localPost = parsedLocalPosts.find(post => post.id === id);
        if (localPost) {
          return localPost;
        }
      } catch (e) {
        console.error('Error parsing local posts:', e);
      }
    }
  }

  const response = await fetch(`${API_URL}/posts/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch post with id ${id}`);
  }
  return response.json();
}

export async function createPost(data: PostFormData): Promise<Post> {
  const response = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create post');
  }
  
  const newPost = await response.json();
  
  const localStorage = getLocalStorage();
  if (localStorage) {
    const localPosts = localStorage.getItem('createdPosts');
    let posts: Post[] = [];
    
    if (localPosts) {
      try {
        posts = JSON.parse(localPosts);
      } catch (e) {
        console.error('Error parsing local posts:', e);
      }
    }
    
    const uniqueId = Date.now();
    const postToSave = { ...newPost, id: uniqueId };
    posts.push(postToSave);
    
    localStorage.setItem('createdPosts', JSON.stringify(posts));
    
    return postToSave;
  }
  
  return newPost;
}

export async function updatePost(id: number, data: PostFormData): Promise<Post> {
  const localStorage = getLocalStorage();
  if (localStorage) {
    const localPosts = localStorage.getItem('createdPosts');
    if (localPosts) {
      try {
        let posts = JSON.parse(localPosts) as Post[];
        const postIndex = posts.findIndex(post => post.id === id);
        
        if (postIndex !== -1) {
          const updatedPost = { ...posts[postIndex], ...data };
          posts[postIndex] = updatedPost;
          localStorage.setItem('createdPosts', JSON.stringify(posts));
          return updatedPost;
        }
      } catch (e) {
        console.error('Error updating local post:', e);
      }
    }
  }

  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to update post with id ${id}`);
  }
  
  return response.json();
}

export async function deletePost(id: number): Promise<void> {
  const localStorage = getLocalStorage();
  if (localStorage) {
    const localPosts = localStorage.getItem('createdPosts');
    if (localPosts) {
      try {
        let posts = JSON.parse(localPosts) as Post[];
        const postIndex = posts.findIndex(post => post.id === id);
        
        if (postIndex !== -1) {
          posts.splice(postIndex, 1);
          localStorage.setItem('createdPosts', JSON.stringify(posts));
          return;
        }
      } catch (e) {
        console.error('Error deleting local post:', e);
      }
    }
  }

  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error(`Failed to delete post with id ${id}`);
  }
}