import ReactGA from 'react-ga4';
import { useLocation } from 'react-router-dom';

const TRACKING_ID = 'G-H6TRSN6RWF';
ReactGA.initialize(TRACKING_ID);

export const useAnalytics = () => {
  const location = useLocation();

  const sendPageView = () => {
    if (process.env.NODE_ENV !== 'development') {
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
