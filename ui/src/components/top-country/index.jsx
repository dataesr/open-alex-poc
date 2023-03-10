import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import enrichWorksAuthorships from "../../utils/enrich";

function TopCountry({ dataLoaded, filters }) {
  const enrichedData = enrichWorksAuthorships(dataLoaded, filters);
  const institutions = [];
  enrichedData.forEach((work) => {
    work.authorships.forEach((el) =>
      el.institutions.forEach((inst) => {
        institutions.push(inst);
      })
    );
  });

  const topCountries = institutions.reduce(function (acc, institution) {
    let C = institution.country_code;
    if (C === null) {
      return acc;
    }
    if (!acc[C]) {
      acc[C] = 0;
    }
    acc[C]++;
    return acc;
  }, {});

  const sortedTopCountry = Object.fromEntries(
    Object.entries(topCountries).sort((a, b) => b[1] - a[1])
  );

  const options = {
    chart: { type: "column" },
    credits: { enabled: false },
    legend: { enabled: false },
    series: [
      {
        name: "Number of partnerships",
        data: Object.values(sortedTopCountry).filter((count) => count >= 20),
      },
    ],
    title: { text: "" },
    xAxis: {
      title: { text: "Countries" },
      categories: Object.keys(sortedTopCountry).filter(
        (country) => sortedTopCountry[country] >= 20
      ),
    },
    yAxis: { title: { text: "Number of partnerships" } },
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default TopCountry;
