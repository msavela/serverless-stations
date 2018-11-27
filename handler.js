"use strict";

const stations = require("./stations");
const { mapStationsWithDistAndPower } = require("./utils");

module.exports.index = (event, context, callback) => {
  const query = (event || {}).queryStringParameters || {};
  if (query.x === undefined || query.y === undefined) {
    callback(null, {
      statusCode: 400,
      body: JSON.stringify({ error: `Query parameters x,y missing or invalid` })
    });
    return;
  }

  // Map stations with distance and power relative to a given point
  // and sort output of stations by having the most power
  const point = [query.x, query.y];
  const stationsByMostPower = mapStationsWithDistAndPower(stations, point).sort(
    (a, b) => b[4] - a[4]
  );
  const [x, y, reach, distance, power] = stationsByMostPower[0];

  const message =
    power > 0
      ? `Best link station for point ${point[0]},${
          point[1]
        } is ${x},${y} with power ${power}`
      : `No link station within reach for point ${point[0]},${point[1]}`;

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      message: message,
      point: point,
      station: [x, y, reach, distance, power]
    })
  });
};
