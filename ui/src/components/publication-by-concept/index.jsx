import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function ConceptByYear({ dataLoaded }) {
  const publicationsGroupedByYear = dataLoaded?.reduce(
    (
      acc,
      publication,
    ) => {
      const year = publication.publication_year;
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(publication);
      return acc;
    },
    {},
  );

  const publicationsCountByYear = {};

  for (const year in publicationsGroupedByYear) {
    publicationsCountByYear[year] = 0;
    publicationsGroupedByYear[year].forEach((publication) => {
      publication.concepts.forEach((concept) => {
        const conceptLevel = concept?.level;
        if (conceptLevel === 0) {
          publicationsCountByYear[year]++;
        }
      });
    });
  }

  const concepts = {};

  for (const year in publicationsGroupedByYear) {
    let count = 0;
    publicationsGroupedByYear[year].forEach((publication) => {
      count++;
      publication.concepts.forEach((concept) => {
        const conceptLevel = concept?.level;
        if (conceptLevel === 0) {
          const conceptName = concept?.display_name;
          if (!concepts[conceptName]) {
            concepts[conceptName] = {};
          }
          if (!concepts[conceptName][year]) {
            concepts[conceptName][year] = 0;
          }
          concepts[conceptName][year]++;
        }
      });
    });
  }

  const sortedConcepts = Object.entries(concepts).sort((a, b) => {
    const aCount = Object.values(a[1]).reduce((acc, val) => acc + val, 0);
    const bCount = Object.values(b[1]).reduce((acc, val) => acc + val, 0);
    return bCount - aCount;
  });

  const top5 = sortedConcepts.slice(0, 5).map(([name]) => name);
  const otherCount = sortedConcepts.slice(5).reduce((acc, [name, counts]) => {
    const count = Object.values(counts).reduce(
      (innerAcc, val) => innerAcc + val,
      0,
    );
    return { ...acc, [name]: count };
  }, {});

  const categories = [...top5, 'Other'];
  const seriesData = [];

  for (const year in publicationsCountByYear) {
    let otherCountForYear = 0;
    for (const concept of Object.keys(concepts)) {
      if (!top5.includes(concept) && concepts[concept][year]) {
        otherCountForYear += concepts[concept][year];
      }
    }
    otherCount[year] = otherCountForYear;
  }

  for (const concept of categories) {
    const data = [];
    for (const year in publicationsGroupedByYear) {
      let count = 0;
      const totalPublications = publicationsCountByYear[year];
      if (concept === 'Other') {
        count = (otherCount[year] / totalPublications) * 100;
      } else if (concepts[concept] && concepts[concept][year]) {
        count = (concepts[concept][year] / totalPublications) * 100;
      }
      data.push({ x: parseInt(year), y: count });
    }
    seriesData.push({ name: concept, data });
  }

  const options = {
    chart: {
      type: 'area',
      zoomType: 'x',
    },
    credits: { enabled: false },
    legend: { reversed: true },
    title: {
      text: '',
    },
    xAxis: {
      type: 'category',
      title: {
        text: 'Years',
      },
    },
    yAxis: {
      title: {
        enabled: false,
      },
      labels: {
        format: '{value}%',
      },
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y:.2f}%</b>',
    },
    plotOptions: {
      area: {
        stacking: 'percent',
        lineColor: '#666666',
        lineWidth: 1,
        marker: {
          enabled: false,
        },
      },
    },
    series: seriesData.reverse(),
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default ConceptByYear;
