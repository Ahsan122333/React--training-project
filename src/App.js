
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import AuthPage from "./components/Auth";
import Posts from "./components/Posts";
import NewPostForm from "./components/NewPostForm";
import { PostsProvider } from "./providers/post-provider";
import EditPost from "./components/EditPost";
import Comment from "./components/Comment";
const App = () => {
  return (
    <PostsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/new" element={<NewPostForm />} />
          <Route path="/edit/:postId" element={<EditPost />} />
          <Route path="/comment" element={<Comment/>}/>
        </Routes>
      </BrowserRouter>
    </PostsProvider>
  );
};

export default App;
