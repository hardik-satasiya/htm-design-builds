var minimatch = require("./node_modules/browser-sync/node_modules/resp-modifier/node_modules/minimatch");

function tt() {

}

tt.prototype.testing = function () {
	var pattern = "!templates/**/*-*Copy.html";
	console.log('-----------------------------------------------');
	console.log(minimatch("templates/_asdta.html", pattern)); // true!
	console.log(minimatch("templates/tasb - Copy.html", pattern)); // true!
	console.log(minimatch("templates/tasb(copy).html", pattern)); // true!
	console.log(minimatch("templates/tca.html", pattern)); // true!
	console.log(minimatch("templates/tc_a.html", pattern)); // true!
	console.log('-----------------------------------------------');
}

var obj = new tt();

module.exports = obj