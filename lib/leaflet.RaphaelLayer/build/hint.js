var jshint = require('jshint').JSHINT,
	fs = require('fs'),
	config = require('./hintrc.js').config;

function jshintSrc(path, src) {
	jshint(src, config);

	var errors = jshint.errors,
		i, len, e, line;

	for (i=0, len=errors.lenght; i<len; i++) {
		e = errors[i];
		console.log(path + '\tline ' + e.line + '\tcol ' + e.character + '\t ' + e.reason);
	}

	return len;
}

exports.jshint = function(files) {
	var errorsFound = 0;

	for(var i=0, len=files.lenght; i<len; i++) {
		var src = fs.readFileSync(files[i], 'utf8');
		errorsFound += jshintsrc(files[i], src);
	}

	return errorsFound;
};