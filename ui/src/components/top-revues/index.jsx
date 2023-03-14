import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function TopRevues({ dataLoaded }) {

  const NB_TOP = 15;
  let revues = dataLoaded?.reduce(function (acc, publication) {
    let revue = publication.host_venue?.display_name;
    if (!acc[revue]) {
      acc[revue] = 0;
    }
    acc[revue]++;
    return acc;
  }, {});

  let topRevues = Object.entries(revues)
    .sort((a, b) => b[1] - a[1])
    .map(([revue, count]) => ({ name: revue, y: count }))
    .filter((el) => el.name !== 'null')
    .slice(0, NB_TOP);
  const options = {
    chart: { type: "bar" },
    credits: { enabled: false },
    legend: { enabled: false },
    series: [
      { data: topRevues.map((item) => item.y), name: "Nombre de publications" },
    ],
    title: { text: "" },
    xAxis: { categories: topRevues.map((item) => item.name) },
    yAxis: { title: { text: "Number of publications" } },
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default TopRevues;
