import "@react-sigma/core/lib/react-sigma.min.css"
import { SigmaContainer } from "@react-sigma/core";
import Graph from "graphology";
import { cropToLargestConnectedComponent } from "graphology-components";
import circular from "graphology-layout/circular";
import forceAtlas2 from "graphology-layout-forceatlas2";

import "./index.scss";
import data from "../../../data/huawei_france.json";

const getColorFromInsitution = (institution) => {
  if (institution?.type === 'education' && institution?.country_code === 'FR') return '#000091';
  if (institution?.country_code === 'FR') return '#e1000f';
  return '#999999';
}

const getLabelFromInstitution = (institution) => {
  let label = '';
  label += institution?.display_name ? institution.display_name : institution.id;
  label += institution?.country_code ? ` (${institution.country_code})` : '';
  return label;
}

const Network = () => {
  // Filter works that have 25 or less distinct institutions by work
  // console.log(`Nombre de publications : ${data?.results?.length}`);
  const filteredData = data?.results?.filter((work) => {
    let institutionsByWork = work?.authorships?.map((authorship) => authorship?.institutions.map((institution) => institution?.display_name.toLowerCase().trim()));
    institutionsByWork = [...new Set(institutionsByWork.flat())];
    if (institutionsByWork.length <= 25) return work
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
        if(!institutions?.find((item) => item.id === institutionId).works.includes(work.id))
          institutions?.find((item) => item.id === institutionId).works.push(work.id);
      });
    });
  });
  // console.log(`Nombre d'institutions : ${institutions.length}`);
  const whiteListedInstitutions = institutions.filter((institution) => institution.works.length >= 5)
  // console.log(`Nombre d'institutions qui valident le seuil : ${whiteListedInstitutionIds.length}`);

  let edges = [];
  const graph = new Graph();

  filteredData?.forEach((work) => {
    let coInstitutions = [];
    work?.authorships?.forEach((authorship) => {
      authorship?.institutions?.forEach((institution) => {
        // const institutionId = institution?.display_name?.toLowerCase().trim();
        const institutionId = institution?.id;
        if (whiteListedInstitutions.find((item) => item.id === institution?.display_name?.toLowerCase().trim())) {
          // 1. Create the institution node if it does not exist
          if (!graph.hasNode(institutionId)) graph.addNode(institutionId, { institution, label: getLabelFromInstitution(institution), color: getColorFromInsitution(institution) });
          coInstitutions.push(institutionId);
        }
      });
    });
    // Remove duplicates
    coInstitutions = [...new Set(coInstitutions)];
    // Generate pairs of coInstitutions
    const pairs = coInstitutions.flatMap(
      (v, i) => coInstitutions.slice(i + 1).map((w) => {
        return w < v ? { source: w, target: v } : { source: v, target: w };
      })
    );
    edges = edges.concat(pairs);
  });

  // 2. Create the coAuthorship edges
  edges.forEach((edge) => {
    const { source, target } = edge;
    if(source !== target && !graph.hasEdge(source, target)) graph.addEdge(source, target);
  });

  // 3. Use degrees for node sizes:
  const degrees = graph.nodes().map((node) => graph.degree(node));
  const minDegree = Math.min(...degrees);
  const maxDegree = Math.max(...degrees);
  const minSize = 2,
    maxSize = 15;
  graph.forEachNode((node) => {
    const degree = graph.degree(node);
    graph.setNodeAttribute(node, 'size', minSize + ((degree - minDegree) / (maxDegree - minDegree)) * (maxSize - minSize));
  });

  // 4. Position nodes on a circle, then run Force Atlas 2 for a while to get proper graph layout
  circular.assign(graph);
  const settings = forceAtlas2.inferSettings(graph);
  forceAtlas2.assign(graph, { settings, iterations: 600 });

  // 5. Displaying useful information about your graph
  // console.log('Number of nodes', graph.order);
  // console.log('Number of edges', graph.size);

  return (
    <div>
      <SigmaContainer style={{ height: "1000px", width: "1000px" }} className="network" graph={graph}>
        <div className="legend">
          <ul>
            <li style={{backgroundColor: '#000091'}}>Université française</li>
            <li style={{backgroundColor: '#e1000f'}}>Autre français</li>
            <li style={{backgroundColor: '#999999'}}>Autre</li>
          </ul>
        </div>
      </SigmaContainer>
    </div>
  );
};

export default Network;
