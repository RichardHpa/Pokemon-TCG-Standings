import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'flowbite';
import { worker } from './mocks/browser';

import { PinnedPlayersProvider } from 'providers/PinnedPlayersProvider';

import { ColorModeProvider } from 'providers/ColorModeProvider';
import { HelmetProvider } from 'react-helmet-async';

const allowedPaths = [
    '/sprites/',
    '/logo192.png',
    'src/images/',
    '/localData/',
];

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
async function enableMocking() {
    return worker.start({
        onUnhandledRequest(request, print) {
            if (process.env.NODE_ENV !== 'development') {
                return;
            }
            if (allowedPaths.some((path) => request.url.includes(path))) {
                return;
            }

            // Otherwise, print an unhandled request warning.
            print.warning();
        },
    });
}

enableMocking().then(() => {
    root.render(
        <React.StrictMode>
            <HelmetProvider>
                <PinnedPlayersProvider>
                    <ColorModeProvider>
                        <App />
                    </ColorModeProvider>
                </PinnedPlayersProvider>
            </HelmetProvider>
        </React.StrictMode>
    );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
