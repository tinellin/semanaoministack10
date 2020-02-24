module.exports = parseStringAsArray = item => {
  return item.split(",").map(tech => tech.trim());
};
