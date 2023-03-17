import { createInstance, MatomoProvider } from '@jonkoops/matomo-tracker-react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import Matomo from './components/matomo';
import Network from './components/network';
import Layout from './layout';
import AffiliationsExplorerPage from './pages/affiliations';
import HomePage from './pages/home';
import SignaturesExplorerPage from './pages/signatures';

const matomo = createInstance({
  urlBase: 'https://piwik.enseignementsup-recherche.pro/',
  siteId: 48,
});

function NetworkPage() {
  return <Network />;
}

export default function App() {
  return (
    <BrowserRouter>
      <MatomoProvider value={matomo}>
        <Matomo />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="explore/affiliations" element={<AffiliationsExplorerPage />} />
            <Route path="explore/signatures" element={<SignaturesExplorerPage />} />
            <Route path="draft" element={<NetworkPage />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </MatomoProvider>
    </BrowserRouter>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>404</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
