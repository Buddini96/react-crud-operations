import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Create() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [nextId, setNextId] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch existing users to find the max id
    axios.get("http://localhost:8000/users").then((res) => {
      const existingUsers = res.data;
      const maxId =
        existingUsers.length > 0
          ? Math.max(...existingUsers.map((user) => parseInt(user.id, 10)))
          : 0;
      setNextId((maxId + 1).toString()); // Ensure nextId is a string
    });
  }, []);

  const handlePostRequest = () => {
    axios
      .post("http://localhost:8000/users", { ...values, id: nextId.toString() })
      .then((res) => {
        console.log(res);
        setNextId((prevId) => (parseInt(prevId, 10) + 1).toString()); // Increment the next ID for the next use
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handlePostRequest();
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1>Add a User</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="name">Name : </label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter Name"
              onChange={(e) =>
                setValues({ ...values, name: e.target.value })
              }
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email">Email : </label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter Email"
              onChange={(e) =>
                setValues({ ...values, email: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone">Phone : </label>
            <input
              type="text"
              name="phone"
              className="form-control"
              placeholder="Enter Phone"
              onChange={(e) =>
                setValues({ ...values, phone: e.target.value })
              }
            />
          </div>
          <button className="btn btn-success">Submit</button>
          <Link to="/" className="btn btn-primary ms-3">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Create;
