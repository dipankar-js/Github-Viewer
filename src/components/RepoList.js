import React, { useContext, useEffect } from "react";
import GitContext from "../context/gitContext";

const GhPolyglot = require("gh-polyglot");

export default function RepoList() {
  const { github } = useContext(GitContext);

  useEffect(() => {
    let user = github.userId;
    let stats = new GhPolyglot(`${user}/giggle-ui`);

    stats.getAllRepos(function(err, stats) {
      console.log(stats);
    });
  }, [github]);

  return <div></div>;
}
