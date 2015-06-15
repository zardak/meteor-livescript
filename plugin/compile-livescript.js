var fs = Npm.require('fs');
var livescript = Npm.require('livescript');

var stripSourcemap = function(code) {
  var sourcemapPosition = code.lastIndexOf('//# sourceMappingURL');
  return code.substring(0, sourcemapPosition);
};

var handler = function(compileStep) {
  var source = compileStep.read().toString('utf8');
  var outputFile = compileStep.inputPath + ".js";

  var options = {
    bare: true,
    map: 'embedded',
    filename: '/' + outputFile
  };

  try {
    var output = livescript.compile(source, options);
  } catch (e) {
    throw new Error(
      compileStep.inputPath + ':' +
      (e.location ? (e.location.first_line + ': ') : ' ') +
      e.message
    );
  }

  compileStep.addJavaScript({
    path: outputFile,
    sourcePath: compileStep.inputPath,
    data: stripSourcemap(output.code),
    sourceMap: output.map,
    bare: compileStep.fileOptions.bare
  });
};

Plugin.registerSourceHandler("ls", handler);
