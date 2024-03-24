import image from 'images/bmc-button.png';

export function BuyMeACoffeeWidget() {
  return (
    <a href="https://www.buymeacoffee.com/richardhpa" target="blank">
      <img style={{ height: '50px' }} alt="Buy Me a Coffee Widget" src={image} />
    </a>
  );
}
