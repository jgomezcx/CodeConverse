import supabase from './supabaseClient';

export const uploadImage = async (file) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;  // Create a unique file name

  const { data, error } = await supabase.storage
    .from('images')
    .upload(fileName, file);

  if (error) {
    console.error('Upload Error:', error.message, error.details);
    throw new Error('Upload failed: ' + error.message);
  }

  // Assuming the bucket is public, the URL should be immediately available after upload
  // Log the file data to debug
  console.log('File data:', data);
  
  // Manually construct the public URL
  const publicURL = `https://idkarzksutpudlduzsig.supabase.co/storage/v1/object/public/images/${data.path}`;

  return publicURL;  // Return the URL to be stored in the database
};


export const createPost = async (postData) => {
  const { title, content, imageUrl } = postData;
  const { data, error } = await supabase
    .from('posts')  // Make sure 'posts' is your table name
    .insert([
      { title, content, image_url: imageUrl }  // Ensure these field names match your table's column names
    ]);

  if (error) {
    console.error('Error creating post:', error.message);
    throw new Error('Failed to create post: ' + error.message);
  }

  return data;
};

export const updatePost = async (postId, postData) => {
  const { title, content, imageUrl } = postData;
  const { data, error } = await supabase
    .from('posts')
    .update({ title, content, image_url: imageUrl })
    .eq('id', postId);

  if (error) {
    console.error('Error updating post:', error.message);
    throw new Error('Failed to update post: ' + error.message);
  }

  return data;
};

export const deletePost = async (postId) => {
  const { data, error } = await supabase
    .from('posts')
    .delete()
    .match({ id: postId });  // Use .match() for better filtering on deletes

  if (error) {
    console.error('Error deleting post:', error.message);
    throw new Error('Failed to delete post: ' + error.message);
  }

  return data;  // Optional: Return the data in case you want to confirm what was deleted
};

// Function to fetch a single post by its ID from the 'posts' table
export const fetchPostById = async (postId) => {
  const { data, error } = await supabase
    .from('posts')
    .select('*') // Select all fields; adjust if needed to select specific fields
    .eq('id', postId) // Use the 'eq' filter to match the 'id' column with the postId
    .single(); // Use 'single' to return only one post (or null if not found)

  if (error) {
    console.error('Error fetching post:', error.message);
    throw error;
  }

  return data;
};

// Function to fetch all comments for a specific post ID
export const fetchCommentsByPostId = async (postId) => {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('post_id', postId)
    .order('created_at', { ascending: false }); // Assuming you want the newest comments first

  if (error) {
    console.error('Error fetching comments:', error.message);
    throw error;
  }
  console.log('Comments:', data);
  return data;
};

export const fetchUpvotesByPostId = async (postId) => {
  const { data, error } = await supabase
    .from('posts')
    .select('upvotes')
    .eq('id', postId);

  if (error) {
    console.error('Error fetching upvotes:', error.message);
    throw error;
  }
  
  // Since we're selecting a single column, data should be an array of objects like [{ upvotes: value }]
  const upvotes = data[0]?.upvotes; // Use optional chaining in case data is an empty array
  console.log('Upvotes:', upvotes);
  return upvotes;
};

// Function to update the upvotes count for a post
export const updateUpvotes = async (postId, newUpvotes) => {
  const { data, error } = await supabase
    .from('posts')
    .update({ upvotes: newUpvotes })
    .eq('id', postId);

  if (error) {
    console.error('Error updating upvotes:', error.message);
    throw error;
  }

  console.log('Upvotes updated successfully:', data);
  return newUpvotes;
};

// Function to create a new comment for a post
export const createComment = async (postId, commentText) => {
  const { data, error } = await supabase
    .from('comments')
    .insert([
      {
        post_id: postId,
        text: commentText,
        // created_at will be automatically set by Supabase if it has a default value
      },
    ]);

  if (error) {
    console.error('Error creating comment:', error.message);
    throw error;
  }
  return commentText;
};

