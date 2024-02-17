import React, { useEffect, useState} from "react";
import { useParams, useLocation} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../providers/post-provider";
const EditPost = (props) => {

  const { posts, setPosts } = usePosts();
  const location = useLocation();
  const { postId } = useParams();
  const navigate=useNavigate();
  const { post } = props;
  const [title, setTitle] = useState(location.state.post.title);
  const [body, setBody] = useState(location.state.post.body);
  useEffect(()=>{
    // console.log(location.state.post,'pdas')
    
  },[])
  const handleSubmit=()=>{

  };

  const handleSave = async () => {
    try {
      let newPosts = [...posts];
      const newState = newPosts.map(obj => {
        // console.log(obj.id == postId)
        if (obj.id == postId) {
          console.log({...obj, title: title,body:body}, postId);
          return {...obj, title: title,body:body};
        }
        return obj;
      });
      setPosts([...newState]);


      // const updatedPosts = newPosts.filter((post) => post.id !== postId);
      // setPosts([...updatedPosts]);


      navigate("/posts");
    } catch (error) {
      console.error(error);
    }

  };

  return (
    <div className="main">
    <div className="inside">
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="SingleCredential">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          />
          </div>
          <div className="SingleCredential">
        <input
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          />
          </div>
        </form>
        <button className="button" onClick={handleSave}>
          Save
        </button>
      </div>
      </div>
  );
};

export default EditPost;
