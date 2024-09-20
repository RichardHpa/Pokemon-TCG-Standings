import type { ReactNode } from 'react';

export interface NoticeProps {
    status?: 'info' | 'success' | 'error' | 'warning' | 'dark';
    children: ReactNode;
    dismissible?: boolean;
    noticeId?: string;
    onDismiss?: (noticeId: string) => void;
}
