/**
 * Container Generator
 */

const path = require('path');

// Plugin identifier based on the package.json `name` value
const pluginPkg = require(path.resolve(process.cwd(), 'package.json'));
const pluginId = pluginPkg.name.replace(
  /^strapi-plugin-/i,
  ''
);

const componentExists = require('../utils/componentExists');

module.exports = {
  description: 'Add a container component',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'Form',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return componentExists(value) ? 'A component or container with this name already exists' : true;
      }

      return 'The name is required';
    },
  }, {
    type: 'confirm',
    name: 'wantHeaders',
    default: false,
    message: 'Do you want headers?',
  }, {
    type: 'confirm',
    name: 'wantCSS',
    default: false,
    message: 'Does it have styling?',
  }, {
    type: 'confirm',
    name: 'wantActionsAndReducer',
    default: true,
    message: 'Do you want an actions/constants/selectors/reducer tupel for this container?',
  }, {
    type: 'confirm',
    name: 'wantSagas',
    default: true,
    message: 'Do you want sagas for asynchronous flows? (e.g. fetching data)',
  }],
  actions: (data) => {
    const dataFormatted = data;

    // Expose `pluginId` value
    dataFormatted.pluginId = pluginId;

    // Generate index.js and index.test.js
    const actions = [{
      type: 'add',
      path: '../../../../../admin/src/containers/{{properCase name}}/index.js',
      templateFile: './container/index.js.hbs',
      abortOnFail: true,
    }, {
      type: 'add',
      path: '../../../../../admin/src/containers/{{properCase name}}/tests/index.test.js',
      templateFile: './container/test.js.hbs',
      abortOnFail: true,
    }];

    // If they want a SCSS file, add styles.scss
    if (dataFormatted.wantCSS) {
      actions.push({
        type: 'add',
        path: '../../../../../admin/src/containers/{{properCase name}}/styles.scss',
        templateFile: './container/styles.scss.hbs',
        abortOnFail: true,
      });
    }

    // If component wants messages
    if (dataFormatted.wantMessages) {
      actions.push({
        type: 'add',
        path: '../../../../../admin/src/containers/{{properCase name}}/messages.js',
        templateFile: './container/messages.js.hbs',
        abortOnFail: true,
      });
    }

    // If they want actions and a reducer, generate actions.js, constants.js,
    // reducer.js and the corresponding tests for actions and the reducer
    if (dataFormatted.wantActionsAndReducer) {
      // Actions
      actions.push({
        type: 'add',
        path: '../../../../../admin/src/containers/{{properCase name}}/actions.js',
        templateFile: './container/actions.js.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: '../../../../../admin/src/containers/{{properCase name}}/tests/actions.test.js',
        templateFile: './container/actions.test.js.hbs',
        abortOnFail: true,
      });

      // Constants
      actions.push({
        type: 'add',
        path: '../../../../../admin/src/containers/{{properCase name}}/constants.js',
        templateFile: './container/constants.js.hbs',
        abortOnFail: true,
      });

      // Selectors
      actions.push({
        type: 'add',
        path: '../../../../../admin/src/containers/{{properCase name}}/selectors.js',
        templateFile: './container/selectors.js.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: '../../../../../admin/src/containers/{{properCase name}}/tests/selectors.test.js',
        templateFile: './container/selectors.test.js.hbs',
        abortOnFail: true,
      });

      // Reducer
      actions.push({
        type: 'add',
        path: '../../../../../admin/src/containers/{{properCase name}}/reducer.js',
        templateFile: './container/reducer.js.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: '../../../../../admin/src/containers/{{properCase name}}/tests/reducer.test.js',
        templateFile: './container/reducer.test.js.hbs',
        abortOnFail: true,
      });
    }

    // Sagas
    if (dataFormatted.wantSagas) {
      actions.push({
        type: 'add',
        path: '../../../../../admin/src/containers/{{properCase name}}/sagas.js',
        templateFile: './container/sagas.js.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: '../../../../../admin/src/containers/{{properCase name}}/tests/sagas.test.js',
        templateFile: './container/sagas.test.js.hbs',
        abortOnFail: true,
      });
    }

    return actions;
  },
};
