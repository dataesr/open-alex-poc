import '@react-sigma/core/lib/react-sigma.min.css';
import { SigmaContainer, useRegisterEvents } from '@react-sigma/core';
import Graph from 'graphology';
import circular from 'graphology-layout/circular';
import forceAtlas2 from 'graphology-layout-forceatlas2';

import './index.scss';
import { useEffect, useState } from 'react';
import data from '../../../data/huawei_france.json';

const DEFAULT_NODE_COLOR = '#999999';

const getInsitutionColor = (institution) => {
  if (institution?.type === 'education' && institution?.country_code === 'FR') return '#000091';
  if (institution?.country_code === 'FR') return '#e1000f';
  return DEFAULT_NODE_COLOR;
};

// const getInstitutionId = (institution) => `${institution?.display_name?.toLowerCase()?.trim() || ''}-${institution?.country_code?.toLowerCase()?.trim() || ''}`;
const getInstitutionId = (institution) => institution?.display_name?.toLowerCase()?.trim() || '';

const getInstitutionLabel = (institution) => {
  let label = '';
  label += institution?.display_name ? institution.display_name : institution.id;
  label += institution?.country_code ? ` (${institution.country_code})` : '';
  return label;
};

function Network() {
  const [hoveredNode, setHoveredNode] = useState(undefined);
  const graph = new Graph();

  function GraphEvents() {
    const registerEvents = useRegisterEvents();
    useEffect(() => {
      registerEvents({
        enterNode: (event) => {
          console.log('enterNode', event.node);
          setHoveredNode(event.node);
          graph.setNodeAttribute(event.node, 'color', '#000091');
          graph.forEachNeighbor(event.node, (neighbor, attributes) => {
            graph.setNodeAttribute(neighbor, 'color', '#e1000f');
          });
        },
        leaveNode: (event) => {
          console.log('leaveNode', event.node);
          setHoveredNode(undefined);
          graph.setNodeAttribute(event.node, 'color', DEFAULT_NODE_COLOR);
          graph.forEachNeighbor(event.node, (neighbor, attributes) => {
            graph.setNodeAttribute(neighbor, 'color', DEFAULT_NODE_COLOR);
          });
        },
      });
    }, [registerEvents]);

    return null;
  }

  // Filter works that have 25 or less distinct institutions by work
  const filteredData = data?.results?.filter((work) => {
    let institutionsByWork = work?.authorships?.map((authorship) => authorship?.institutions.map((institution) => getInstitutionId(institution)));
    institutionsByWork = [...new Set(institutionsByWork.flat())];
    if (institutionsByWork.length <= 25) return work;
  });
  // Then filter institutions that have less than 5 works
  const institutions = [];
  filteredData?.forEach((work) => {
    work?.authorships?.forEach((authorship) => {
      authorship?.institutions.forEach((institution) => {
        const institutionId = getInstitutionId(institution);
        if (!institutions?.find((item) => item.id === institutionId)) {
          institutions?.push({ id: institutionId, works: [] });
        }
        if (!institutions?.find((item) => item.id === institutionId).works.includes(work.id)) institutions?.find((item) => item.id === institutionId).works.push(work.id);
      });
    });
  });
  const whiteListedInstitutions = institutions.filter((institution) => institution.works.length >= 5);

  let edges = [];

  filteredData?.forEach((work) => {
    let coInstitutions = [];
    work?.authorships?.forEach((authorship) => {
      authorship?.institutions?.forEach((institution) => {
        const institutionId = getInstitutionId(institution);
        if (whiteListedInstitutions.find((item) => item.id === institutionId)) {
          // 1. Create the institution node if it does not exist
          if (!graph.hasNode(institutionId)) graph.addNode(institutionId, { institution, label: getInstitutionId(institution) });
          coInstitutions.push(institutionId);
        }
      });
    });
    // Remove duplicates
    coInstitutions = [...new Set(coInstitutions)];
    // Generate pairs of coInstitutions
    const pairs = coInstitutions.flatMap(
      (v, i) => coInstitutions.slice(i + 1).map((w) => (w < v ? { source: w, target: v } : { source: v, target: w })),
    );
    edges = edges.concat(pairs);
  });

  // 2. Create the coAuthorship edges
  edges.forEach((edge) => {
    const { source, target } = edge;
    if (source !== target) {
      if (!graph.hasEdge(source, target)) {
        graph.addEdge(source, target, { weight: 1 });
      } else {
        const weight = graph.getEdgeAttribute(source, target, 'weight');
        graph.setEdgeAttribute(source, target, 'weight', weight + 1);
      }
    }
  });

  // 3. Use degrees for node sizes:
  const degrees = graph.nodes().map((node) => graph.degree(node));
  const minDegree = Math.min(...degrees);
  const maxDegree = Math.max(...degrees);
  const minSize = 5;
  const maxSize = 25;
  graph.forEachNode((node) => {
    const degree = graph.degree(node);
    graph.setNodeAttribute(node, 'size', minSize + ((degree - minDegree) / (maxDegree - minDegree)) * (maxSize - minSize));
  });

  // 4. Position nodes on a circle, then run Force Atlas 2 for a while to get proper graph layout
  circular.assign(graph);
  const settings = forceAtlas2.inferSettings(graph);
  settings.linLogMode = false;
  settings.gravity = 1;
  settings.outboundAttractionDistribution = true;
  settings.scalingRatio = 1;
  settings.adjustSizes = false;
  settings.edgeWeightInfluence = 2;
  forceAtlas2.assign(graph, { settings, iterations: 600 });
  return (
    <div>
      <div>
        {`Number of nodes (distinct institutions names) : ${graph.order}  //  Number of edges : ${graph.size}`}
      </div>
      <SigmaContainer style={{ height: '750px', width: '750px' }} className="network" graph={graph}>
        <GraphEvents />
        {/* <div className="legend">
          <ul>
            <li style={{ backgroundColor: '#000091' }}>
              French university
            </li>
            <li style={{ backgroundColor: '#e1000f' }}>
              French
            </li>
            <li style={{ backgroundColor: DEFAULT_NODE_COLOR }}>
              Other
            </li>
          </ul>
        </div> */}
      </SigmaContainer>
    </div>
  );
}

export default Network;
