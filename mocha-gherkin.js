var Mocha = require('mocha');

/**
 * Gherkin-style interface:
 *
 * Feature('Serve coffee',
 *   'Coffee should not be served until paid for',
 *   'Coffee should not be served until the button has been pressed',
 *   'If there is no coffee left then money should be refunded', function () {
 *   Scenario('Buy last coffee', function () {
 *     Given('there are 1 coffees left in the machine', function () {
 *       // ...
 *     });
 *     And('I have deposited 1$', function () {
 *       // ...
 *     });
 *     When('I press the coffee button', function () {
 *       // ...
 *     });
 *     Then('I should be served a coffee', function () {
 *       // ...
 *     });
 *   });
 * });
 *
 * @param {Suite} suite
 */
module.exports = Mocha.interfaces['mocha-gherkin'] = function (suite) {
  Mocha.interfaces.bdd(suite);

  suite.on('pre-require', function (context, file, mocha) {
    /**
     * Some terse yet descriptive text of what is desired.
     *
     * @param {String} title
     * @param {...String} [story]
     *   Textual description of the business value of this feature.
     *   Business rules that govern the scope of the feature.
     *   Any additional information that will make the feature easier to understand.
     * @param {Function} fn
     * @return {Suite} suite
     */
    context.Feature = function (title, story, fn_) {
      var fn      = fn_;
      var stories = null;

      // Cf. https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#3-managing-arguments
      if (arguments.length > 2) {
        stories = new Array(arguments.length - 2);
        for(var i = 0; i < stories.length; ++i) {
          stories[i] = arguments[i + 1];
        }
        fn = arguments[arguments.length - 1];
      }

      var suite = context.describe('Feature: ' + title, fn);
      suite.name = 'Feature';
      suite.stories = stories;

      return suite;
    };

    /**
     * Some determinable business situation.
     *
     * @param {String} title
     * @param {Function} fn
     * @return {Suite} suite
     */
    context.Scenario = function (title, fn) {
      var suite = context.describe('Scenario: ' + title, fn);
      suite.name = 'Scenario';

      return suite;
    }

    /**
     * Given some precondition
     * And some other precondition
     * When some action by the actor
     * And some other action
     * And yet another action
     * Then some testable outcome is achieved
     * And something else we can check happens too
     * But yet another we can check does not happen
     *
     * @param {String} title
     * @param {Function} fn
     * @return {Suite} suite
     */
    const clauses = ['Given', 'When', 'Then', 'And', 'But'];
    clauses.forEach((clause) => {
      context[clause] = function (title, fn) {
        var test = context.it(clause + ' ' + title, fn);
        test.name = clause;

        return test;
      }
    })
  });
};
