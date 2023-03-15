import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function BarChart({ data, orient='column', slice=10 }) {
  const top = data
    .slice(0, slice)
    .map((el) => ({ name: el.key_display_name, y: el.count }));

  const options = {
    chart: { type: orient },
    credits: { enabled: false },
    legend: { enabled: false },
    series: [
      { data: top.map((item) => item.y), name: "Nombre de publications" },
    ],
    title: { text: "" },
    xAxis: { categories: top.map((item) => item.name) },
    yAxis: { title: { text: "Number of publications" } },
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}