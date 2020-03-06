import React, { useContext, useEffect, useState } from "react";
import GitContext from "../context/gitContext";

const GhPolyglot = require("gh-polyglot");

export default function RepoList() {
  const { github } = useContext(GitContext);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    let user = github.userId;
    let stats = new GhPolyglot(`${user}/giggle-ui`);
    let list = [];

    stats.getAllRepos((err, stats) => {
      if (stats) {
        stats.map(stat => list.push(stat));
      }
    });

    setRepos(list);
  }, [github]);
  
  console.log(repos);


  return (
    <div>
      {repos.map(repo => (
        <p>{repo.name}</p>
      ))}
    </div>
  );
}
