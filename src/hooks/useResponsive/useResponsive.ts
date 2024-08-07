import { useState, useEffect } from 'react';
type Breakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

type tailwindBreakpointsType = {
  [key in Breakpoints]: number;
};

export const tailwindBreakpoints: tailwindBreakpointsType = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

interface useResponsiveReturn {
  [key: string]: boolean;
}

export const useResponsive = () => {
  // hook needs to update when the window resizes

  const [values, setValues] = useState<useResponsiveReturn>({
    xs: false,
    sm: false,
    md: false,
    lg: false,
    xl: false,
    '2xl': false,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const breakpoints = Object.keys(tailwindBreakpoints) as Breakpoints[];

      const newValues = breakpoints.reduce((acc, key) => {
        acc[key] = width >= tailwindBreakpoints[key];
        return acc;
      }, {} as useResponsiveReturn);

      setValues(newValues);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return values;
};
