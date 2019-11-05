import { addParameters, configure, addDecorator } from '@storybook/react';
import barefootTheme from './barefootTheme';
import {withInfo} from '@storybook/addon-info';

addParameters({
    options: {
        theme: barefootTheme
    }
})
addDecorator(withInfo({
inline: true
}));
configure(require.context('../src/stories', true, /\.stories\.js$/), module);