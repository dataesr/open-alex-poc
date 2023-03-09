import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function PublicationByYear({ dataLoaded }) {
  let publicationsGroupedByYear = dataLoaded?.reduce(function (
    acc,
    publication
  ) {
    let year = publication.publication_year;
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(publication);
    return acc;
  },
    {});
  const years = Object.entries(publicationsGroupedByYear).map(
    ([year, publications]) => ({
      year: year,
      y: publications.length,
    })
  );

  const options = {
    chart: { type: "column" },
    credits: { enabled: false },
    legend: { enabled: false },
    series: [{ name: "Nombre de publications", data: years }],
    title: { text: "" },
    xAxis: {
      title: { text: "Years" },
      categories: Object.keys(publicationsGroupedByYear),
    },
    yAxis: { title: { text: "Number of publications" } },
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default PublicationByYear;
