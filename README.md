# REASON OLM

REASON is an Open Learner Model (OLM) which visualizations are based on ITS interactions with the logic tutor LogEx. It supports features such as comparison to peers (class average), displaying details on demand (sorting and filtering knowledge components, toggling additional information), viewing your own previous mistakes, and tracking historical progress by navigating to different points in time.

## Prerequisites

You will need the following things properly installed on your computer.

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (with npm)
- [Ember CLI](https://cli.emberjs.com/release/)
- [Google Chrome](https://google.com/chrome/)

## Installation

- `git clone <repository-url>` this repository
- `cd open-learner-model`
- `yarn install`

## Running / Development

- `yarn start`
- Visit your app at [http://localhost:4200](http://localhost:4200/?user-id=medium-scoring).

You can toggle between three test-students by changing the user-id query param. Accepted values include "low-scoring", "medium-scoring", and "high-scoring".

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Building

- `yarn build` (create a production build)

### Deploying

- `yarn deploy` (create a production build, and deploy it to GitHub Pages)

## Further Reading / Useful Links

- [ember.js](https://emberjs.com/)
- [ember-cli](https://cli.emberjs.com/release/)
- Development Browser Extensions
  - [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  - [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
