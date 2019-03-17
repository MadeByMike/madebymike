module.exports = function(data) {
  var type = typeof obj;
  if (type === "function" || (type === "object" && !!obj)) {
    return JSON.stringify(Object.keys(data), null, 2);
  }
  return data;
};
