const glob = require('glob');
const fs = require('fs');
const tokenizer = require('./tokenizer');
const parse = require('./parser');

fs.readFile('Docs/Core/map.nx', (err, data) => {
  const source = data.toString('utf8');
  const tokens = tokenizer(source);
  const ast = parse(tokens, source);

  process.exit(0);
});


//glob('**/*.nx', function(er, files) {
  //console.log(er, files)
//});
