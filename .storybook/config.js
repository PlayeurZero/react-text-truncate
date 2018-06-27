import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from "@storybook/addon-knobs"
import { withConsole } from "@storybook/addon-console"

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(withKnobs);
addDecorator((storyFn, context) => withConsole()(storyFn)(context));

configure(loadStories, module);
