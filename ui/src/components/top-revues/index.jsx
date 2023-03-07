import React from 'react';
import data from "../../../data/huawei_france.json"
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


function TopRevues() {


let revues = data.results.reduce(function(acc, publication) {
  let revue = publication.host_venue.display_name;
  if (!acc[revue]) {
    acc[revue] = 0;
  }
  acc[revue]++;
  return acc;
}, {});

let topRevues = Object.entries(revues)
  .sort((a, b) => b[1] - a[1])
  .map(([revue, count]) => ({ name: revue, y: count }));

const options = {
  chart: {
    type: 'bar'
  },
  title: {
    text: 'Top des revues avec le plus de publications'
  },
  xAxis: {
    categories: topRevues.map(item => item.name)
  },
  yAxis: {
    title: {
      text: 'Nombre de publications'
    }
  },
  series: [{
    name: 'Nombre de publications',
    data: topRevues.map(item => item.y)
  }]
};
 return (
  <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
  </div>
  );
    }
  export default TopRevues