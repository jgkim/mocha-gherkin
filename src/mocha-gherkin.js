import set from 'lodash.set';
import { interfaces } from 'mocha';

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
interfaces['mocha-gherkin'] = function mochaGherkin(suite) {
  interfaces.bdd(suite);

  suite.on('pre-require', (context) => {
    /**
     * Some terse yet descriptive text of what is desired.
     *
     * @param {String} title
     * @param {...Mixed} args
     *   Textual description of the business value of this feature.
     *     Business rules that govern the scope of the feature.
     *     Any additional information that will make the feature easier to understand.
     *   and a function to test.
     * @return {Suite} newSuite
     */
    set(context, 'Feature', (title, ...args) => {
      const fn = args[args.length - 1];

      let stories = null;
      if (args.length > 1) {
        stories = [];
        for (let i = 0; i < args.length - 1; i += 1) {
          stories.push(args[i]);
        }
      }

      const newSuite = context.describe(`Feature: ${title}`, fn);
      newSuite.name = 'Feature';
      newSuite.stories = stories;

      return newSuite;
    });

    /**
     * Some determinable business situation.
     *
     * @param {String} title
     * @param {Function} fn
     * @return {Suite} newSuite
     */
    set(context, 'Scenario', (title, fn) => {
      const newSuite = context.describe(`Scenario: ${title}`, fn);
      newSuite.name = 'Scenario';

      return newSuite;
    });

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
     * @return {Suite} test
     */
    const clauses = ['Given', 'When', 'Then', 'And', 'But'];
    clauses.forEach((clause) => {
      set(context, clause, (title, fn) => {
        const test = context.it(`${clause} ${title}`, fn);
        test.name = clause;

        return test;
      });
    });
  });
};
export default interfaces['mocha-gherkin'];
