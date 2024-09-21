import React from 'react';
import Post from '../Post';
import CatButtons from '../CatButtons';
import {useEffect, useState} from 'react';

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/post').then(response =>{
      response.json().then(posts => {
        setPosts(posts)
        //console.log(posts);
      })
    })
  }, []);
  return (
    <div>
      <CatButtons/>
      <div className='grid'>
  
      {
        posts.length > 0 && posts.map(post => (
          <div>
            
            <Post {...post}/>
          </div>



        ))
      }
      </div>
    </div>


  )
}

export default HomePage

/*
import { useParams } from 'react-router-dom';
import Post from '../Post';
import { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
    const { category } = useParams(); // Get category from URL
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                let response;
                if (category === 'all') {
                    response = await axios.get('http://localhost:4000/post'); // Fetch all posts
                } else {
                    response = await axios.get(`http://localhost:4000/post/${category}`); // Fetch posts by category
                }
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts', error);
            }
        };
        fetchPosts();
    }, [category]);

    return (
        <div>
            
            <h1>{category === 'all' ? 'All Posts' : `Posts in ${category} category`}</h1>
            {posts.length > 0 ? (
                posts.map(post => (
                  <Post key={post._id} {...post}/>
                ))
            ) : (
                <p>No posts available for this category.</p>
            )}
        </div>
    );
};

export default HomePage;*/

