import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import React, { useEffect } from "react";

const Profile: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location?.state?.data;

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/");
    Swal.fire({
      position: "top-end",
      icon: "success",
      text: "User logged out successfully",
      showConfirmButton: false,
      timer: 2000,
      toast: true,
    });
  };

  useEffect(() => {
    const getToken = localStorage.getItem("accessToken");
    if (!getToken) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        text: "Unauthorized Access",
        showConfirmButton: false,
        timer: 2000,
        toast: true,
      }).then(() => {
        navigate("/");
      });
    }
  }, [navigate]);

  return (
    <div className="header">
      <div className="header_logo">
        <nav>
          <ul>
            <li>
              <a href="/dashboard">
                <b>DASHBOARD</b>
              </a>
            </li>
            <li>
              <a href="/profile">
                <b>PROFILE</b>
              </a>
            </li>
            <li>
              <a href="/about">
                <b>ABOUT</b>
              </a>
            </li>
            <li>
              <a href="/contact">
                <b>CONTACT US</b>
              </a>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
            <li>
              {/* <button onClick={() => Refresh()}>
                <Link to="/dashboard">Login</Link>
              </button> */}
            </li>
          </ul>
        </nav>
      </div>
      <div className="dashboard-container">
        <h1>
          {user
            ? `HI ${user?.username.toUpperCase()} WELCOME !`
            : `NO USER FOUND`}
        </h1>
        {user ? (
          <div className="card">
            <div className="card-body">
              <p>
                <strong>Username:</strong> {user?.username}
              </p>
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
              <p>
                <strong>Role:</strong> {user?.role}
              </p>
              <p>
                <strong>Account verified:</strong>{" "}
                {user?.isVerified?.toString()}
              </p>
              <p>
                <strong>UserId:</strong> {user?._id}
              </p>
            </div>
          </div>
        ) : (
          <p>No user data available.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
