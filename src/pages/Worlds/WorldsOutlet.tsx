import { Outlet, Link } from 'react-router-dom';

import WorldsLogo from 'images/wc24-key-art-2x.webp';
import { Heading } from 'components/Heading';

export const WorldsOutlet = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 text-center">
        <img className="h-auto max-w-xs rounded-lg mx-auto" src={WorldsLogo} alt="worlds 2024" />
        <Link to="/worlds-2024">
          <Heading>Pokemon Worlds 2024</Heading>
        </Link>
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
};
