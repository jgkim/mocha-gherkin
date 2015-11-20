var Mocha    = require('mocha');
var inherits = Mocha.utils.inherits;
var Base     = Mocha.reporters.Base;
var colors   = require('colors/safe');
var cursor   = Base.cursor;

// Expose `GherkinSpec`.
exports = module.exports = GherkinSpec;

/**
 * Initialize a new `GherkinSpec` test reporter.
 *
 * @api public
 * @param {Runner} runner
 */
function GherkinSpec(runner) {
  Base.call(this, runner);

  var parent = Base;
  var self = this;
  var indents = 0;
  var n = 0;

  if (!Base.useColors) {
    colors.enabled = false;
  }

  function indent() {
    return Array(indents).join('  ');
  }

  runner.on('start', function() {
    console.log();
  });

  runner.on('suite', function(suite) {
    ++indents;

    var text = suite.title;
    switch (suite.name) {
      case 'Feature':
        text = colors.underline.bold(suite.title);
        suite.stories.forEach((story) => {
          text += '\n' + indent() + '  ' + (story);
        });
        break;
      case 'Scenario':
        text = colors.green(suite.title);
        break;
      default:
        text = Base.color('suite', text);
    }
    console.log(indent() + text);
  });

  runner.on('suite end', function() {
    --indents;
    if (indents === 1) {
      console.log();
    }
  });

  runner.on('pending', function(test) {
    console.log(indent() + '  ' + colors.cyan('- ' + test.title));
  });

  runner.on('pass', function(test) {
    var fmt = indent()
      + colors.green('  ' + Base.symbols.ok + ' %s')
      + colors.gray(' ');
    if (test.speed === 'fast') {
      cursor.CR();
      console.log(fmt, test.title);
    } else {
      fmt += Base.color(test.speed, ' (%dms)');
      cursor.CR();
      console.log(fmt, test.title, test.duration);
    }
  });

  runner.on('fail', function(test) {
    cursor.CR();
    console.log(indent() + '  ' + colors.red('%d) %s'), ++n, test.title);
  });

  runner.on('end', self.epilogue.bind(self));
}

// Inherit from `Base.prototype`.
inherits(GherkinSpec, Base);
