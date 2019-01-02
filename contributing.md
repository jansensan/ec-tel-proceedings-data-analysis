# Contributing

## Technical Requirements

Ensure you install these modules globally on your development machine:

- [Node](https://nodejs.org/): This runs a JavaScript server locally which fetches the libraries necessary to build this project.
- [Webpack](https://webpack.js.org/): This bundler compiles the JavaScript libraries and classes, as well as the CSS, into a single file for web deployment.


## Installation

Once you checked out this project, run this command in a Terminal window:

    npm install


## Local development

### Main stylesheet (CSS) development

- Open a Terminal instance
- Go to the root directory of the project
- Run `npm run styles`

Styles that are not specific to the components are compiled manually. This is rarely necessary, and is not a requirement to be done once you checked out the project.


### Components (React / JavaScript) development

- Open a Terminal instance
- Go to the root directory of the project
- Run `npm run dev`
- Open `www/index.html` in a browser

Any changes you make to the code in the `src` directory while this is running will be available in the browser. Once a change is made, simply refresh the browser.


## Contributions

### Git commits, etc.

Please read careful, [pull requests (PR)](https://help.github.com/articles/about-pull-requests/) will be refused if they do not comply to these instructions.

- If you cannot contribute code, [open an issue on the appropriate page](https://github.com/jansensan/ec-tel-proceedings-data-analysis/issues) (requires a Github account).
- All contributions *must* be made via PR.
- PRs *must* target the `develop` branch.
- Commits must be written in past tense, and in sentence format:

    ````
    # good examples
    Added list component
    Removed superfluous style declaration
    Fixed typo in label
    
    # bad examples
    update
    New Thing
    remove the style declaration
    ````

### Coding conventions

In order to ensure standardization of the coding style, please ensure that you follow these rules as you develop. In case of doubt, refer to the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).

#### General

- Use spaces for indenting
- An indent is represented by 2 spaces

Many IDEs implement linting functionalities, take a look at [EditorConfig](http://editorconfig.org) for more details.

#### Variables

- Use `camelCase` for variables
- Use `PascalCase` for class names and singletons
- Use `UPPER_CASE_SNAKE_CASE` for constant names
- __Do not__ use `lower_case_snake_case`
- __Do not__ prefix variables with an underscore or a dollar sign
- Booleans must be prefixed with `is-`/`are-` so that they ask a question when read out loud:  

  ```
  var isArrayEmpty = someArray.length() > 0;
  
  // used in an if-statement
  if (isArrayEmpty) {
    // code here
  }
  
  var areUsersAsleep = true;
  
  // used in an if-statement
  if (areUsersAsleep) {
    // code here
  }
  ```

#### Methods

- Method names must be an active verb and use lower camel case:  

  ```
  doSomething()  
  doSomeOtherThing()
  ```

- Event handlers and callbacks must use the `on-` prefix, and use the past tense. Read [Miller Medeiros's on his js-signals library](https://millermedeiros.github.io/js-signals/) or [Robert Penner's critique of AS3 events](http://flashblog.robertpenner.com/2009/08/my-critique-of-as3-events-part-1.html) to know more about this naming convention.  

  ```
  function onButtonClicked() { // ... }
  function onDataObtained() { // ... }
  ```

- In the case where a method must be used to compute a condition, use the same logic as booleans (i.e. `is-`/`are-` prefix):  

 ```
 function areValuesEqual(value1, value2) { // ... }
 ```
