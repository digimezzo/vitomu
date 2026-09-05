// Allow angular using electron module (native node modules)
const fs = require('fs');
const f_angular = 'node_modules/@angular-devkit/build-angular/src/tools/webpack/configs/common.js';

fs.readFile(f_angular, 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace(/isPlatformServer \? 'node' : 'web',/g, "isPlatformServer ? 'node' : 'electron-renderer',");
  result = result.replace(/externals: \[\{ '@electron\/remote': 'commonjs @electron\/remote' \}, \.\.\.externalDependencies\],/g, 'externals: externalDependencies,');
  result = result.replace(/externals: externalDependencies,/g, "externals: [{ '@electron/remote': 'commonjs @electron/remote' }, ...externalDependencies],");

  fs.writeFile(f_angular, result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});