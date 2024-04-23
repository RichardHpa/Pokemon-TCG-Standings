import { Notice } from './Notice';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Notice> = {
  component: Notice,
};
export default meta;

type Story = StoryObj<typeof Notice>;

export const Status: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Notice noticeId="infoAlert">
        Info alert! Change a few things up and try submitting again.
      </Notice>
      <Notice noticeId="successAlert" status="success">
        Success alert! Change a few things up and try submitting again.
      </Notice>
      <Notice noticeId="errorAlert" status="error">
        Error alert! Change a few things up and try submitting again.
      </Notice>
      <Notice noticeId="warningAlert" status="warning">
        Warning alert! Change a few things up and try submitting again.
      </Notice>
      <Notice noticeId="darkAlert" status="dark">
        Dark alert! Change a few things up and try submitting again.
      </Notice>
    </div>
  ),
};

export const Dismissible: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Notice noticeId="infoAlert" dismissible>
        Info alert! Change a few things up and try submitting again.
      </Notice>
      <Notice noticeId="successAlert" status="success" dismissible>
        Success alert! Change a few things up and try submitting again.
      </Notice>
      <Notice noticeId="errorAlert" status="error" dismissible>
        Error alert! Change a few things up and try submitting again.
      </Notice>
      <Notice noticeId="warningAlert" status="warning" dismissible>
        Warning alert! Change a few things up and try submitting again.
      </Notice>
      <Notice noticeId="darkAlert" status="dark" dismissible>
        Dark alert! Change a few things up and try submitting again.
      </Notice>
    </div>
  ),
};
