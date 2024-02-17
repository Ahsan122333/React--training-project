import React, { createContext, useContext, useState } from 'react';

const PostsContext = createContext();

const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  return (
    <PostsContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostsContext.Provider>
  );
};

const usePosts = () => {
  const { posts, setPosts } = useContext(PostsContext);
  return { posts, setPosts };
};

export { PostsProvider, usePosts };
