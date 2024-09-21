import { render, waitFor } from '@testing-library/react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const ComponentToTest = ({
    title,
    description,
}: {
    title: string;
    description: string;
}) => {
    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
            </Helmet>

            <div>children</div>
        </>
    );
};

function getMeta(metaName: string) {
    const metas = document.getElementsByTagName('meta');
    for (let i = 0; i < metas.length; i += 1) {
        if (metas[i].getAttribute('name') === metaName) {
            return metas[i].getAttribute('content');
        }
    }
    return '';
}

function getTitle() {
    return document.title;
}

test('renders SEO component with correct title and description', async () => {
    render(
        <ComponentToTest
            title="this is the title"
            description="this is the description"
        />,
        {
            wrapper: HelmetProvider,
        }
    );

    await waitFor(() =>
        expect(getMeta('description')).toEqual('this is the description')
    );
    expect(getTitle()).toEqual('this is the title');
});
