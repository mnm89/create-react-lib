import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import { Button } from './';

const stories = storiesOf('Buttons', module);

stories.add(
   'Text',
   () => (
      <Button disabled={boolean('Disabled', false)} onClick={action('button-clicked')}>
         Click Me !
      </Button>
   ),
   {
      info: {
         text: `Samplest button with text`
      }
   }
);
stories.add(
   'Emoji',
   () => (
      <Button disabled={boolean('Disabled', false)} onClick={action('clicked')}>
         <span role="img" aria-label="so cool">
            😀 😎 👍 💯
         </span>
      </Button>
   ),
   {
      info: {
         text: `Emoji button`
      }
   }
);
