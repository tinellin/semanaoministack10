import React, { useEffect, useState } from "react";
import { ToastContainer, Flip } from "react-toastify";

import DevItem from "../DevItem";
import DevForm from "../DevForm";
import { success, error } from "../Messages";
import api from "../../services/api";

import "./styles.css";

export default function Dev() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    loadDevs();
  }, []);

  async function loadDevs() {
    const response = await api.get("/devs");
    setDevs(response.data);
  }

  async function handleAddDev(data) {
    let repeat = false;

    devs.map(async dev => {
      if (data.github_username === dev.github_username) {
        repeat = true;
      }
    });

    if (!repeat) {
      await api.post("/devs", data);
      loadDevs();
      success();
    } else {
      error();
    }
  }

  async function handleRemoveDev(github_username) {
    await api.delete("/devs", { data: { github_username } });
    await loadDevs();
  }

  return (
    <div id="main">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} onRemove={handleRemoveDev} />
          ))}
        </ul>
      </main>
      <ToastContainer transition={Flip} />
    </div>
  );
}
