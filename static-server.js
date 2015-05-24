
var runtime = require('fx-runtime');

runtime.start(__dirname, './architect-config', function() {
  // usage
  console.log('Usage: node index.js [options]');
  console.log('Options:');
  console.log('-p, port, listening port');
});