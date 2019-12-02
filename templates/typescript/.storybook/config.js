import '!style-loader!css-loader!sass-loader!../src/styles/main.scss';
import { configure } from '@storybook/react';

import { addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import centered from '@storybook/addon-centered/react';

// automatically import all files ending in *.stories.tsx
const req = require.context('../src', true, /\.stories\.tsx$/);

function loadStories() {
   req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);

addDecorator(withKnobs);
addDecorator(
   withInfo({
      styles: {
         header: {
            h1: {
               marginRight: '20px',
               fontSize: '25px',
               display: 'inline'
            },
            body: {
               paddingTop: '5px',
               paddingBottom: '5px'
            },
            h2: {
               display: 'inline',
               color: '#999'
            }
         },
         infoBody: {
            padding: '5px 5px',
            lineHeight: '2'
         },
         propTableHead: {
            marginRight: '20px',
            fontSize: '25px',
            display: 'inline',
            color: '#999'
         }
      },
      inline: true,
      source: true
   })
);
addDecorator(centered);
