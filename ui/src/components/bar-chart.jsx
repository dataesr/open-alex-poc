import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function BarChart({ data, categoriesText, orient='column', slice=10 }) {
  const top = data
    .slice(0, slice)
    .map((el) => ({ name: el.key_display_name, y: el.count }));

  let plotOptions = {};
  if (orient === 'area') {
    plotOptions = {
      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
          },
          stops: [
            [0, Highcharts.getOptions().colors[0]],
            [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
          ]
        },
        marker: {
          radius: 2
        },
        lineWidth: 1,
        states: {
          hover: {
            lineWidth: 1
          }
        },
        threshold: null
      }
    };
  }

  const options = {
    chart: { type: orient },
    plotOptions,
    credits: { enabled: false },
    legend: { enabled: false },
    series: [
      { data: top.map((item) => item.y), name: "Number of publications" },
    ],
    title: { text: "" },
    xAxis: { categories: top.map((item) => item.name), title: {text: categoriesText} },
    yAxis: { title: { text: "Number of publications" } },
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
