// src/pages/SinglePost.js

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../STATIC/Navbar';
import Footer from '../STATIC/Footer';
import '../../Assets/Styles/SinglePost.css';

function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios
      .post(`${API_BASE_URL}/GetPostById/${id}`)
      .then((res) => {
        setPost(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  if (!post) {
    return (
      <div>
        <Navbar />
        <div className="singlepost-loading-text">Loading post...</div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="singlepost-container">
        <div className="singlepost-header-section">
          <h1 className="singlepost-heading">{post.title}</h1>
          <p className="singlepost-subinfo">
            By <span className="singlepost-author">{post.userDetails?.username || "Unknown"}</span> |{' '}
            <span className="singlepost-date">{formatDate(post.datePosted)}</span>
          </p>
          {localStorage.getItem("userId") === post.userDetails?._id && (
            <div className="singlepost-edit-button text-center mt-4">
              <Link to={`/EditPost/${post._id}`} className="btn btn-outline-primary">
                Edit Post
              </Link>
            </div>
          )}
        </div>

        <div className="singlepost-image-wrapper">
          <img
            src={post.image || "fallback-image-url-or-placeholder.png" || "https://via.placeholder.com/400x200"}
            alt={post.title}
            className="singlepost-original-image"
          />
        </div>

        <div className="singlepost-content-section">
          {post.content.split('\n').map((para, index) => (
            <p key={index} className="singlepost-full-content">{para}</p>
          ))}       
          <p className="singlepost-category-info">
            <strong>Category:</strong> {post.category}
          </p>
          <p className="singlepost-tags-info">
            <strong>Tags:</strong> {post.hashtags}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SinglePost;
