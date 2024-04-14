import { useState, useEffect } from 'react';
import Markdown from 'markdown-to-jsx';

import { BuyMeACoffeeWidget } from 'components/BuyMeACoffeeWidget';
import { SEO } from 'components/SEO';

import { Heading } from 'components/Heading';

import type { ReactNode } from 'react';

// TODO: migrate all of these to be in their own components. Since this is going to be the only place it is used initially, I am keeping them here
const Paragraph = ({ children }: { children: ReactNode }) => (
  <p className="mb-3 text-gray-500 dark:text-gray-400">{children}</p>
);

const UlList = ({ children }: { children: ReactNode }) => (
  <ul className="mb-3 max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
    {children}
  </ul>
);

const OlList = ({ children }: { children: ReactNode }) => (
  <ol className="mb-3 max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
    {children}
  </ol>
);

const Link = ({ children, ...props }: { children: ReactNode }) => (
  <a
    {...props}
    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
    target="_blank"
  >
    {children}
  </a>
);

const HR = () => <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />;

export const About = () => {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    import('./about.md')
      .then(res =>
        // @ts-expect-error
        fetch(res.default)
          .then(res => res.text())
          .then(res => setMarkdown(res))
          .catch(err => console.log(err))
      )
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <SEO title="About" />

      <Markdown
        options={{
          overrides: {
            h1: {
              component: Heading,
              props: {
                level: 1,
              },
            },
            h2: {
              component: Heading,
              props: {
                level: 2,
              },
            },
            h3: {
              component: Heading,
              props: {
                level: 3,
              },
            },
            h4: {
              component: Heading,
              props: {
                level: 4,
              },
            },
            h5: {
              component: Heading,
              props: {
                level: 5,
              },
            },
            h6: {
              component: Heading,
              props: {
                level: 6,
              },
            },
            p: {
              component: Paragraph,
            },
            ul: {
              component: UlList,
            },
            ol: {
              component: OlList,
            },
            a: {
              component: Link,
            },
            Coffee: {
              component: BuyMeACoffeeWidget,
            },
            hr: {
              component: HR,
            },
          },
        }}
      >
        {markdown}
      </Markdown>
    </div>
  );
};
