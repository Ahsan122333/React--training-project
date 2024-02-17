import React, { useState } from "react";
import { Link } from "react-router-dom";
import { usePosts } from "../providers/post-provider";
import { useNavigate } from "react-router-dom";
const NewPostForm = () => {
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [id, setID] = useState("");
  const navigate = useNavigate();
  const { posts, setPosts } = usePosts();

  const generateUniqueId = (previousIds) => {
    if (previousIds.length === 0) {
      return 101; // Start with ID 101 if there are no previous IDs
    }

    const sortedIds = previousIds.sort((a, b) => a - b); // Sort the IDs as numbers
    const lastId = sortedIds[sortedIds.length - 1];
    const newId = Number(lastId) + 1; // Increment the highest ID by 1


    
    return newId;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    let userid;

    const UserDataString = localStorage.getItem("userData");
    let existingData = JSON.parse(UserDataString);
    userid = existingData.userid;

    const newid = generateUniqueId(posts.map((post) => post.id));
    setID(newid);
    // alert(id);
    try {
      setPosts((prev) => {
        return [{ userId: userid, id: newid, title: title, body: body }, ...prev];
      });
      navigate("/posts");
      console.log({ userid, id: newid, title: title, body: body });
      // add user id to this return [...prev, {userid:userid, id: id, title: title, body: body }];
    } catch (error) {
      console.log(error);
    }
    
    // Perform validation
  };
  return (
    <div className="main">
      <div className="inside">
        <h1>Add Post</h1>
        <form onSubmit={handleSubmit}>
          <div className="SingleCredential">
            {/* <label>Title:</label> */}
            <input
              className="fields"
              type="text"
              value={title}
              placeholder="Title of Post"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="SingleCredential">
            {/* <label>Post:</label> */}
            <input
              className="fields"
              type="text"
              value={body}
              placeholder="Post"
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
        </form>
        <Link
          onClick={handleSubmit}
          className="button"
          to="/posts"
          style={{
            textDecoration: "none",
            paddingLeft: "150px",
            paddingTop: "15px",
          }}
        >
          Add Post to all posts
        </Link>
      </div>
    </div>
  );
};
export default NewPostForm;
