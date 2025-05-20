import React, { useEffect, useState } from "react";
import Navbar from "../STATIC/Navbar";
import "../../Assets/Styles/Home.css";
import Footer from "../STATIC/Footer";
import axios from "axios";

function Home() {
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("username");
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3003/Techblog/AllPosts")
      .then((response) => {
        setAllPosts(response.data.data);
      })
      .catch((error) => {
        console.error("Failed to fetch all posts", error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <section className="home-hero-section">
        <div className="home-hero-content">
          <h1>Welcome {userName}</h1>
          <h1 className="home-hero-title">Explore. Learn. Share.</h1>
          <p className="home-hero-subtitle">
            Your hub for the latest in tech, tutorials, and developer insights.
          </p>
          <a href="/AllPosts">
            <button className="home-hero-button">Let's Start</button>
          </a>
        </div>
      </section>

      {/* All Posts Section */}
      <section id="recent-posts" className="all-posts-section">
        <h2 className="mb-4">Recent Posts</h2>
        <div className="row">
          {allPosts
          .slice()
          .reverse()
          .map((post) => (
            <div className="col-md-4 mb-4" key={post._id}>
              <div className="card all-post-card">
                <img
                  src={post.image ? post.image : "fallback-image-url-or-placeholder.png"}
                  className="card-img-top"
                  alt={post.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{post.title.substring(0, 75)}</h5>
                  <p className="card-text">
                    By <strong>{post.userDetails?.username}</strong>
                  </p>
                  <p className="card-text">
                    {post.content.substring(0, 150)}...
                  </p>
                </div>
                <div className="viewMore-div-home">
                  <a href={`/post/${post._id}`} className="btn btn-primary viewMore-btn-home">
                      View More 
                  </a>
                </div>
              </div>
            </div>
          ))}
          {allPosts.length === 0 && (
            <p className="text-muted">No posts available.</p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
