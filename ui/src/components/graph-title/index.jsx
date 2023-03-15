import { Icon, Text, Title } from "@dataesr/react-dsfr";

export default function GraphTitle({ filters, title, iconName }) {
  let subTitle = `Data from json file `;

  if (filters?.affiliationOne?.query && !filters?.affiliationTwo?.query) {
    subTitle = `Search on affiliation "${filters?.affiliationOne.query}"`;
  }
  if (!filters?.affiliationOne?.query && filters?.affiliationTwo?.query) {
    subTitle = `Search on affiliation "${filters?.affiliationTwo.query}"`;
  }
  if (filters?.affiliationOne?.query && filters?.affiliationTwo?.query) {
    subTitle = `Collaboration between ${filters?.affiliationOne.query} and ${filters?.affiliationTwo.query}`;
  }

  let years = '';
  if (filters?.startDate || filters?.endDate) {
    years = ` (${filters?.startDate} - ${filters?.endDate})`;
  }
  return (
    <div>
      <Title as="h2" look="h5" className="fr-mb-0">
        <Icon name={iconName} />
        {title}
      </Title>
      <Text className="fr-mb-0">
        <strong>
          {subTitle}
        </strong>
      </Text>
      {
        (filters?.onSample && filters?.sampleLength > 0) ? (
          <Text className="fr-mb-0">
            <Icon name="ri-error-warning-line" />
            <i>
              {`sample of ${filters?.sampleLength} elements`}
            </i>
          </Text>

        ) : null
      }
    </div>
  )
}