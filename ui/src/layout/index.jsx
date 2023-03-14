import { Outlet } from 'react-router-dom';
import { Container } from '@dataesr/react-dsfr';
import Header from './header';
import Footer from './footer';
import ScrollToTop from './scroll-to-top-button';
import PocBanner from './poc-banner';

import './layout.scss';

export default function Layout() {

  return (
    <>
      <Header />
      <div role="alert" id="notice-container" />
      <Container fluid as="main" role="main">
        <PocBanner />
        <Outlet />
      </Container>
      <ScrollToTop />
      <Footer />
    </>
  );
}
