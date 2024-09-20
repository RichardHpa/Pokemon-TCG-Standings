import { useState, useCallback } from 'react';

import type { FC } from 'react';

const test = (a: string, b: number) => {
    return a + b;
};

console.log(test('a', 0));
interface CardImageProps {
    src: string;
    alt: string;
}

export const CardImage: FC<CardImageProps> = ({ src, alt }) => {
    const [loaded, setLoaded] = useState(false);
    const imageStyle = !loaded ? { display: 'none' } : {};

    const handleOnLoad = useCallback(() => {
        setLoaded(true);
    }, []);

    return (
        <div>
            {!loaded && (
                <img
                    src="/images/cardBack.png"
                    alt={`loading ${alt}`}
                    width="100%"
                />
            )}
            <img
                src={src}
                alt={alt}
                width="100%"
                onLoad={handleOnLoad}
                style={imageStyle}
            />
        </div>
    );
};
