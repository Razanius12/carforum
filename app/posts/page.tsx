import { fetchFilteredPosts } from '../lib/data';
import Link from 'next/link';

export default async function PostsPage() {
  const posts = await fetchFilteredPosts('', 1);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Forum Posts</h1>
        <Link 
          href="/posts/create"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create New Post
        </Link>
      </div>

      <div className="grid gap-4">
        {posts.map((post) => (
          <div key={post.id} className="border p-4 rounded">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <span>{post.type}</span>
            </div>
            <p className="text-gray-600">
              By {post.user_name} • {post.car_make} {post.car_model}
            </p>
            <div className="mt-4 flex gap-2">
              <Link 
                href={`/posts/${post.id}`}
                className="text-blue-500 hover:underline"
              >
                View &nbsp;
              </Link>
              <Link 
                href={`/posts/${post.id}/edit`}
                className="text-green-500 hover:underline"
              >
                Edit &nbsp;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}