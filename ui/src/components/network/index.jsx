import "@react-sigma/core/lib/react-sigma.min.css"
import { SigmaContainer } from "@react-sigma/core";
import Graph from "graphology";
import { cropToLargestConnectedComponent } from "graphology-components";
import circular from "graphology-layout/circular";
import forceAtlas2 from "graphology-layout-forceatlas2";

import "./index.scss";
import data from "../../../data/huawei_france.json";

const colorByType = {
  'company': '#a9983d',
  'education': '#bc5bbc',
  'facility': '#5ca759',
  'government': '#7976c9',
  'healthcare': '#cb673e',
  'nonprofit': '#47b2c4',
  'other': '#c95779',
}

const DisplayGraph = () => {
  let edges = [];
  const graph = new Graph();

  data?.results?.forEach((work) => {
    let coInstitutions = [];
    work?.authorships?.forEach((authorship) => {
      authorship?.institutions?.forEach((institution) => {
        if (institution.id !== null) {
          const nodeId = institution.id;
          // 1. Create the institution node if it does not exist
          if (!graph.hasNode(nodeId)) graph.addNode(nodeId, { label: institution?.display_name || institution.id, color: colorByType?.[institution?.type] });
          coInstitutions.push(institution.id);
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

  // 2. Create the uniq coAuthorship edges
  edges.forEach((edge) => {
    const { source, target } = edge;
    if(source !== target && !graph.hasEdge(source, target)) graph.addEdge(source, target);
  });
  // 3. Only keep the main connected component:
  cropToLargestConnectedComponent(graph);
  // 4. Use degrees for node sizes:
  const degrees = graph.nodes().map((node) => graph.degree(node));
  const minDegree = Math.min(...degrees);
  const maxDegree = Math.max(...degrees);
  const minSize = 2,
    maxSize = 15;
  graph.forEachNode((node) => {
    const degree = graph.degree(node);
    graph.setNodeAttribute(node, 'size', minSize + ((degree - minDegree) / (maxDegree - minDegree)) * (maxSize - minSize));
  });
  // 5. Position nodes on a circle, then run Force Atlas 2 for a while to get proper graph layout
  circular.assign(graph);
  const settings = forceAtlas2.inferSettings(graph);
  forceAtlas2.assign(graph, { settings, iterations: 600 });

  return (
    <div>
      <SigmaContainer style={{ height: "1000px", width: "1000px" }} className="network" graph={graph}>
        <div className="legend">
          <ul>
            {Object.keys(colorByType).map((type) => (
              <li style={{backgroundColor: colorByType[type]}} key={type}>
                {type}
              </li>
            ))}
            <li style={{backgroundColor: '#999999'}}>unknown</li>
          </ul>
        </div>
      </SigmaContainer>
    </div>
  );
};

export default DisplayGraph;
