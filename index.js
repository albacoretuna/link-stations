// stations coordinates and range [x, y, range]
const stations = [[0, 0, 10], [20, 20, 5], [10, 0, 12]];

// devices coordinates
const devices = [[0, 0], [100, 100], [15, 10], [18, 18]];

// partial application, just some healthy syntax sugar for show off purposes only
const square = (x) => Math.pow(x, 2);

// calculates power according to the reach
const getPower = (reach, distance) => {
    if(distance > reach) {
        return 0;
    }
    return square(reach - distance);
};

// params: two points as objects of x and y e.g. pointA = {4, 2} returns number
const getDistance = (pointA, pointB) => {
    const distance = Math.sqrt(square(pointA.x - pointB.x) + square(pointA.y - pointB.y));
    return distance;
};


console.log('power for 10, 1 is ', getPower(10, 1));
console.log('power is ', getPower(10, 1));

// TODO turns this into tests
// let distance = getDistance({x: devices[0][0], y: devices[0][1]}, {x: stations[1][0], y: stations[1][1]});
// let distance = getDistance({x: 10, y: 12}, {x: 1, y: 4});
// console.log('power device 1: ', getPower(1000, distance));

// for each device, returns an array of pwoers for all stations
const getPowerForDevice = (device, stations) => {
    return stations.map((station) => {
        return getPower(station[2],
            getDistance({x: device[0], y: device[1]}, {x: station[0], y: station[1]}));
    });
};

console.log('first device: ', getPowerForDevice(devices[0], stations).sort((a, b) => b-a));
console.log('second device: ', getPowerForDevice(devices[1], stations).sort((a, b) => b-a));
console.log('third  device: ', getPowerForDevice(devices[2], stations).sort((a, b) => b-a));
