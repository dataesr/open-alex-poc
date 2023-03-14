import {
  Badge,
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
              OpenAlex explorer
              <Badge text="POC" isSmall colorFamily="green-emeraude" />
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
          title="Affiliation explorer"
          asLink={<RouterLink to="/explore/affiliations">Affiliation explorer</RouterLink>}
          current={pathname === '/explore/affiliations'}
        />
        <NavItem
          title="Affiliation explorer"
          asLink={<RouterLink to="/explore/signatures">Signatures explorer</RouterLink>}
          current={pathname === '/explore/signatures'}
        />
      </HeaderNav>
    </HeaderWrapper>
  );
}
