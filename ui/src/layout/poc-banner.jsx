import { useState } from "react";
import { Link } from "@dataesr/react-dsfr";

export default function PocBanner() {
  const [display, setDisplay] = useState(true);
  if (!display) return null;
  return (
    <div class="fr-notice fr-notice--info">
      <div class="fr-container">
        <div class="fr-notice__body">
          <p class="fr-notice__title">
            This app is ongoing development and is a proof of concept.
          </p>
          <p className="fr-text--sm">
            <i>
              The graphs and results probably do not represent a comprehensive view of the scholarly outputs you may expect to see for a given affiliation.
              <br />
              The institution parsing in OpenAlex is also still in development, which results in lots af raw affiliation not matched to any country/institution,
              or even mismatched to a wrong country/institution.
              We exhibits a sample of theses cases in this repo
              &nbsp;
              <Link href="https://github.com/dataesr/openalex-affiliation-country" target='_blank'>https://github.com/dataesr/openalex-affiliation-country</Link>
            </i>
          </p>
          <button class="fr-btn--close fr-btn" title="Masquer le message" onClick={() => setDisplay(false)}>
            Masquer le message
          </button>
        </div>
      </div>
    </div>
  );
}