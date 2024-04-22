// components/PostFeed.js
import React from 'react';
import { Link } from 'react-router-dom';
import './feed.css';

// Single Post Card Component
const PostCard = ({ post }) => {
    const isValidUrl = (url) => url && !url.includes('undefined');

  return (
    <Link to={`/post_comment/${post.id}`} className="post-card">
        <h2>{post.title}<p className='vote'>Upvotes: {post.upvotes}</p></h2>
        <p>{post.content}</p>
        {isValidUrl(post.image_url) && <img src={post.image_url} alt={post.title} />}
        <p></p>
        <p className='p2'>Posted on: {new Date(post.created_at).toLocaleDateString()}</p>
    </Link>
  );
};

// Post Feed Component
const PostFeed = ({ posts }) => {
  return (
    <div className="post-feed">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostFeed;
