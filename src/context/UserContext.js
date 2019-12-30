import React, { useState } from "react";
import axios from "axios";
import GitContext from "./gitContext";

const UserContextProvider = props => {
  const [github, setGithub] = useState({
    userId: null,
    avatar: null,
    name: null,
    company: null,
    bio: null,
    location: null,
    repos: null,
    followers: null,
    followings: null,
    joined: null
  });
  const [errors, setErrors] = useState("");

  const fetchData = async user => {
    try {
      const response = await axios.get(`https://api.github.com/users/${user}`);
      const profile = response.data;

      setGithub({
        userId: profile.login,
        avatar: profile.avatar_url,
        name: profile.name,
        company: profile.company,
        bio: profile.bio,
        location: profile.location,
        repos: profile.public_repos,
        followers: profile.followers,
        followings: profile.following,
        joined: profile.created_at
      });
    } catch (error) {
      setErrors("User does not exits");
    }
  };
  return (
    <GitContext.Provider value={{ fetchData, github, errors }}>
      {props.children}
    </GitContext.Provider>
  );
};
export default UserContextProvider;
