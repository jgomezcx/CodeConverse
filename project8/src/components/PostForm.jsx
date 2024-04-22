// components/PostForm.js
import './postform.css';
import React, { useState } from 'react';
import { uploadImage,  createPost } from '../supabaseUtils'; // Assuming this utility handles image uploads
import { useNavigate } from 'react-router-dom';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const navigate = useNavigate();  // For redirection after form submission

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let imageUrl = '';
      if (file) {
        imageUrl = await uploadImage(file);
        console.log('Image uploaded:', imageUrl);
        if (!imageUrl) {
          throw new Error('Failed to upload image');
        }
      }
      await createPost({ title, content, imageUrl });
      navigate('/');  // Redirect to home page after successful post creation
    } catch (error) {
      console.error('Failed to upload image or create post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='form1'>
      <label>
        Title:
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
      </label>
      <label>
        Content:
        <textarea value={content} onChange={e => setContent(e.target.value)} />
      </label>
      <label>
        Upload Image:
        <input type="file" onChange={e => setFile(e.target.files[0])} />
      </label>
      <button type="submit">Create Post</button>
    </form>
  );
};

export default PostForm;

