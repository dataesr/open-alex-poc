import { Highlight, Icon, Title } from "@dataesr/react-dsfr";

export default function GraphHeader({title, description, icon}) {
  return (
    <>
      <Title as="h2" look="h5" className="fr-mb-2w">
        <Icon name={icon || "ri-bar-chart-fill"} />
        {title}
      </Title>
      {description && (
        <Highlight colorFamily="yellow-tournesol" size="sm" className="fr-ml-0 fr-my-1w">
          <i>
            {description}
          </i>
        </Highlight>
      )}
    </>
  )
}