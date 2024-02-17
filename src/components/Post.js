import React, { useState } from "react";
import axios from "axios";

const Post = ({ post, loggedInUserId, handleEdit, handleDelete }) => {
  


  let i = 1;
  let id = 0;
  const [singleComment, setSingleComment] = useState("");
  const [singleTitle, setsingleTitle] = useState("");
  const [comments, setComments] = useState([]);

  const [checkComment, setCheckComment] = useState(null);

  const [checkEdit, setCheckEdit] = useState(null);

  const generateUniqueId = (id) => {
    if (id.length === 0) {      
      return 1; // Start with ID    101 if there are no previous IDs
    }

    const sortedIds = id.sort((a, b) => a - b); // Sort the IDs as numbers
    const lastId = sortedIds[sortedIds.length - 1];
    const newId = Number(lastId) + 1; // Increment    he highest ID by 1

    return newId;
  };
  const UserDataString = localStorage.getItem("userData");
  let existingData = JSON.parse(UserDataString);
  let email = existingData.email;

  const commentShow = async (postId) => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
      );

      setComments(response.data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  const checkaddComment = () => {
    setCheckComment("1");
  };

  const checkEditComment = () => {
    setCheckEdit("1");
  };

  const deleteComment = (commentId) => {
    let newComments = [...comments];
    const updatedComments = newComments.filter(
      (comment) => comment.id !== commentId
    );
    setComments([...updatedComments]);
  };
  const editComment = (commentId) => {
    let newComments = [...comments];
    const newState = newComments.map((obj) => {
      if (obj.id === commentId) {
        return {
          ...obj,
          postId: post.id,
          email: email,
          title: singleTitle,
          body: singleComment,
        };
      }
      setCheckEdit(null);
      return obj;
    });
    setComments([...newState]);
    // Reset the input fields after updating the comments
    setsingleTitle("");
    setSingleComment("");
  };
  const addComment = (e) => {
    e.preventDefault();
    let id = generateUniqueId(comments.map((comment) => comment.id));
    setComments((prevComments) => [
      {
        postId: post.id,
        id: id,
        email: email,
        title: singleTitle,
        body: singleComment,
      },
      ...prevComments,
    ]);
    console.log(singleComment, " ", comments);
    setCheckComment(null);
  };

  return (
    <div className="card posts" key={post.id}>
      {post.userId === loggedInUserId && (
        <div className="options">
          <button className="button" onClick={() => handleEdit(post.id)}>
            Edit
          </button>
          <button className="button" onClick={() => handleDelete(post.id)}>
            Delete
          </button>
        </div>
      )}
      <div className="card-divider"></div>
      <h3>{post.title}</h3>
      <div className="card-content">
        <p>{post.body}</p>
      </div>
      <button className="commentButton" onClick={() => commentShow(post.id)}>
        Show Comments
      </button>

      {comments.length > 0 &&
        comments.map((comment) => (
          <div className="comment" key={comment.id}>
            {i++}-{comment.body}
            {email == comment.email && (
              <div className="options">
                <button className="button2" onClick={() => checkEditComment()}>
                  Edit
                </button>
                <button
                  className="button2"
                  onClick={() => deleteComment(comment.id)}
                >
                  Delete
                </button>
                {checkEdit != null && (
                  <form>
                    <div className="SingleCredential">
                      <input
                        className="fields"
                        type="text"
                        value={singleTitle|| comment.title}
                        placeholder="Title"
                        onChange={(e) => setsingleTitle(e.target.value)}
                      />
                    </div>
                    <div className="SingleCredential">
                      <input
                        className="fields"
                        type="text"
                        value={singleComment||comment.body}
                        placeholder="Comment"
                        onChange={(e) => setSingleComment(e.target.value)}
                      />
                    </div>

                    <button
                      className="button"
                      onClick={() => editComment(comment.id)}
                      type="submit"
                    >
                      Submit
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        ))}

      <button className="commentButton" onClick={() => checkaddComment()}>
        Add Comment
      </button>
      {checkComment != null && (
        <form>
          <div className="SingleCredential">
            <input
              className="fields"
              type="text"
              value={singleTitle}
              placeholder="Title"
              onChange={(e) => setsingleTitle(e.target.value)}
            />
          </div>
          <div className="SingleCredential">
            <input
              className="fields"
              type="text"
              value={singleComment}
              placeholder="Comment"
              onChange={(e) => setSingleComment(e.target.value)}
            />
          </div>

          <button className="button" onClick={addComment} type="submit">
            Submit
          </button>    
        </form>
      )}
    </div>
  );
};

export default Post;
