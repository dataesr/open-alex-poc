// import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Container, SwitchTheme } from '@dataesr/react-dsfr';
import Header from './header';
import Footer from './footer';
import ScrollToTop from './scroll-to-top-button';

import './layout.css';

export default function Layout() {
  return (
    <>
      <Header />
      <div role="alert" id="notice-container" />
      <Container as="main" role="main">
        <Outlet />
      </Container>
      <ScrollToTop />
      <Footer />
    </>
  );
}
