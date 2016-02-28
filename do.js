const limit = 10;
const _ = require('lodash');
const kugeln = [
  { name: 'A', count: 9, visited: 0 },
  { name: 'B', count: 1, visited: 0 },
  { name: 'C', count: 2, visited: 0 },
  { name: 'D', count: 6, visited: 0 },
  { name: 'E', count: 3, visited: 0 },
  { name: 'F', count: 1, visited: 0 },
  { name: 'G', count: 7, visited: 0 },
  { name: 'H', count: 3, visited: 0 },
  { name: 'I', count: 6, visited: 0 },
  { name: 'J', count: 2, visited: 0 }
];

var paths = 0;

function updateAt(kugeln, position) {
  takeFromLeft(kugeln, position, 1);
  takeFromRight(kugeln, position, 2);
  if (kugeln[position].count >= limit) {
    addAt(kugeln, position, -limit)
  }
  kugeln[position].visited = kugeln[position].visited + 1;
}

function takeFromLeft(kugeln, position, count) {
  var leftPosition = Math.max(position - 1, kugeln.length - 1);
  switchFromTo(kugeln, count, position, leftPosition);
}

function takeFromRight(kugeln, position, count) {
  var rightPosition = position + 1;
  if (rightPosition >= kugeln.length) {
    rightPosition = 0;
  }
  switchFromTo(kugeln, count, position, rightPosition);
}

function switchFromTo(kugeln, count, position, nextPosition) {
  if (kugeln[nextPosition].count >= count) {
    addAt(kugeln, nextPosition, -count);
  } else {
    addAt(kugeln, nextPosition, -kugeln[nextPosition].count);
    addAt(kugeln, nextPosition, limit - count);
  }
  addAt(kugeln, position, count);
}

function addAt(kugeln, position, count) {
  kugeln[position].count = kugeln[position].count + count;
}

function log(kugeln) {
  kugeln.forEach((schale) => {
    console.log(schale.name, schale.count, schale.visited);
  })
  console.log('----------');
}

function goodCoordinates(kugeln) {
  var firstNorth = kugeln[0].visited;
  var secondNorth = kugeln[1].visited;
  var firstEast = kugeln[5].visited;
  var secondEast = kugeln[6].visited;

  var northGood = 
    (firstNorth < 2) ||
    (firstNorth === 2 && secondNorth === 9) ||
    (firstNorth === 3 && secondNorth <= 3);
  var eastGood = 
    (firstEast === 0 && secondEast <= 8);

  var result =
    _.every(kugeln, (schale) => schale.visited <= 9) &&
    northGood && eastGood;

  return result;
}

function goDeep(currentKugeln, currentIndex) {
  if (!goodCoordinates(currentKugeln)) {
    paths = paths - 1;
    return;
  }

  var overallSum = _.reduce(currentKugeln, (sum, n) => sum + n.count, 0);
  if (overallSum === 0) {
    currentKugeln[path]
    log(currentKugeln);
    console.log(path.join(','));
    console.log('great success!');
    process.exit();
  }

  updateAt(currentKugeln, currentIndex);
  
  paths += currentKugeln.length;
  for (var i = 0; i < currentKugeln.length; i++) {
    var index = i;
    var newKugeln = _.cloneDeep(currentKugeln);
    goDeep(newKugeln, index);
  }
}

var start = parseInt(process.argv[2], 10);
goDeep(kugeln, start);