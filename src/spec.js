import Mocha from 'mocha';
import colors from 'colors/safe';

const inherits = Mocha.utils.inherits;
const Base     = Mocha.reporters.Base;
const cursor   = Base.cursor;

/**
 * Initialize a new `GherkinSpec` test reporter.
 *
 * @api public
 * @param {Runner} runner
 */
function GherkinSpec(runner) {
  Base.call(this, runner);

  let indents = 0;
  let n       = 0;

  if (!Base.useColors) {
    colors.enabled = false;
  }

  function indent() {
    return Array(indents).join('  ');
  }

  runner.on('start', () => {
    console.log();
  });

  runner.on('suite', (suite) => {
    ++indents;

    let text = suite.title;
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

  runner.on('suite end', () => {
    --indents;
    if (indents === 1) {
      console.log();
    }
  });

  runner.on('pending', (test) => {
    console.log(indent() + '  ' + colors.cyan('- ' + test.title));
  });

  runner.on('pass', (test) => {
    let fmt = indent() + colors.green('  ' + Base.symbols.ok + ' %s');
    if (test.speed === 'fast') {
      cursor.CR();
      console.log(fmt, test.title);
    } else {
      fmt += Base.color(test.speed, ' (%dms)');
      cursor.CR();
      console.log(fmt, test.title, test.duration);
    }
  });

  runner.on('fail', (test) => {
    cursor.CR();
    console.log(indent() + '  ' + colors.red('%d) %s'), ++n, test.title);
  });

  runner.on('end', this.epilogue.bind(this));
}

// Inherit from `Base.prototype`.
inherits(GherkinSpec, Base);

// Expose `GherkinSpec`.
exports = module.exports = GherkinSpec;
