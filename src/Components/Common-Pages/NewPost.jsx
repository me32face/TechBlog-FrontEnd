import React, { useEffect, useState } from 'react';
import Navbar from '../STATIC/Navbar';
import Footer from '../STATIC/Footer';
import "../../Assets/Styles/NewPost.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // ✅ Import Swal

function NewPost() {

  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "You must be a user and  logged in to access this page.",
      }).then(() => {
        navigate("/UserLogin");
      });
    }
  }, []);

  const usersId = localStorage.getItem("userId");

  const [newPostData, setNewPostData] = useState({
    userId: `${usersId}`,
    title: '',
    content: '',
    category: '',
    hashtags: '',
    image: ''
  });

  const handleChange = (e) => {
    setNewPostData({
      ...newPostData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewPostData({ ...newPostData, image: file });
  };

  const SubmitForm = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to publish this post?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Publish",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post('http://localhost:3003/TechBlog/AddPost/', newPostData, {
            headers: { "Content-Type": "multipart/form-data" }
          })
          .then((up) => {
            if (up.data.status === 200) {
              Swal.fire({
                icon: "success",
                title: "Post Published!",
                text: "Your blog post has been successfully published. Once approved by admin, it will be on the profile",
                confirmButtonText: "View Posts"
              }).then(() => {
                navigate("/UserProfile");
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to save the post. Please try again.",
              });
            }
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              icon: "error",
              title: "Server Error",
              text: "Something went wrong. Contact admin.",
            });
          });
      }
    });
  };

  return (
    <div>
      <Navbar />
      <div className="newpost-main-container">
        <h2 className="newpost-title">Create a New Blog Post</h2>
        <form onSubmit={SubmitForm} className="newpost-form">

          <div className="newpost-form-group">
            <label htmlFor="title" className="newpost-label">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newPostData.title}
              onChange={handleChange}
              className="newpost-input"
              required
              placeholder="Enter the blog title"
            />
          </div>

          <div className="newpost-form-group">
            <label htmlFor="content" className="newpost-label">Content</label>
            <textarea
              id="content"
              name="content"
              value={newPostData.content}
              onChange={handleChange}
              className="newpost-textarea"
              rows="6"
              required
              placeholder="Write your blog content here..."
            ></textarea>
          </div>

          <div className="newpost-form-group">
            <label htmlFor="category" className="newpost-label">Category</label>
            <select
              id="category"
              name="category"
              value={newPostData.category}
              onChange={handleChange}
              className="newpost-select"
              required
            >
              <option value="">Select a category</option>
              <option value="Programming">Programming</option>
              <option value="AI">Artificial Intelligence</option>
              <option value="Web Development">Web Development</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Gadgets">Gadgets</option>
              <option value="Mobile Phones">Mobile Phones</option>
              <option value="Technology">Technology</option>
            </select>
          </div>

          <div className="newpost-form-group">
            <label htmlFor="hashtags" className="newpost-label">Hashtags</label>
            <input
              type="text"
              id="hashtags"
              name="hashtags"
              value={newPostData.hashtags}
              onChange={handleChange}
              className="newpost-input"
              placeholder="Add hashtags separated by commas (e.g., tech,AI,webdev)"
            />
          </div>

          <div className="newpost-form-group">
            <label htmlFor="image" className="newpost-label">Upload Image</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              className="newpost-input"
              accept="image/*"
            />
          </div>

          <div className="text-center">
            <button type="submit" className="newpost-submit-button">Publish Post</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default NewPost;
