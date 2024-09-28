/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PostsByCategory = () => {
    const { category } = useParams();  // Access the dynamic category from the URL
    const [posts, setPosts] = useState([]);
  
    // Fetch posts when the category changes
    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const response = await axios.get(`/post/${category}`);
          setPosts(response.data);
        } catch (error) {
          console.error('Error fetching posts', error);
        }
      };
  
      fetchPosts();
    }, [category]);  // Re-fetch posts when category changes
  
    return (


      <div>
      <h2>Posts in "{category}"</h2>
      {posts.length > 0 && 
        posts.map(post => (
          <div key={post._id} className="post">
            <h3>{post.title}</h3>
            <p>Author: {post.author?.username}</p>
          </div>
        ))
}
    </div>
    );
  };

export default PostsByCategory;*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import {formatISO9075} from 'date-fns';

const PostsByCategory = () => {
    const { category } = useParams();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                setError(null);
                console.log(`Fetching posts for category: ${category}`);
                const response = await axios.get(`http://localhost:4000/post/category/${category}`);
                console.log('API Response:', response.data);
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts', error);
                setError(`Failed to fetch posts: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [category]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
          <h2>Posts in {category}</h2>
          <div className='category'>

            {posts.length === 0 ? (
                <p>No posts found in this category.</p>
            ) : (
                posts.map(post => (
                    <Link key={post._id} className="post" to={`/post/${post._id}`}>
                      <div>
                        <img src={'http://localhost:4000/'+post.cover} alt="none"/>
                      </div>
                      <div className='category-info'>
 
                        <h3>{post.title}</h3>
                        <div className='category-author'>
                          <p className='writer'>{post.author?.username}</p>
                          <time>{formatISO9075(new Date(post.createdAt))}</time>
                        </div>

                      </div>

                    </Link>
                ))
            )}
          </div>
        </div>

    );
};

export default PostsByCategory;