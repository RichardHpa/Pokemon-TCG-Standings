import { Routes, Route, Link, Outlet } from 'react-router-dom';

import { BuyMeACoffeeWidget } from 'components/BuyMeACoffeeWidget';

import { Standings, Player } from './pages';

function App() {
  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-gray-200 min-h-screen flex flex-col">
      <div className="container mx-auto py-12 px-4">
        <div className="pb-10">
          <Link to="/">
            <h1 className="text-5xl font-extrabold dark:text-white text-center">
              Pokemon TCG Vancouver 2024 Regionals Standings
            </h1>
          </Link>
        </div>
        <Routes>
          <Route index element={<Standings />} />
          <Route path="player" element={<Outlet />}>
            <Route path=":playerName" element={<Player />} />
          </Route>
        </Routes>
        <div className="mt-4 flex justify-center">
          <BuyMeACoffeeWidget />
        </div>
      </div>
    </div>
  );
}

export default App;
