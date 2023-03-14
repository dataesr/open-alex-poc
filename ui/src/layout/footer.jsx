import {
  Footer as FooterWrapper,
  FooterBody,
  FooterBodyItem,
  Link,
  Logo,
} from '@dataesr/react-dsfr';

export default function Footer() {
  return (
    <FooterWrapper className="fr-mt-4w">
      <FooterBody description="">
        <Logo
          asLink={<Link href="https://www.enseignementsup-recherche.gouv.fr/fr" />}
          splitCharacter={9}
        >
          Gouvernement
        </Logo>
        <FooterBodyItem>
          <Link target="_blank" href="https://github.com/dataesr/open-alex-poc">
            Github du POC
          </Link>
        </FooterBodyItem>
        <FooterBodyItem>
          <Link target="_blank" href="https://legifrance.gouv.fr">
            legifrance.gouv.fr
          </Link>
        </FooterBodyItem>
        <FooterBodyItem>
          <Link target="_blank" href="https://gouvernement.fr">
            gouvernement.fr
          </Link>
        </FooterBodyItem>
        <FooterBodyItem>
          <Link target="_blank" href="https://service-public.fr">
            service-public.fr
          </Link>
        </FooterBodyItem>
        <FooterBodyItem>
          <Link target="_blank" href="https://data.gouv.fr">data.gouv.fr</Link>
        </FooterBodyItem>
      </FooterBody>
    </FooterWrapper>
  );
}
