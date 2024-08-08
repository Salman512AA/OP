import React, { useEffect, useState, useContext } from "react";
import noteContext from "../context/notes/noteContext";
import { useNavigate } from "react-router-dom";

const AboutUser = () => {
  const context = useContext(noteContext);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Destructuring
  const { getUserdata } = context;

  useEffect(() => {
    const fetchUserData = async () => {
      if (localStorage.getItem("token")) {
        try {
          const userData = await getUserdata();
          setUser(userData);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      } else {
        navigate("/login");
      }
    };

    fetchUserData();
  }, [getUserdata]);

  return (
    <div className="container mt-5">
      {user ? (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              <strong>Name:</strong> {user.name}
            </h5>
            <h5 className="card-subtitle mb-2 text-muted">
              <strong>Email:</strong> {user.email}
            </h5>
            <h5 className="card-text">
              <strong>User_Id:</strong> {user._id}
            </h5>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

export default AboutUser;
