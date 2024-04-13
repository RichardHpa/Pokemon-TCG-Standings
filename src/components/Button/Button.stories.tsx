import { Button } from './Button';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  component: Button,
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4 bg-white text-black p-2">
        <Button>Basic</Button>
        <Button variant="outlined">Basic</Button>
      </div>
      <div className="flex items-center gap-4 dark bg-gray-900 text-gray-200 p-2">
        <Button>Basic</Button>
        <Button variant="outlined">Basic</Button>
      </div>
    </div>
  ),
};

export const Secondary: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4 bg-white text-black p-2">
        <Button color="secondary">Basic</Button>
        <Button color="secondary" variant="outlined">
          Basic
        </Button>
      </div>
      <div className="flex items-center gap-4 dark bg-gray-900 text-gray-200 p-2">
        <Button color="secondary">Basic</Button>
        <Button color="secondary" variant="outlined">
          Basic
        </Button>
      </div>
    </div>
  ),
};

export const Size: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-2">
      <Button size="xs" onClick={() => console.log('click')}>
        extra small
      </Button>
      <Button size="sm">small</Button>
      <Button>base</Button>
      <Button size="lg">large</Button>
      <Button size="xl">extra large</Button>
    </div>
  ),
};
