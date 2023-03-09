import { Icon, Text, Title } from "@dataesr/react-dsfr";

export default function GraphTitle({ filters, title, iconName }) {
    let subTitle = `Data from json file `;

    if (filters?.details?.affiliationOne?.query && !filters?.details?.affiliationTwo?.query) {
        subTitle = `Search on affiliation "${filters.details.affiliationOne.query}"`;
    }
    if (!filters?.details?.affiliationOne?.query && filters?.details?.affiliationTwo?.query) {
        subTitle = `Search on affiliation "${filters.details.affiliationTwo.query}"`;
    }
    if (filters?.details?.affiliationOne?.query && filters?.details?.affiliationTwo?.query) {
        subTitle = `Collaboration between ${filters.details.affiliationOne.query} and ${filters.details.affiliationTwo.query}`;
    }

    let years = '';
    if (filters?.details?.startDate || filters?.details?.endDate) {
        years = `(${filters?.details?.startDate} - ${filters?.details?.endDate})`;
    }
    console.log(filters);
    return (
        <p>
            <Title as="h2" look="h3" className="fr-mb-0">
                <Icon name={iconName} />
                {`${title}${years}`}
            </Title>
            <Text className="fr-mb-0">
                <strong>
                    {subTitle}
                </strong>
            </Text>
            {
                (filters?.details?.onSample && filters?.details?.sampleLength > 0) ? (
                    <Text className="fr-mb-0">
                        <Icon name="ri-error-warning-line" />
                        <i>
                            {`sample of ${filters?.details?.sampleLength} elements`}
                        </i>
                    </Text>

                ) : null
            }
        </p>
    )
}