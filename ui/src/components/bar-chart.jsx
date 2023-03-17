import React from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import treemapModule from 'highcharts/modules/treemap';
import HighchartsReact from 'highcharts-react-official';
import { Highlight } from '@dataesr/react-dsfr';

treemapModule(Highcharts);

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
  const colors = ['#cecece', '#3366cc', '#dc3912', '#ff9900', '#109618', '#00006d',
    '#990099', '#0099c6', '#dd4477', '#66aa00', '#b82e2e', '#316395', '#994499', '#22aa99', '#aaaa11', '#6633cc', '#e67300', '#8b0707', '#651067', '#329262', '#5574a6', '#3b3eac'];
  let series = [{ data: top.map((item) => item.y), name: 'Number of publications' }];
  if (type === 'treemap') {
    const treemapData = [];
    data.forEach((el, idx) => {
      treemapData.push({
        value: el.count,
        name: el.key_display_name,
        color: colors[idx],
      });
    });
    series = [{ data: treemapData, layoutAlgorithm: 'squarified' }];
  }
  let tooltip = {
    formatter: function () {
      return 'Number of publications for <b>' + this.x + '</b> is <b>' + this.y + '</b> works';
    }
   };
  if (type === 'treemap') {
    tooltip = {
      formatter: function () {
        return 'Number of publications since 2000 affiliated to <b>' + this.x + '</b> is <b>' + this.point.value + '</b> works';
      }
     };
  }
  const options = {
    chart: { type },
    plotOptions,
    credits: { enabled: false },
    legend: { enabled: false },
    series,
    tooltip,
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
