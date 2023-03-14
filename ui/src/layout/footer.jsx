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
        <FooterBodyItem>
          <Link target="_blank" href="https://github.com/dataesr/open-alex-poc">
            Github du POC
          </Link>
        </FooterBodyItem>
      </FooterBody>
    </FooterWrapper>
  );
}
