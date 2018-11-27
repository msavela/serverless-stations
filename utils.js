"use strict";

/**
 * Calculate power to link station from a given distance
 *
 *  power = (reach - device's distance from linkstation)^2
 *  if distance > reach, power = 0
 *
 * @param {number} reach link station maximum reach
 * @param {number} distance distance to the link station
 * @returns {number} link station power from given distance
 */
const calculatePower = (reach, distance) =>
  distance > reach ? 0 : Math.pow(reach - distance, 2);

/**
 * Map distance and power to the list of link stations
 *
 * Calculate distance between two points
 * using pythagoras' theorem:
 *
 * Distance = Math.hypot(x1-x2, y1-y2)
 *
 *         /|
 *        / |
 *    c  /  | y1-y2 (b)
 *      /   |
 *     /____|
 *     x1-x2 (a)
 *
 * @param {Array.<number[]>} stations [x, y, reach]
 * @param {Array.<number,number>} point [x, y]
 * @returns {Array.<number[]>} stations with distance and power [x, y, reach, distance, power]
 */
const mapStationsWithDistAndPower = (stations, point) =>
  stations.map(station => {
    const distance = Math.hypot(
      station[0] - point[0], // Side a = x1-x2
      station[1] - point[1] //Side b = y1-y2
    );
    const power = calculatePower(station[2], distance);
    return [...station, distance, power];
  });

module.exports = {
  calculatePower,
  mapStationsWithDistAndPower
};
