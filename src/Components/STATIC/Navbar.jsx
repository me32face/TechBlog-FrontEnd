import React, { useEffect, useState } from 'react';
import '../../Assets/Styles/Navbar.css';
import Swal from 'sweetalert2';


function Navbar() {

  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);
  }, []);

const handleLogout = () => {
  try {
    localStorage.clear();
    setUsername("");
    Swal.fire({
      icon: 'success',
      title: 'Logged out successfully!',
      text: 'You have been logged out.',
      timer: 500,
      showConfirmButton: false,
      timerProgressBar: true,
    }).then(() => {
      window.location.href = "/";
    });
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Logout Failed',
      text: 'An error occurred while logging out.',
    });
  }
};

  return (
    <div className="mainNavbar">
      <nav className="navbar navbar-expand-lg bg-body-tertiary custom-navbar-bg">
        <div className="container-fluid">

          {/* Logo */}
          <a className="navbar-brand custom-navbar-brand" href="/">
            <i>TechBlog</i>
          </a>

          {/* Toggler */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible Content */}
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link custom-navbar-link" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link custom-navbar-link" href="/NewPost"> Add New Post</a>
              </li>
              <li className="nav-item">
                <a className="nav-link custom-navbar-link" href="/AllPosts">All Posts</a>
              </li>
              <li className="nav-item">
                <a className="nav-link custom-navbar-link" href="/#recent-posts">Recent Posts</a>
              </li>
            </ul>

            {/* Right-side actions */}
            <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
              {username ? (
                <>
                  <a href="/UserProfile" className='profile-icon-nav animated-username'>
                    <i className="fas fa-user p-2" style={{ fontSize: '24px', color: '#23f507' }}></i>
                    {username}
                  </a>
                  <button onClick={handleLogout} className='logout-button-nav'>
                    <i className="fas fa-sign-out-alt p-2 logout-icon-nav" style={{ fontSize: '24px', color: 'white' }}></i>
                  </button>
                </>
              ) : (
                <div className='navbar-reg-log-btns'>
                  <a href="/User-Registration" className="btn btn-sm custom-login-btn-register">
                    Register
                  </a>
                  <a href="/UserLogin" className="btn btn-sm custom-login-btn">
                    Login
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
