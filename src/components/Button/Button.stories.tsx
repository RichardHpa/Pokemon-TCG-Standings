import { Button } from './Button';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
    component: Button,
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    render: () => (
        <div className="flex items-center gap-4">
            <Button>Basic</Button>
            <Button variant="outlined">Basic</Button>
        </div>
    ),
};

export const Secondary: Story = {
    render: () => (
        <div className="flex items-center gap-4">
            <Button color="secondary">Basic</Button>
            <Button color="secondary" variant="outlined">
                Basic
            </Button>
        </div>
    ),
};

export const Size: Story = {
    render: () => (
        <div className="flex items-center gap-4">
            <Button size="xs">extra small</Button>
            <Button size="sm">small</Button>
            <Button>base</Button>
            <Button size="lg">large</Button>
            <Button size="xl">extra large</Button>
        </div>
    ),
};
