# Table of Contents

* [Walkthrough](#walkthrough)
  * [Build System](#build-system)
  * [File Structure](#file-structure)
* [Getting Started](#getting-started)
  * [Dependencies](#dependencies)
  * [Installing](#installing)
  * [Running the App](#running-the-app)
  * [Testing](#testing)
    * [Unit testing](#unit-testing)
      * [Running Unit testing](#running-unit-testing)

# Walkthrough

## Build System

`Webpack` handles all file-related concerns:

* Transpiling from ES6 to ES5 with `Babel`
* Loading HTML files as modules
* Transpiling stylesheets and appending them to the DOM
* Refreshing the browser and rebuilding on file changes
* Hot module replacement for transpiled stylesheets
* Bundling the app
* Loading all modules
* Doing all of the above for `*.spec.js` files as well

* Starting and calling Webpack
* Starting a development server (yes, Webpack can do this too)
* Generating boilerplate for the Angular app

## File Structure

We use a componentized approach with NG6. This will be the eventual standard (and particularly helpful, if using
Angular's new router) as well as a great way to ensure a tasteful transition to Angular 2, when the time is ripe.
Everything--or mostly everything, as we'll explore (below)--is a component. A component is a self-contained
concern--may it be a feature or strictly-defined, ever-present element of the UI (such as a header, sidebar, or
footer). Also characteristic of a component is that it harnesses its own stylesheets, templates, controllers, routes,
services, and specs. This encapsulation allows us the comfort of isolation and structural locality. Here's how it
looks:

```
client
⋅⋅app/
⋅⋅⋅⋅app.js * app entry file
⋅⋅⋅⋅app.html * app template
⋅⋅⋅⋅common/ * functionality pertinent to several components propagate into this directory
⋅⋅⋅⋅components/ * where components live
⋅⋅⋅⋅⋅⋅components.js * components entry file
⋅⋅⋅⋅⋅⋅game/ * game component
⋅⋅⋅⋅⋅⋅⋅⋅game.js * game entry file (routes, configurations, and declarations occur here)
⋅⋅⋅⋅⋅⋅⋅⋅game.component.js * game "directive"
⋅⋅⋅⋅⋅⋅⋅⋅game.controller.js * game controller
⋅⋅⋅⋅⋅⋅⋅⋅game.scss * game styles
⋅⋅⋅⋅⋅⋅⋅⋅game.html * game template
⋅⋅⋅⋅⋅⋅⋅⋅game.spec.js * game specs (for entry, component, and controller)
```
# Getting Started

## Dependencies

Tools needed to run this app:

* `node`, `npm` and `yarn` (nodejs v6 and newer.)

## Installing

* `clone` this repo: [https://github.com/mbotellos/gameOfLife]

* Use `yarn` to install dependencies

## Running the App
After you have installed all dependencies, you may run the app. Running `npm run start` will bundle the app with `webpack`, launch a development server, and watch all files. The port will be displayed in the terminal.

## Testing

### Unit testing

The app uses [Karma](http://karma-runner.github.io/0.12/index.html) to run the unit tests, which you can find near the test target (`*.spec.js` files).

All tests are also written in ES6. We use Webpack to take care of the logistics of getting those files to run in the various browsers, just like with our client files. This is our testing stack:

* Karma
* Webpack + Babel
* Jasmine

To run tests, type `npm test` in the terminal. Read more about testing [below](#testing).

#### Running Unit testing

To run the tests, run `npm test`.

`Karma` combined with Webpack runs all files matching `*.spec.js` inside the `app` folder. This allows us to keep test files local to the component--which keeps us in good faith with continuing to build our app modularly. The file `spec.bundle.js` is the bundle file for **all** our spec files that Karma will run.
