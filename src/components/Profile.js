import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import GitContext from "../context/gitContext";
import "../App.css";
import Moment from "react-moment";
import Language from "./graphs/Language";
import RepoList from "./RepoList";

export default function Profile(props) {
  const { fetchData, github, errors } = useContext(GitContext);
  useEffect(() => {
    const user = props.match.params.user;
    fetchData(user);
  }, []);
  return (
    <div>
      {errors ? (
        <div className="home">
          <i
            className="fa fa-github"
            style={{
              fontSize: "78px",
              color: "#fff",
              marginTop: "130px"
            }}
          ></i>
          <p className="error">{errors}</p>
          <Link to="/">
            <button>
              <i className="fa fa-search"></i> Try Again
            </button>
          </Link>
        </div>
      ) : (
        <div className="profile">
          <img src={github.avatar} alt="Github Avatar" />
          <p>@{github.userId}</p>
          <h1>{github.name}</h1>
          <p>{github.bio}</p>

          <div className="profiledata">
            <p>
              <i
                className="fa fa-suitcase"
                style={{ fontSize: "15px", marginRight: "8px" }}
              ></i>{" "}
              {github.company}
            </p>
            <p>
              <i
                className="fa fa-map-marker"
                style={{ fontSize: "15px", marginRight: "8px" }}
              ></i>
              {github.location}
            </p>
            <p>
              <i
                className="fa fa-calendar"
                style={{ fontSize: "15px", marginRight: "8px" }}
              ></i>
              <span style={{ marginRight: "3px" }}>Joined </span>
              <Moment format="D MMM YYYY">{github.joined}</Moment>
            </p>
          </div>
          <div className="profiledata">
            <h3>{github.repos} Repository</h3>
            <h3>{github.followers} Followers </h3>
            <h3>{github.followings} Following</h3>
          </div>
        </div>
      )}
      <div style={{ display: "flex" }}>
        <Language />
        <Language />
      </div>
      <RepoList />
    </div>
  );
}
