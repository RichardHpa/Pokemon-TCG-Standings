import { IconButton } from './IconButton';

import { PinIcon } from 'icons/PinIcon';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof IconButton> = {
  component: IconButton,
};
export default meta;

type Story = StoryObj<typeof IconButton>;

export const Primary: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <IconButton icon={<PinIcon />} alt="Pin" />
      <IconButton icon={<PinIcon />} alt="Pin Solid" variant="solid" />
    </div>
  ),
};

export const Secondary: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <IconButton icon={<PinIcon />} alt="Pin Secondary" color="secondary" />
      <IconButton icon={<PinIcon />} alt="Pin Secondary Solid" color="secondary" variant="solid" />
    </div>
  ),
};

export const Size: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <IconButton icon={<PinIcon />} alt="Pin xs" size="xs" />
      <IconButton icon={<PinIcon />} alt="Pin sm" size="sm" />
      <IconButton icon={<PinIcon />} alt="Pin base" />
      <IconButton icon={<PinIcon />} alt="Pin lg" size="lg" />
      <IconButton icon={<PinIcon />} alt="Pin xl" size="xl" />
    </div>
  ),
};
