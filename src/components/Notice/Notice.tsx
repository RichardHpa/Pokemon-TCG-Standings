import { useCallback, useState } from 'react';
import clsx from 'clsx';

import { noticeClasses } from './noticeClasses';

import type { FC } from 'react';
import type { NoticeProps } from './types';

export const Notice: FC<NoticeProps> = ({
    children,
    status = 'info',
    dismissible,
    noticeId,
    onDismiss,
}) => {
    const [isDismissed, setIsDismissed] = useState(false);
    const handleDismiss = useCallback(() => {
        if (dismissible && noticeId && onDismiss) {
            onDismiss(noticeId);
        } else {
            setIsDismissed(true);
        }
    }, [dismissible, noticeId, onDismiss]);

    if (isDismissed) {
        return null;
    }

    return (
        <div
            id={noticeId}
            className={clsx(noticeClasses.base, noticeClasses.status[status])}
            role="alert"
        >
            <svg
                className="flex-shrink-0 inline w-4 h-4 mr-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">{status}</span>
            <div>{children}</div>
            {/* This will be an icon button */}
            {dismissible && (
                <button
                    type="button"
                    className="ms-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2  inline-flex items-center justify-center h-8 w-8"
                    data-dismiss-target={`#${noticeId}`}
                    aria-label="Close"
                    onClick={() => handleDismiss()}
                >
                    <span className="sr-only">Close</span>
                    <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                    </svg>
                </button>
            )}
        </div>
    );
};
