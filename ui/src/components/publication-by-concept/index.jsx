import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function ConceptByYear({ dataLoaded }) {
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

  let publicationsCountByYear = {};

  for (let year in publicationsGroupedByYear) {
    publicationsCountByYear[year] = 0;
    publicationsGroupedByYear[year].forEach(function (publication) {
      publication.concepts.forEach(function (concept) {
        let conceptLevel = concept?.level;
        if (conceptLevel === 0) {
          publicationsCountByYear[year]++;
        }
      });
    });
  }

  let concepts = {};

  for (let year in publicationsGroupedByYear) {
    let count = 0;
    publicationsGroupedByYear[year].forEach(function (publication) {
      count++;
      publication.concepts.forEach(function (concept) {
        let conceptLevel = concept?.level;
        if (conceptLevel === 0) {
          let conceptName = concept?.display_name;
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

  let sortedConcepts = Object.entries(concepts).sort((a, b) => {
    let aCount = Object.values(a[1]).reduce((acc, val) => acc + val, 0);
    let bCount = Object.values(b[1]).reduce((acc, val) => acc + val, 0);
    return bCount - aCount;
  });

  let top5 = sortedConcepts.slice(0, 5).map(([name]) => name);
  let otherCount = sortedConcepts.slice(5).reduce((acc, [name, counts]) => {
    let count = Object.values(counts).reduce(
      (innerAcc, val) => innerAcc + val,
      0
    );
    return { ...acc, [name]: count };
  }, {});

  let categories = [...top5, "Other"];
  let seriesData = [];

  for (let year in publicationsCountByYear) {
    let otherCountForYear = 0;
    for (let concept of Object.keys(concepts)) {
      if (!top5.includes(concept) && concepts[concept][year]) {
        otherCountForYear += concepts[concept][year];
      }
    }
    otherCount[year] = otherCountForYear;
  }

  for (let concept of categories) {
    let data = [];
    for (let year in publicationsGroupedByYear) {
      let count = 0;
      let totalPublications = publicationsCountByYear[year];
      if (concept === "Other") {
        count = (otherCount[year] / totalPublications) * 100;
      } else if (concepts[concept] && concepts[concept][year]) {
        count = (concepts[concept][year] / totalPublications) * 100;
      }
      data.push({ x: parseInt(year), y: count });
    }
    seriesData.push({ name: concept, data: data });
  }

  const options = {
    chart: {
      type: "column",
      zoomType: "x",
    },
    credits: { enabled: false },
    title: {
      text: "",
    },
    xAxis: {
      type: "category",
      title: {
        text: "Years",
      },
    },
    yAxis: {
      title: {
        enabled: false,
      },
      labels: {
        format: "{value}%",
      },
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.y:.2f}%</b>",
    },
    plotOptions: {
      area: {
        stacking: "percent",
        lineColor: "#666666",
        lineWidth: 1,
        marker: {
          enabled: false,
        },
      },
    },
    series: seriesData,
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default ConceptByYear;
