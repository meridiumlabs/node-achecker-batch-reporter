module.exports =  {
	API_KEY : 'enter-API-key-here',
	output : 'rest', //html, rest
	guide : 'WCAG2-AA', // 'BITV1', '508', 'STANCA', 'WCAG1-A', 'WCAG1-AA', 'WCAG1-AAA', 'WCAG2-A', 'WCAG2-AA', 'WCAG2-AAA'.
	outputJSONFilename : 'result.jsonp',
	outputFilename : 'report.html',
	outputDirectory : './result/',
	template: './_template/result.html',
	jsonPaddingFunctionName : 'parseResults',
	uris: [{ "uri" : "http://www.google.com"}]
};