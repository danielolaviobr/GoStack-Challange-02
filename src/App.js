import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repos, setRepos] = useState([{}]);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: `${Date.now()}`,
      url: "a",
      techs: "b",
    });
    console.log(response);
    setRepos([...repos, response.data]);
  }

  async function handleRemoveRepository(id) {
    const index = repos.findIndex((repo) => repo.id === id);
    const newRepos = repos;
    console.log(newRepos);
    if (index !== -1) {
      newRepos.splice(index, 1);
    }
    console.log(newRepos);
    setRepos([...newRepos]);
    await api.delete(`repositories/${id}`, repos[index]);
  }

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepos(response.data);
    });
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
