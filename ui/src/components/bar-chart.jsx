import React from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Highlight } from '@dataesr/react-dsfr';

export default function BarChart({ data, categoriesText, type, slice }) {
  const top = data
    .slice(0, slice)
    .map((el) => ({ name: el.key_display_name, y: el.count }));

  let plotOptions = {};
  if (type === 'area') {
    plotOptions = {
      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, Highcharts.getOptions().colors[0]],
            [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')],
          ],
        },
        marker: {
          radius: 2,
        },
        lineWidth: 1,
        states: {
          hover: {
            lineWidth: 1,
          },
        },
        threshold: null,
      },
    };
  }

  const options = {
    chart: { type },
    plotOptions,
    credits: { enabled: false },
    legend: { enabled: false },
    series: [
      { data: top.map((item) => item.y), name: 'Number of publications' },
    ],
    title: { text: '' },
    xAxis: { categories: top.map((item) => item.name), title: { text: categoriesText } },
    yAxis: { title: { text: 'Number of publications' } },
  };
  if (data?.length === 0) {
    return (
      <Highlight colorFamily="yellow-tournesol" size="sm" className="fr-ml-0 fr-my-1w">
        <i>No data to display for this graph</i>
      </Highlight>
    );
  }

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
BarChart.defaultProps = {
  categoriesText: null,
  type: 'column',
  slice: 10,
};

BarChart.propTypes = {
  data: PropTypes.array.isRequired,
  categoriesText: PropTypes.string,
  type: PropTypes.oneOf(['column', 'bar', 'area']),
  slice: PropTypes.number,
};
