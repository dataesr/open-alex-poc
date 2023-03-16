import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { createInstance, MatomoProvider } from '@jonkoops/matomo-tracker-react';
import Layout from './layout';
import HomePage from './pages/home';
import AffiliationsExplorerPage from './pages/affiliations';
import SignaturesExplorerPage from './pages/signatures';
import Matomo from './components/matomo';

const matomo = createInstance({
  urlBase: 'https://piwik.enseignementsup-recherche.pro/',
  siteId: 48,
});

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
