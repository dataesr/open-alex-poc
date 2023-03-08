import React from "react";
import data from "../../../data/huawei_france.json"
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function PublicationByYear() {

 let publicationsGroupedByYear = data?.results?.reduce(function(acc, publication) {
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
 title: {text: 'Évolution des publications par année'},
 xAxis: {title: {text: 'Année'}},
 yAxis: {title: {text: 'Nombre de publications'}},
 series: [{year: 'Nombre de publications',data: years}]
} ;

  return (
    <div>
      <h1> Nombre total de publication : {data.results.length}</h1>
  <div>
    {years.map(({year, y}) => (
      <div key={year}>
        <p>{year} : {y}</p>
      </div>
    ))}
  </div>
  <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
  </div>
  </div>
  );
}

export default PublicationByYear;