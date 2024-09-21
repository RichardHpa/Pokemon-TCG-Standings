import '../src/index.css'; // import tailwindcss styles

import { withColorModeDecorator } from '../src/stories/decorators/withColorMode';

import type { Preview } from '@storybook/react';

const preview: Preview = {
    globalTypes: {
        theme: {
            description: 'Color mode for stories',
            defaultValue: 'light',
            toolbar: {
                title: 'Color mode',
                items: [
                    { value: 'light', icon: 'circlehollow', title: 'Light' },
                    { value: 'dark', icon: 'circle', title: 'Dark' },
                ],
                dynamicTitle: true,
            },
        },
    },
    parameters: {
        layout: 'fullscreen',
        backgrounds: { disable: true },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    decorators: [withColorModeDecorator],
};

export default preview;
