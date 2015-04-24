var fs = require('fs'),
	validator = require('wcag-validator'),
	when = require('when'),
	open = require('open'),
	xml2js = require('xml2js'),
	config = require('./config');

var xmlParserOptions = {
		explicitArray: false
	},
	validationResult = [];

var xmlParser = new xml2js.Parser(xmlParserOptions);
var urisToParse = config.uris;

function parseUri(uriObject) {
	var deferredUriObject = when.defer();

	var uriOptions = {
		id : config.API_KEY,
		output : config.output,
		uri : uriObject.uri
	};

	console.log(uriOptions);

	validator(uriOptions, function(error, result) {
		if(error) {
			console.error(error);
			validationResult.push({
				"date" : new Date().toString(),
				"title" : uriObject.uri,
				"uri" : uriObject.uri,
				"status" : '',
				"errors" : '',
				"likely" : '',
				"potential" : '',
				"guideline" : '',
				"result" : '',
				"summary" : 'An error occured when parsing this URI'
			});
			deferredUriParser.resolve();
			return deferredUriObject.promise;
		}

		xmlParser.parseString(result, parseUriResult);
		deferredUriObject.resolve();
	});

	function parseUriResult(error, result) {
		validationResult.push({
			"date" : new Date().toString(),
			"title" : uriObject.uri,
			"uri" : uriObject.uri,
			"status" : result.resultset.summary.status,
			"errors" : result.resultset.summary.NumOfErrors,
			"likely" : result.resultset.summary.NumOfLikelyProblems,
			"potential" : result.resultset.summary.NumOfPotentialProblems,
			"guideline" : result.resultset.summary.guidelines.guideline,
			"result" : result.resultset.results.result,
			"summary" : result.resultset.summary
		});
	}

	return deferredUriObject.promise;
}

function saveResult() {
	fs.exists(config.outputDirectory, function(exists) {
		if(exists) {
			writeResults();
		} else {
			fs.mkdir(config.outputDirectory, function(a, b) {
				writeResults();
			});
		}
	});
}

function writeResults() {
	var resultDirectoryName = new Date().getTime();
	var fileContents = config.jsonPaddingFunctionName + '({"date" : ' + JSON.stringify(new Date().toString()) + ', "results" : ' + JSON.stringify(validationResult) + '});';
	var generatedDirectory = config.outputDirectory + resultDirectoryName + '/';

	fs.mkdir(generatedDirectory, function(a, b) {
		fs.writeFile(generatedDirectory + config.outputJSONFilename, fileContents, function(error) {
			console.log('-------------------------------------------------');

			if(error) {
			    console.error(error);
			} else {
				fs.createReadStream(config.template).pipe(fs.createWriteStream(generatedDirectory + config.outputFilename));
			    console.log('Report saved to ' + generatedDirectory + config.outputFilename);
				open(generatedDirectory + config.outputFilename, function(err) {
					if(err) throw err;
				});
			}
		});
	});
}

(function() {
	var deferredUriHandler = when.defer();
	if(urisToParse.length === 0) {
		console.log('No uris to parse. Exiting');
		process.exit(1);
	}
	when.map(urisToParse, function(uri) {
		parseUri(uri).then(function() {
			deferredUriHandler.resolve();
			if(urisToParse.length == validationResult.length) {
				saveResult();
			}
		});
	});
	return deferredUriHandler.promise;
})();