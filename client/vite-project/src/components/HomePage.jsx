import React from 'react';
import Post from '../Post';
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
    <div className='grid'>
      {
        posts.length > 0 && posts.map(post => (
          <Post {...post}/>

        ))
      }
    </div>

  )
}

export default HomePage