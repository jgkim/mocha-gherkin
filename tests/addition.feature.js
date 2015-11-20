var chai    = require('chai');
var expect  = chai.expect;

Feature('Addition',
  'In order to avoid silly mistakes,',
  'As a math idiot',
  'I want to be told the sum of two numbers', function () {

  Scenario('Add two numbers', function () {
    Given('I have entered 50 into the calculator', function () {
      this.number1 = 50;
    });
    And('I have entered 70 into the calculator', function () {
      this.number2 = 70;
    });
    When('I press add', function () {
      this.sum = this.number1 + this.number2;
    });
    Then('the result should be 120 on the screen', function () {
      expect(this.sum).to.equal(120);
    });
  });
});
