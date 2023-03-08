import {
  Header as HeaderWrapper,
  HeaderBody,
  HeaderNav,
  Logo,
  NavItem,
  Service,
} from '@dataesr/react-dsfr';
import {
  Link as RouterLink,
  useLocation,
} from 'react-router-dom';

export default function Header() {
  const { pathname } = useLocation();

  return (
    <HeaderWrapper>
      <HeaderBody>
        <Logo splitCharacter={9}>
          Gouvernement
        </Logo>
        <Service
          title={(
            <>
              OpenAlex POC
            </>
          )}
          description=""
        />
      </HeaderBody>
      <HeaderNav path={pathname}>
        <NavItem
          title="Home"
          asLink={<RouterLink to="/">Home</RouterLink>}
          current={pathname === '/'}
        />
        <NavItem
          title="Explore"
          asLink={<RouterLink to="/explore">Explore</RouterLink>}
          current={pathname === '/explore'}
        />
        <NavItem
          title="About"
          asLink={<RouterLink to="/about">About</RouterLink>}
          current={pathname === '/about'}
        />
        <NavItem
          title="Draft"
          asLink={<RouterLink to="/draft">Draft</RouterLink>}
          current={pathname === '/draft'}
        />
      </HeaderNav>
    </HeaderWrapper>
  );
}
