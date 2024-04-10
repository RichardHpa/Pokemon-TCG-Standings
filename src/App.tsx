import { Routes, Route, Link, Outlet } from 'react-router-dom';

import { Navbar } from 'components/Navbar';

import { Standings, Player, Tournaments } from './pages';

function App() {
  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-gray-200 min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto py-12 px-4">
        {/* <div className="pb-10">
          <Link to="/">
            <h1 className="text-5xl font-extrabold dark:text-white text-center">
              Pokemon TCG Vancouver 2024 Regionals Standings
            </h1>
          </Link>
        </div> */}
        <Routes>
          <Route index element={<Standings />} />

          <Route path="tournaments" element={<Outlet />}>
            <Route index element={<Tournaments />} />
          </Route>

          <Route path="player" element={<Outlet />}>
            <Route path=":playerName" element={<Player />} />
          </Route>

          <Route path="*" element={<>error</>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
