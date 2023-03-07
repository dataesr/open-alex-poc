import { useEffect } from "react";
import "@react-sigma/core/lib/react-sigma.min.css"

import { MultiDirectedGraph } from "graphology";
import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import { useWorkerLayoutForceAtlas2 } from "@react-sigma/layout-forceatlas2";
import './index.scss'
import data from '../../../data/huawei_france.json';

const colorByType = {
  'company': '#a9983d',
  'education': '#bc5bbc',
  'facility': '#5ca759',
  'government': '#7976c9',
  'healthcare': '#cb673e',
  'nonprofit': '#47b2c4',
  'other': '#c95779',
}

const LoadGraph = () => {
  const loadGraph = useLoadGraph();
  const nodes = {};
  let edges = [];

  const getNodeColor = (type) => {
    return colorByType?.[type];
  }

  const getNodePosition = () => {
    const max = 100;
    const x = Math.floor(Math.random() * max);
    const y = Math.floor(Math.random() * max);
    return { x, y };
  }

  const getNodeSize = (size) => {
    return Math.log(size);
  }

  data?.results?.forEach((work) => {
    let coInstitutions = [];
    work?.authorships?.forEach((authorship) => {
      authorship?.institutions?.forEach((institution) => {
        if (institution.id !== null) {
          if (!Object.keys(nodes).includes(institution.id)) {
            nodes[institution.id] = { label: institution?.display_name || institution.id, size: 1, type: institution?.type };
          } else {
            nodes[institution.id].size += 1;
          }
          coInstitutions.push(institution.id);
        }
      });
    });
    // Remove duplicates
    coInstitutions = [...new Set(coInstitutions)];
    // Generate pairs of coInstitutions
    const tmp = coInstitutions.flatMap(
      (v, i) => coInstitutions.slice(i + 1).map((w) => {
        return w < v ? { source: w, target: v } : { source: v, target: w };
      })
    );
    edges = edges.concat(tmp);
  });

  const uniqEdges = {};
  edges.forEach((edge) => {
    const edgeId = `${edge.source}${edge.target}`;
    if((edge.source !== edge.target) && !Object.keys(uniqEdges).includes(edgeId)) {
      uniqEdges[edgeId] = { ...edge, weight: 1 }
    } else {
      uniqEdges[edgeId].weight += 1;
    }
  });

  useEffect(() => {
    const graph = new MultiDirectedGraph();
    Object.keys(nodes).forEach((nodeId) => {
      const { x, y } = getNodePosition();
      graph.addNode(nodeId, { x, y, label: nodes[nodeId].label, size: getNodeSize(nodes[nodeId].size), color: getNodeColor(nodes[nodeId].type) });
    });
    Object.keys(uniqEdges).forEach((edgeId) => {
      const source = uniqEdges[edgeId]?.source;
      const target = uniqEdges[edgeId]?.target;
      const weight = uniqEdges[edgeId]?.weight;
      graph.addEdge(source, target, { weight });
    });
    loadGraph(graph);
  }, [loadGraph]);

  return null;
};

  export const DisplayGraph = () => {
  const Fa2 = () => {
    const { kill, start, stop } = useWorkerLayoutForceAtlas2({ settings: { adjustSizes: true, scalingRatio: 5 } });
  
    useEffect(() => {
      start();
      setTimeout(stop, '15000');
      return () => {
        kill();
      };
    }, [kill, start, stop]);
  
    return null;
  };

  return (
    <SigmaContainer style={{ height: "1000px", width: "1000px" }} className="network">
      <LoadGraph />
      <Fa2 />
      <div className="legend">
        <ul>
          {Object.keys(colorByType).map((type) => (
            <li style={{backgroundColor: colorByType[type]}}>
              {type}
            </li>
          ))}
          <li style={{backgroundColor: '#999999'}}>unknown</li>
        </ul>
      </div>
    </SigmaContainer>
  );
};