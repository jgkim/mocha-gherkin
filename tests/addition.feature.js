import { expect } from 'chai';

Feature('Addition',
  'In order to avoid silly mistakes,',
  'As a math idiot',
  'I want to be told the sum of two numbers', () => {
    Scenario('Add two numbers', () => {
      let number1;
      let number2;
      let sum;

      Given('I have entered 50 into the calculator', () => {
        number1 = 50;
      });
      And('I have entered 70 into the calculator', () => {
        number2 = 70;
      });
      When('I press add', () => {
        sum = number1 + number2;
      });
      Then('the result should be 120 on the screen', () => {
        expect(sum).to.equal(120);
      });

      // mix-in with other BDD terms
      it('should be working.');
    });
  });
