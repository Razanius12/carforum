import { use } from 'react';
import { sql } from '@vercel/postgres';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import DeleteButton from '../../components/DeleteButton';

async function getPost(id: string) {
  const post = await sql`
    SELECT 
      p.*,
      u.name as author_name,
      c.make as car_make,
      c.model as car_model
    FROM posts p
    JOIN users u ON p.user_id = u.id
    JOIN cars c ON p.car_id = c.id
    WHERE p.id = ${id}
  `;
  
  if (post.rows.length === 0) {
    notFound();
  }
  
  return post.rows[0];
}

export default function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const post = use(getPost(unwrappedParams.id));

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Link href="/posts" className="text-blue-500 hover:underline">
          ← Back to Posts
        </Link>
      </div>

      <article className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-3xl font-bold">{post.title}</h1>
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
            {post.type}
          </span>
        </div>

        <div className="text-gray-600 mb-4">
          Posted by {post.author_name} • {post.car_make} {post.car_model}
          <br />
          {new Date(post.created_at).toLocaleDateString()}
        </div>

        <div className="prose max-w-none mb-6">
          {post.content}
        </div>

        <div className="flex gap-4">
          <Link
            href={`/posts/${post.id}/edit`}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Edit Post &nbsp;
          </Link>
          <DeleteButton postId={post.id} />
        </div>
      </article>
    </div>
  );
}