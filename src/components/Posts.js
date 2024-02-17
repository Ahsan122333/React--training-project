import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { usePosts } from "../providers/post-provider";
import Post from "./Post";

const Posts = () => {
  const { posts, setPosts } = usePosts();
  const userDataString = localStorage.getItem("userData");
  const userData = userDataString ? JSON.parse(userDataString) : {};
  const loggedInUserId = userData.userid;

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      if (posts.length === 0) {
        try {
          const response = await axios.get(
            "https://jsonplaceholder.typicode.com/posts"
          );
          setPosts(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchData();
  }, []);

  const handleDelete = (postId) => {
    // alert(postId);
    let newPosts = [...posts];
    const updatedPosts = newPosts.filter((post) => post.id !== postId);
    console.log(updatedPosts.length, updatedPosts, "post", postId);
    setPosts([...updatedPosts]);
  };
  const handleEdit = (postId) => {
    const post = posts.find((post) => post.id === postId);
    navigate(`/edit/${postId}`, { state: { post } });
  };

  // console.log(posts);
  return (
    <div className="postMain">
      <div>
      <h1>This is the post section</h1>
      </div>
      <Link
        className="button"
        to="/new"
        style={{
          textDecoration: "none",
          paddingTop: "15px",
        }}
      >
        Add Post
      </Link>

      <div>
        {posts &&
          posts.length > 0 &&
          posts.map((post) => (
            <Post
            
              key={post.id}
              post={post}
              loggedInUserId={loggedInUserId}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))}
        {!posts && posts.length === 0 && <p>Loading...</p>}
      </div>

      <Link
        className="button"
        to="/"
        style={{
          textDecoration: "none",
          paddingTop: "15px",
        }}
      >
        logout
      </Link>
    </div>
  );
};




export default Posts;
