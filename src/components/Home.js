import React, { useState } from "react";
import "../App.css";

const Home = props => {
  const [user, setUser] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    props.history.push(`/profile/${user}`);
  };
  return (
    <div className="home">
      <form onSubmit={handleSubmit}>
        <i
          className="fa fa-github"
          style={{ fontSize: "78px", color: "#fff", marginBottom: "25px" }}
        ></i>
        <h1 style={{ color: "#fff" }}>Find Your Github Stats</h1>

        <input
          type="text"
          placeholder="Type your Github Username"
          value={user}
          onChange={e => setUser(e.target.value)}
          required
        />
        <button>
          <i className="fa fa-search"></i> Search
        </button>
      </form>
    </div>
  );
};
export default Home;
