import React from "react";
import data from "../../data/huawei_france.json"
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function publicationByYear() {

 let publicationsGroupedByYear = data?.results?.reduce(function(acc, publication) {
  let year = publication.publication_year;
  if (!acc[year]) {
    acc[year] = [];
  }
  acc[year].push(publication);
  return acc;

}, {});
const years = Object.entries(publicationsGroupedByYear).map(([year, publications]) => ({
  name: year,
  y: publications.length,
}));

const options = {
 title: {text: 'Évolution des publications par année'},
 xAxis: {type: 'category',title: {text: 'Année'}},
 yAxis: {title: {text: 'Nombre de publications'}},
 series: [{name: 'Nombre de publications',data: years}]
} ;

  return (
    <div>
      <h1> Nombre total de publication : {data.results.length}</h1>
  <div>
    {years.map(({name, y}) => (
      <div key={name}>
        <p>{name}        Nombre de publications: {y}</p>
      </div>
    ))}
  </div>
  <div id="container">
            <HighchartsReact highcharts={Highcharts} options={options} />
  </div>
  </div>
  );
}

export default publicationByYear;