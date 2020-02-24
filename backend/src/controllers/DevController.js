const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");
const { findConnections, sendMessage } = require("../websocket");

//index, show, store, update, destroy

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();
    return res.json(devs);
  },

  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;
    const response = await axios.get(
      `https://api.github.com/users/${github_username}`
    );

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const { name = login, avatar_url, bio } = response.data;
      const techsArray = parseStringAsArray(techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });

      // Filtrar as conexões que estão no máximo a 10km de distancia e que o
      // novo dev tenha pelo menos uma das tecnologias filtradas.

      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techsArray
      );

      sendMessage(sendSocketMessageTo, "new-dev", dev);
    }

    return res.json(dev);
  },

  async destroy(req, res) {
    const { github_username } = req.body;
    const { _id } = await Dev.findOne({ github_username });
    const removedDev = await Dev.findByIdAndRemove(_id);
    return res.json({ removedDev });
  },

  async update(req, res) {
    const {
      github_username,
      techs,
      avatar_url,
      bio,
      name,
      latitude,
      longitude
    } = req.body;

    const { _id } = await Dev.findOne({ github_username });

    const location = {
      type: "Point",
      coordinates: [longitude, latitude]
    };

    const updatedDev = await Dev.findByIdAndUpdate(_id, {
      techs,
      avatar_url,
      bio,
      name,
      location
    });

    return res.json({ updatedDev });
  }
};
