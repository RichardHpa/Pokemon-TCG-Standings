import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { useLocation } from 'react-router-dom';

const TRACKING_ID = process.env.REACT_APP_GA4_MEASUREMENT_ID;

export const useAnalytics = () => {
    const location = useLocation();

    useEffect(() => {
        if (import.meta.env.MODE !== 'development' && TRACKING_ID) {
            console.log('initialize ga');
            ReactGA.initialize(TRACKING_ID);
        }
    }, []);

    const sendPageView = () => {
        if (import.meta.env.MODE !== 'development') {
            ReactGA.send({ hitType: 'pageview', page: location.pathname });
        }
    };

    const sendEvent = ({
        category,
        action,
        label,
    }: {
        category: string;
        action: string;
        label?: string;
    }) => {
        // Send a custom event
        ReactGA.event({
            category,
            action,
            label, // optional
        });
    };

    return { sendPageView, sendEvent };
};
