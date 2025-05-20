import React, { useEffect, useState } from 'react';
import Navbar from '../STATIC/Navbar';
import "../../Assets/Styles/UserProfile.css";
import axios from 'axios';
import Footer from '../STATIC/Footer';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


function UserProfile() {
  const navigate = useNavigate();
  const loginId = localStorage.getItem("userId");

  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    dob: '',
    bio: '',
    socialLinks: '',
  });

  useEffect(() => {
    if (loginId === null) {
          Swal.fire({
            title: 'Warning!',
            text: 'Please login to access this page',
            icon: 'warning',
            confirmButtonText: 'Okay',
            timer: 2000,
            showConfirmButton: true 
          })
          .then(()=>{
            navigate("/UserLogin");
          })
    }
  }, [loginId, navigate]);

  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .post(`http://localhost:3003/TechBlog/UserProfile/${loginId}`)
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: 'Warning!',
          text: 'Sorry! Server error while fetching user data',
          icon: 'warning',
          confirmButtonText: 'Okay',
          // timer: 2000, // Optional: Auto close after 2 seconds
          showConfirmButton: true 
        })      
      });
  }, [loginId]);

  useEffect(() => {
    axios
      .post(`http://localhost:3003/TechBlog/UsersPosts/${loginId}`)
      .then((res) => {
                console.log(res.data);
        setPosts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: 'Warning!',
          text: 'Sorry! Server error while fetching posts',
          icon: 'warning',
          confirmButtonText: 'Okay',
          // timer: 2000, // Optional: Auto close after 2 seconds
          showConfirmButton: true 
        })  
      });
  }, [loginId]);

  const handleEditClick = () => {
    setEditUser(user);
    setShowModal(true);
  };

  const handleChange = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:3003/TechBlog/UpdateUserProfile/${loginId}`, editUser)
      .then((res) => {        
        alert("Profile updated successfully");
        setUser(res.data.data);
        setShowModal(false);
      })
      .catch((err) => {
        console.error(err);
        alert("Error updating profile");
      });
  };

  const handleClose = () => {
    setShowModal(false); 
  };

  const handleSave = () => {
    const updatedData = {
      fullName: editUser.fullName,
      username: editUser.username,
      email: editUser.email,
      phone: editUser.phone,
      dob: editUser.dob,
      bio: editUser.bio,
      socialLinks: editUser.socialLinks,
    };
  
    axios
      .put(`http://localhost:3003/TechBlog/UpdateUserProfile/${loginId}`, updatedData)
      .then((res) => {
        Swal.fire({
          title: 'Success!',
          text: 'Profile Updated Successfully',
          icon: 'success',
          confirmButtonText: 'Okay',
          timer: 2000,
          showConfirmButton: true 
        })         
        setUser(res.data.data);
        setShowModal(false); 
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          title: 'Warning!',
          text: 'Profile updation failed. Please try again after sometime.',
          icon: 'warning',
          confirmButtonText: 'Okay',
          // timer: 2000, // Optional: Auto close after 2 seconds
          showConfirmButton: true 
        })        
      });
  };

  const formatDate = (date) => {
    if (!date) return "";
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString(); 
  };

  const handleDeletePost = (postId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This post will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3003/TechBlog/DeletePost/${postId}`)
          .then((e) => {
            console.log(e);
            
            if(e.status===200){
              Swal.fire({
                title: 'Deleted!',
                text: 'Post deleted successfully',
                icon: 'success',
                confirmButtonText: 'Okay',
                timer: 2000, // Optional: Auto close after 2 seconds
                showConfirmButton: true 
              })
              setPosts(posts.filter(post => post._id !== postId));
            }
            else if (e.status===404){
              Swal.fire({
                title: 'Error!',
                text: 'Your post not deleted.',
                icon: 'warning',
                confirmButtonText: 'Okay',
                // timer: 2000, // Optional: Auto close after 2 seconds
                showConfirmButton: true 
              })
            }
            else if(e.status===500){
              Swal.fire({
                title: 'Error!',
                text: 'Something went wrong. Please try after sometime or contact admin',
                icon: 'warning',
                confirmButtonText: 'Okay',
                // timer: 2000, // Optional: Auto close after 2 seconds
                showConfirmButton: true 
              })
            }
          })
          .catch((err) => {
            console.error(err);
            Swal.fire('Error!', 'Failed to delete post.', 'error');
          });
      }
    });
  };
  

  return (
    <div>
      <Navbar />
      <div className="UserProfile-Main-Page">
        <div className="profile-container container">
          <div className="profile-card row justify-content-center align-items-center shadow p-4 rounded">
            <div className="col-md-4 text-center">
              <img
                src={user.image || "fallback-image-url-or-placeholder.png" || "https://via.placeholder.com/400x200"}
                alt="No Profile Picture Uploaded"
                className="profile-picture-user w-100 h-auto mb-3 rounded"
              />
            </div>
            <div className="col-md-8">
              <div className="profile-info">
                <h3 className="profile-name mb-3">{user?.fullName}</h3>
                <p className="profile-email mb-2">
                  <strong>Email:</strong> {user?.email}
                </p>
                <p className="profile-username mb-2">
                  <strong>Username:</strong> {user?.username}
                </p>
                <p className="profile-bio mb-2">
                  <strong>Bio:</strong> {user?.bio}
                </p>
                <p className="profile-phone mb-2">
                  <strong>Phone:</strong> {user?.phone}
                </p>
                <p className="profile-dob mb-2">
                  <strong>Date of Birth:</strong> {formatDate(user?.dob)}
                </p>
                <p className="profile-social mb-2">
                  <strong>Social Links:</strong> {user?.socialLinks}
                </p>
                {/* Edit Profile Button */}
                <a href="/NewPost">
                  <button className="btn btn-primary m-2">Add New Post</button>
                </a>
                <button
                  className="btn btn-primary m-2"
                  onClick={handleEditClick}
                >
                  Edit Profile
                </button>
                <a href="/ForgotPassword">
                  <button className="btn btn-primary m-2">Forgot Password</button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* User's Posts Section */}
        <div className="user-posts-section container mt-5">
          <h2 className="mb-4 your-post-h2-userprofile">Your Posts</h2>
          <div className="row">
            {posts.length > 0 ? (
              posts
              .slice()
              .reverse()
              .map((post) => (
                <div className="col-md-4 mb-4" key={post._id}>
                  <div className="card user-post-card h-100">
                    <img
                      src={post.image || "fallback-image-url-or-placeholder.png" || "https://via.placeholder.com/400x200"}
                      className="card-img-top"
                      alt="Post Thumbnail"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{post.title}</h5>
                      <p className="card-text">
                        {post.content.substring(0, 100)}...
                      </p>
                    </div>
                    <div className='post-handle-userProfile'>
                      <a href={`/Post/${post._id}`} className="btn btn-info">
                          View Post
                        </a>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeletePost(post._id)}
                      >
                        {/* <i class="fa fa-trash" aria-hidden="true"></i> */}
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No posts found.</p>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <div className="custom-modal-header">
              <h2>Edit Profile</h2>
              <button className="close-btn" onClick={handleClose}>×</button>
            </div>
            <div className="custom-modal-body">
              <input type="text" name="fullName" value={editUser.fullName} placeholder="Full Name" onChange={handleChange} />
              <input type="text" name="username" value={editUser.username} placeholder="Username" onChange={handleChange} />
              <input type="email" name="email" value={editUser.email} placeholder="Email" onChange={handleChange} />
              <input type="text" name="phone" value={editUser.phone} placeholder="Phone" onChange={handleChange} />
              <input type="date" name="dob" value={editUser.dob} onChange={handleChange} />
              <textarea name="bio" value={editUser.bio} placeholder="Bio" onChange={handleChange}></textarea>
              <input type="text" name="socialLinks" value={editUser.socialLinks} placeholder="Social Links" onChange={handleChange} />
            </div>
            <div className="modal-buttons">
              <button className="modal-cancel-btn" onClick={handleClose}>Cancel</button>
              <button className="modal-save-btn" onClick={handleSave}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default UserProfile;
