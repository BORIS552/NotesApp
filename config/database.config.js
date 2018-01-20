var serverConfig = require('../serverConfig');
var ip = serverConfig.ipAddr();
module.exports = {
	url: 'mongodb://localhost:27017/notes'
}