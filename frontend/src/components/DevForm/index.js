import React, { useState, useEffect } from "react";

import "./styles.css";

export default function DevForm({ onSubmit }) {
  const [github_username, setGithubUsername] = useState("");
  const [techs, setTechs] = useState("");

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      err => {
        console.log(err);
      },
      {
        timeout: 30000
      }
    );
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    await onSubmit({
      github_username,
      techs,
      latitude,
      longitude
    });

    setGithubUsername("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="github_username">Usuário do GitHub</label>
        <input
          name="github_username"
          id="username_github"
          required
          value={github_username}
          onChange={e => setGithubUsername(e.target.value)}
        />
      </div>

      <div className="input-block">
        <label htmlFor="techs">Tecnologias</label>
        <input
          name="techs"
          id="techs"
          required
          value={techs}
          onChange={e => setTechs(e.target.value)}
        />
      </div>

      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input
            type="number"
            name="Latitude"
            id="Latitude"
            required
            value={latitude}
            onChange={e => setLatitude(e.target.value)}
          />
        </div>

        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input
            name="Longitude"
            id="Longitude"
            required
            type="number"
            value={longitude}
            onChange={e => setLongitude(e.target.value)}
          />
        </div>
      </div>
      <button type="submit">Salvar</button>
    </form>
  );
}
