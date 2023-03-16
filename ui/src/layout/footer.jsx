import {
  Footer as FooterWrapper,
  FooterBody,
  FooterBodyItem,
  Link,
} from '@dataesr/react-dsfr';
import './footer.scss';

export default function Footer() {
  return (
    <FooterWrapper>
      <FooterBody description="">
        <FooterBodyItem>
          <Link target="_blank" href="https://frenchopensciencemonitor.esr.gouv.fr">
            French Open Science Monitor
          </Link>
        </FooterBodyItem>
        <FooterBodyItem>
          <Link target="_blank" href="https://scanr.enseignementsup-recherche.gouv.fr/">
            scanR - explore the French scientific landscape
          </Link>
        </FooterBodyItem>
        <FooterBodyItem>
          <Link target="_blank" href="https://github.com/dataesr/open-alex-poc">
            Source code of this app (Github)
          </Link>
        </FooterBodyItem>
        <FooterBodyItem>
          Webapp realized by the Decision Support Tools Department of the French Ministry of Higher Education and Research
        </FooterBodyItem>
      </FooterBody>
    </FooterWrapper>
  );
}
