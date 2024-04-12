import ReactGA from 'react-ga';

export const useAnalyticsEventTracker = (category: string) => {
  const eventTracker = (action = 'test action', label = 'test label') => {
    ReactGA.event({ category, action, label });
  };
  return eventTracker;
};
