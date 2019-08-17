const fs = require('fs');

const dataBuffer = fs.readFileSync('1-json.json');
const dataJSON = dataBuffer.toString();
const myInfo = JSON.parse(dataJSON);

myInfo.name = 'MacMac';
myInfo.planet = 'Venus';
myInfo.age = '300';

const myInfoJSON = JSON.stringify(myInfo);
fs.writeFileSync('1-json.json', myInfoJSON);
console.log('Json Overwrite');
