import React, { useEffect, useState } from 'react';
import Navbar from '../STATIC/Navbar';
import Footer from '../STATIC/Footer';
import axios from 'axios';
import "../../Assets/Styles/AllPosts.css";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/AllPosts`)
      .then(res => setPosts(res.data.data))
      .catch(err => console.error("Failed to fetch posts", err));
  }, []);

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

  return (
    <div>
      <Navbar />
      <div className="allposts-wrapper">
        <h2 className="allposts-page-title">All Blog Posts</h2>
        <div className="container">
          <div className="row">
            {posts
            .slice()
            .reverse()
            .map((post, index) => (
              <div
                className="col-md-4 mb-4 allposts-col"
                key={post._id}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="card allposts-card fade-in-card">
                  <img
                    src={post.image || "fallback-image-url-or-placeholder.png" || "https://via.placeholder.com/400x200"}
                    className="card-img-top allposts-image"
                    alt={post.title}
                  />
                  <div className="card-body allPosts-card-custom">
                    <h5 className="card-title allposts-post-title">{post.title.substring(0,100)}</h5>
                    <p className="allposts-author">By <strong>{post.userDetails?.username || "Unknown"}</strong></p>
                    <p className="allposts-date">Posted on: {formatDate(post.datePosted)}</p>
                    <p className="allposts-snippet">{post.content.substring(0, 100)}...</p>
                    <p className="allposts-category">Category: <em>{post.category}</em></p>
                    <p className="allposts-tags">{post.hashtags}</p>
                  </div>
                  <div className='viewMore-btn-allPosts'>
                    <a href={`/post/${post._id}`} className="btn allposts-btn">View More</a>
                  </div>
                </div>
              </div>
            ))}
            {posts.length === 0 && (
              <p className="text-center text-muted">No posts available.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AllPosts;
