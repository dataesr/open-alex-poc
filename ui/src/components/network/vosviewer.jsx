import { NetworkClustering, NetworkLayout } from 'networkanalysis-ts/run';
import React from 'react';
import { updateScales, renderLinks, renderNodes } from './vosutils';

import huawei from '../../../data/huawei_france.json';

const getColorFromInsitution = (institution) => {
  if (institution?.type === 'education' && institution?.country_code === 'FR') return '#000091';
  if (institution?.country_code === 'FR') return '#e1000f';
  return '#999999';
};

const getLabelFromInstitution = (institution) => {
  let label = '';
  label += institution?.display_name ? institution.display_name : institution.id;
  label += institution?.country_code ? ` (${institution.country_code})` : '';
  return label;
};

function VOSViewerNetwork() {
  let links = [];
  let nodes = [];

  const getNodesAndLinks = (data) => {
    // Filter works that have 25 or less distinct institutions by work
    // console.log(`Nombre de publications : ${data?.results?.length}`);
    const filteredData = data?.results?.filter((work) => {
      let institutionsByWork = work?.authorships?.map((authorship) => authorship?.institutions.map((institution) => institution?.display_name.toLowerCase().trim()));
      institutionsByWork = [...new Set(institutionsByWork.flat())];
      if (institutionsByWork.length <= 25) return work;
    });
    // console.log(`Nombre de publications qui ont 25 institutions ou moins: ${filteredData.length}`);
    // Then filter institutions that have less than 5 works
    const institutions = [];
    filteredData?.forEach((work) => {
      work?.authorships?.forEach((authorship) => {
        authorship?.institutions.forEach((institution) => {
          const institutionId = institution?.display_name?.toLowerCase().trim();
          if (!institutions?.find((item) => item.id === institutionId)) {
            institutions?.push({ id: institutionId, works: [] });
          }
          if (!institutions?.find((item) => item.id === institutionId).works.includes(work.id)) institutions?.find((item) => item.id === institutionId).works.push(work.id);
        });
      });
    });
    // console.log(`Nombre d'institutions : ${institutions.length}`);
    const whiteListedInstitutions = institutions.filter((institution) => institution.works.length >= 5);
    // console.log(`Nombre d'institutions qui valident le seuil : ${whiteListedInstitutions.length}`);

    filteredData?.forEach((work) => {
      let coInstitutions = [];
      work?.authorships?.forEach((authorship) => {
        authorship?.institutions?.forEach((institution) => {
          // const institutionId = institution?.display_name?.toLowerCase().trim();
          const institutionId = institution?.id;
          if (whiteListedInstitutions.find((item) => item.id === institution?.display_name?.toLowerCase().trim())) {
            // 1. Create the institution node if it does not exist
            if (nodes.filter((node) => node.id === institutionId).length === 0) {
              nodes.push({ id: institutionId, label: getLabelFromInstitution(institution), color: getColorFromInsitution(institution) });
            }
            coInstitutions.push(institutionId);
          }
        });
      });
      // Remove duplicates
      coInstitutions = [...new Set(coInstitutions)];
      // Generate pairs of coInstitutions
      const pairs = coInstitutions.flatMap(
        (v, i) => coInstitutions.slice(i + 1).map((w) => (w < v ? { node1: w, node2: v } : { node1: v, node2: w })),
      );
      pairs.forEach((pair) => {
        if (pair?.node1 !== null && pair?.node2 !== null && pair?.node1 !== pair?.node2) {
          if (links.filter((link) => ((link.node1.id === pair.node1 && link.node2.id === pair.node2) || (link.node1.id === pair.node2 && link.node2.id === pair.node1))).length === 0) {
            const node1 = nodes.filter((node) => node.id === pair.node1)[0];
            const node2 = nodes.filter((node) => node.id === pair.node2)[0];
            links.push({ node1, node2 });
          }
        }
      });
    });

    // Filter nodes unlink
    // nodes.forEach((node, index) => {
    //   const countLinks = links
    // })

    return { links, nodes };
  };

  const renderSVG = (svg) => {
    if (svg) {
      const { links: links1, nodes: nodes1 } = getNodesAndLinks(huawei);
      links = links1;
      nodes = nodes1;

      // Perform clustering
      new NetworkClustering()
        .data(nodes, links)
        .qualityFunction('CPM')
        .normalization('AssociationStrength')
        .resolution(0.2)
        .minClusterSize(1)
        .algorithm('Leiden')
        .randomStarts(10)
        .iterations(50)
        .randomness(0.01)
        .seed(0)
        .run();

      // Perform layout
      new NetworkLayout()
        .data(nodes, links)
        .qualityFunction('VOS')
        .normalization('AssociationStrength')
        .attraction(2)
        .repulsion(1)
        .randomStarts(10)
        .seed(0)
        .run();

      updateScales(svg.clientWidth, svg.clientHeight, nodes);
      renderLinks(svg, links);
      renderNodes(svg, nodes);
    }
    // should implement else to remove netork from DOM
  };

  return (
    <>
      <span>
        {`Number of nodes: ${nodes?.length || 0} // Number of edges: ${links?.length || 0}`}
      </span>
      <svg ref={(svg) => renderSVG(svg)} style={{ height: '5000px', width: '5000px' }} />
    </>
  );
}

export default VOSViewerNetwork;
