import { Badge, Col, Container, Row, Title } from '@dataesr/react-dsfr';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function PublicationByYear({ data }) {
  if (!data || data.length === 0) return null;

  let publicationsGroupedByYear = data?.reduce(function (acc, publication) {
    let year = publication.publication_year;
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(publication);
    return acc;

  }, {});

  const years = Object.entries(publicationsGroupedByYear).map(([year, publications]) => ({
    year: year,
    y: publications.length,
  }));

  const options = {
    chart: {
      type: 'column'
    },
    title: { text: 'Évolution des publications par année' },
    xAxis: { title: { text: 'Année' } },
    yAxis: { title: { text: 'Nombre de publications' } },
    series: [{ year: 'Nombre de publications', data: years }]
  };

  return (
    <div>
      <Title as='h2' look='h4'>
        Nombre total de publications par année
        <Badge text={data.length} />
      </Title>
      <Container fluid>
        <Row gutters>
          <Col n='6'>
            {years.map(({ year, y }) => (
              <div key={year}>
                <p>{year} : {y}</p>
              </div>
            ))}
          </Col>
          <Col n='6'>
            <HighchartsReact highcharts={Highcharts} options={options} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PublicationByYear;