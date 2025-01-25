import { useAnalytics } from 'hooks/useAnalytics';

import image from 'images/buyMeABoosterButton.png';

export function BuyMeACoffeeWidget() {
    const { sendEvent } = useAnalytics();

    const handleClick = () => {
        sendEvent({
            category: 'Buy Me a Coffee',
            action: 'Click on Buy Me a Coffee',
        });
    };

    return (
        <a
            href="https://www.buymeacoffee.com/richardhpa"
            target="blank"
            onClick={handleClick}
        >
            <img
                style={{ height: '40px' }}
                alt="Buy Me a Booster"
                src={image}
            />
        </a>
    );
}
