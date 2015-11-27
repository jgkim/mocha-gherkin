# mocha-gherkin

[![NPM Version](https://badge.fury.io/js/mocha-gherkin.svg)](https://npmjs.org/package/mocha-gherkin)
[![Build Status](https://travis-ci.org/jgkim/mocha-gherkin.svg?branch=master)](https://travis-ci.org/jgkim/mocha-gherkin)
[![Coverage Status](https://coveralls.io/repos/jgkim/mocha-gherkin/badge.svg?branch=master&service=github)](https://coveralls.io/github/jgkim/mocha-gherkin?branch=master)
[![Dependency Status](https://david-dm.org/jgkim/mocha-gherkin.svg)](https://david-dm.org/jgkim/mocha-gherkin)

`mocha-gherkin` is a [Gherkin](https://github.com/cucumber/cucumber/wiki/Gherkin)-style interface and reporter add-on for [mocha](https://mochajs.org/). This add-on allows you to describe your features using `Feature`, `Scenario`, `Given`, `When`, `Then`, `And`, and `But`. You can use this interface together with mocha's [BDD](https://mochajs.org/#bdd) interface.

### Usage in ECMAScript 6

```javascript
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
    });
  });
```

### Usage in ECMAScript 5

```javascript
Feature('Addition',
  'In order to avoid silly mistakes,',
  'As a math idiot',
  'I want to be told the sum of two numbers', function () {
    Scenario('Add two numbers', function () {
      var number1;
      var number2;
      var sum;

      Given('I have entered 50 into the calculator', function () {
        number1 = 50;
      });
      And('I have entered 70 into the calculator', function () {
        number2 = 70;
      });
      When('I press add', function () {
        sum = number1 + number2;
      });
      Then('the result should be 120 on the screen', function () {
        expect(sum).to.equal(120);
      });
    });
  });
```


## Installing

You should first have mocha installed:
```shell
$ npm install mocha
```

Then install `mocha-gherkin`, either globally or inside your project:
```shell
$ npm install mocha-gherkin
```


## How to Use

Actually, `mocha-gherkin` consists of two different add-ons: interface add-on and reporter add-on. To use `mocha-gherkin`, you should first write your features using terms provided by the interface add-on. Then, run `mocha` with the options below:
```shell
$ mocha tests/addition.feature.js --ui mocha-gherkin --reporter mocha-gherkin/build/spec
```

![Screenshot of mocha-gherkin](https://cloud.githubusercontent.com/assets/86622/11293191/fde8783a-8f9a-11e5-8fac-88b91434a6fd.png)


## What's Going on?

`Feature` and `Scenario` wrap around mocha's `describe`, and `Given`, `When`, `Then`, `And`, and `But` do the same thing for mocha's `it`. `describe`, `context`, `it`, and other mocha's BDD lingos still work as usal, so you can mix in them with the Gherkin-style terms.


## Reporter Support

`mocha-gherkin` has currently only one reporter add-on, which extends mocha's `spec` with support for the Gherkin-style interface. However, you can use other modules as usual since `mocha-gherkin` just wraps around mocha's BDD interface.
