
/*
 * Find the best link station for each device,
 * according to its coordination and device's reach.
 * read TODO to see how to improve it
 */

// stations coordinates and range [x, y, range]
const stations = [[0, 0, 10], [20, 20, 5], [10, 0, 12]];

// devices coordinates
const devices = [[0, 0], [100, 100], [15, 10], [18, 18]];

// partial application 'cause... syntax sugar is sweet
const square = (x) => Math.pow(x, 2);

/**
 * getPower
 *
 * calculate power of the link station
 * @param reach {number} e.g. 4
 * @param distance {number} e.g. 4
 * @returns {number}
 */
const getPower = (reach, distance) => {
    reach = parseFloat(reach, 10);
    distance = parseFloat(distance, 10);
    if(distance > reach) {
        return 0;
    }
    return square(reach - distance);
};

/**
 * getDistance
 *
 * Calculate distance between to coordination points
 * @param pointA {object} e.g. {4, 2}
 * @param pointB {object} e.g. {4, 2}
 * @returns {undefined}
 */
const getDistance = (pointA, pointB) => {
    pointA.x = parseFloat(pointA.x, 10);
    pointA.y = parseFloat(pointA.y, 10);
    pointB.x = parseFloat(pointB.x, 10);
    pointB.y = parseFloat(pointB.y, 10);
    return Math.sqrt(square(pointA.x - pointB.x) + square(pointA.y - pointB.y));
};

/**
 * getPowersForDevice
 *
 * for each device, returns an array of powers for all stations
 * @param device {array} of [x, y] e.g [1, 4]
 * @param stations {array} of [x, y, r], coordinate and reach of each station
 * @returns {array} of one power (number) per each link station
 */
const getPowersForDevice = (device, stations) => {
    return stations.map((station) => {
        return getPower(station[2],
            getDistance({x: device[0], y: device[1]}, {x: station[0], y: station[1]}))
    });
};

/**
 * getMostSuitableStation
 *
 * the main function to print the final result
 * @param device {array} of [x, y] e.g [1, 4]
 * @param stations {array} of [x, y, r], coordinate and reach of each station
 * @returns {undefined}
 */
const getMostSuitableStation = (device, stations) => {
    const powersList = getPowersForDevice(device, stations);

    // es6 show off...
    const highestPower = Math.max(...powersList);
    const bestStation = stations[powersList.indexOf(highestPower)];
    if (highestPower > 0 ) {
        console.log(
            `###### Link found! \\O/ ######\n`,
            `Best link station for point ${device[0]}, ${device[1]} is:`,
            `${bestStation[0]}, ${bestStation[0]} with power ${highestPower}\n\n`
        );
    } else {
        console.log(
            `### Oh no, sorry ###\n`,
            `No link station within reach for point ${device[0]}, ${device[1]} \n\n`);
    }
};

// Here it all starts, let's find most suitable station for each pint
devices.forEach((device) => getMostSuitableStation(device, stations));


// TODO turn these into unit tests
// let distance = getDistance({x: devices[0][0], y: devices[0][1]}, {x: stations[1][0], y: stations[1][1]});
// let distance = getDistance({x: 10, y: 12}, {x: 1, y: 4});
// console.log('power device 1: ', getPower(1000, distance));
// console.log('power for 10, 1 is ', getPower(10, 1));
// console.log('power is ', getPower(10, 1));
// TODO break it into modules
// TODO check all the inputs, for now it's fine but if it becomes a public function all the input needs to be checked properly
