import {
  Footer as FooterWrapper,
  FooterBody,
  FooterBodyItem,
  Link,
} from '@dataesr/react-dsfr';

export default function Footer() {
  return (
    <FooterWrapper className="fr-mt-4w">
      <FooterBody description="">
        <FooterBodyItem>
          <Link target="_blank" href="https://github.com/dataesr/open-alex-poc">
            Link to the open source of this app (Github)
          </Link>
        </FooterBodyItem>
        <FooterBodyItem>
          Webapp realized by the Decision Support Tools Department of the French Ministry of Higher Education and Research
        </FooterBodyItem>
      </FooterBody>
    </FooterWrapper>
  );
}
