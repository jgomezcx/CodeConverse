import { useEffect, useState } from "react";
import PostFeed from "./PostFeed";
import supabase from '../supabaseClient';
import './nav.css';

function Posts(){
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('newest'); 

    // Function to sort posts
    const sortPosts = (posts, order) => {
        switch (order) {
            case 'newest':
                return [...posts].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            case 'oldest':
                return [...posts].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
            case 'mostUpvoted':
                return [...posts].sort((a, b) => b.upvotes - a.upvotes);
            default:
                return posts;
        }
    };

    // Fetch posts when component mounts
    useEffect(() => {
        const fetchPosts = async () => {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setPosts(data);
            setFilteredPosts(data);
        };

        fetchPosts();
    }, []);

       // Update the filtered posts whenever the searchTerm changes
    useEffect(() => {
        let filtered = posts;
        if (searchTerm) {
            filtered = filtered.filter(post =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        setFilteredPosts(sortPosts(filtered, sortOrder));
    }, [searchTerm, posts, sortOrder]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSortNewest = () => {
        setSortOrder('newest');
    };

    const handleSortOldest = () => {
        setSortOrder('oldest');
    };

    const handleSortMostUpvoted = () => {
        setSortOrder('mostUpvoted');
    };
    

    console.log(posts);

    return (
        // navbar
        <>
        <div className="navbar">
            <h1 className="text">Code-Converse</h1>

            <form className="search-form">
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </form>
            <button className="button" onClick={handleSortNewest}>Sort by newest</button>
            <button className="button" onClick={handleSortOldest}>Sort by oldest</button>
            <button className="button" onClick={handleSortMostUpvoted}>Sort by most upvoted</button>
        </div>
        {/* post feed*/}
        <div>
            <PostFeed posts={filteredPosts}/>
        </div>
        </>
    );
}

export default Posts;