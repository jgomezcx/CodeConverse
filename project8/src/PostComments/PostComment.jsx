import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostById, fetchCommentsByPostId, createComment, fetchUpvotesByPostId , updateUpvotes, updatePost, deletePost } from '../supabaseUtils'; // Make sure the path to your supabaseUtils is correct
import './post-comment.css';
import heart from '../assets/heart.png';
import { useNavigate } from 'react-router-dom';

const PostComment = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [upvotes, setUpvotes] = useState(0);
  const [hasUpvoted, setHasUpvoted] = useState(false);

  // States to manage the input values for the post
  const [isEditMode, setIsEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editImageUrl, setEditImageUrl] = useState('');

  const [postUpdated, setPostUpdated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const postId = parseInt(id, 10);

    if (postId || postUpdated) {
      setLoading(true);
      // Fetch the post details
      fetchPostById(postId)
        .then((postData) => {
          setPost(postData);
          // Fetch comments once post data is successfully fetched
          setPostUpdated(false);
          return fetchCommentsByPostId(postId);
        })
        .then((commentsData) => {
          setComments(commentsData);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error:', error);
          setLoading(false);
        });
    }
  }, [id, postUpdated]);

  useEffect(() => {
    const postId = parseInt(id, 10);
    if (postId) {
      fetchUpvotesByPostId(postId)
        .then((upvotesData) => {
          setUpvotes(upvotesData);
        })
        .catch((error) => {
          console.error('upvotes fetch error:', error);
        });
    }
  }, [id, upvotes]);

  // Function to handle upvote clicks
const handleUpvote = async () => {
  if (hasUpvoted) {
    // Prevent further clicks if the button has already been clicked
    return;
  }
  
  const postId = parseInt(id, 10); // Your postId from useParams()
  try {
    // Increment the upvotes in the database
    await updateUpvotes(postId, upvotes + 1);
    setHasUpvoted(true);
    fetchUpvotesByPostId(postId)
    setUpvotes(upvotes + 1);
  } catch (error) {
    console.error('Error incrementing upvotes:', error);
  }
};

  const handleNewCommentSubmit = async (event) => {
    event.preventDefault();
    if (!newCommentText.trim()) return;

    const postId = parseInt(id, 10);
    try {
      const createdComment = await createComment(postId, newCommentText);
      // setComments([...comments, createdComment[0]]); // Add the new comment to the local state
      setNewCommentText(''); // Clear the input box
      const updatedComments = await fetchCommentsByPostId(postId);
      setComments(updatedComments);
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  // Handler for the edit button
const handleEdit = () => {
  setIsEditMode(true);
};

// Handler for saving the updated post
const handleSave = async () => {
  const updatedPostData = {
    title: editTitle,
    content: editContent,
    imageUrl: editImageUrl,
  };
  try {
    const updatedPost = await updatePost(post.id, updatedPostData);
    // Update the local state if needed or re-fetch the post
    setIsEditMode(false);
    setPostUpdated(true);
  } catch (error) {
    console.error('Failed to update post:', error);
  }
};

useEffect(() => {
  if (post) {
    setEditTitle(post.title || ''); // Fallback to an empty string if 'title' is null or undefined
    setEditContent(post.content || '');
    setEditImageUrl(post.image_url || '');
  }
}, [post]); 

const handleDelete = async () => {
  if (window.confirm('Are you sure you want to delete this post?')) {
    try {
      const postId = parseInt(id, 10);
      await deletePost(postId);
      navigate('/');
      // Here you could navigate away or update the state to remove the post from the list
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  }
};

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <>
    <div className="post-card">
    {isEditMode ? (
        // Edit mode: show input fields
        <div className='edit'>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
          {editImageUrl && <img src={editImageUrl} alt="Edit post" />}
          <button onClick={handleSave}>Save Changes</button>
          <button onClick={() => setIsEditMode(false)}>Cancel</button>
        </div> 
      ) : (
        <> 
        <h1>{post.title}</h1>
        <p>{post.content}</p>
        {post.image_url && <img src={post.image_url} alt={post.title} />}
        <p className='like'>
            Upvotes: {upvotes}{"  "}
            {!hasUpvoted ? (
              <span onClick={handleUpvote} style={{ cursor: 'pointer' }}><img src={heart} style={{backgroundColor:'#cbcbcb'}} /></span>
            ) : (
              <span style={{ cursor: 'not-allowed' }}><img src={heart} style={{backgroundColor:'#007bff'}}/></span>
            )}
            <button onClick={handleEdit}>Edit Post</button>
            <button onClick={handleDelete}>Delete</button>
        </p>
        
        <p className='p2'>Posted on: {new Date(post.created_at).toLocaleDateString()}</p>
        <span></span>
        </>
      )}
    </div>

    <div className="comments-section">
    <form onSubmit={handleNewCommentSubmit} style={{ display: 'flex', gap: '10px' }}>
      <textarea
        maxlength="120"
        value={newCommentText}
        onChange={(e) => setNewCommentText(e.target.value)}
        placeholder="Write a comment..."
        style={{ flexGrow: 1, resize: 'vertical' }}
        required
      />
      <button type="submit" style={{ whiteSpace: 'nowrap' }}>Add Comment</button>
    </form>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              <p>{comment.text}</p>
              <p className="comment-date">
                Commented on: {new Date(comment.created_at).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
        
    </div>
    </>
  );
};

export default PostComment;

