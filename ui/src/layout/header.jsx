import {
  Link as RouterLink,
  useLocation,
} from 'react-router-dom';
import {
  Header as HeaderWrapper,
  HeaderBody,
  HeaderNav,
  Logo,
  NavItem,
  Service,
} from '@dataesr/react-dsfr';

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
          title="Accueil"
          asLink={<RouterLink to="/">Accueil</RouterLink>}
          current={pathname === '/'}
        />
        <NavItem
          title="Annuaire"
          asLink={<RouterLink to="/about">A propos</RouterLink>}
          current={pathname === '/about'}
        />
      </HeaderNav>
    </HeaderWrapper>
  );
}
