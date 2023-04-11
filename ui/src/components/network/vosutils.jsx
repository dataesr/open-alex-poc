import { extent } from 'd3-array';
import { scaleLinear, scaleOrdinal } from 'd3-scale';
import { schemeSet3 } from 'd3-scale-chromatic';
import { select } from 'd3-selection';

const positionXScale = scaleLinear();
const positionYScale = scaleLinear();
const colorScale = scaleOrdinal().range(schemeSet3);

const margin = {
  left: 10,
  top: 10,
  right: 10,
  bottom: 10,
};

export function updateScales(width, height, nodes) {
  positionXScale
    .range([margin.left, width - margin.left - margin.right])
    .domain(extent(nodes.map((d) => d.x)));
  positionYScale
    .range([height - margin.top - margin.bottom, margin.top])
    .domain(extent(nodes.map((d) => d.y)));

  colorScale.domain(nodes.map((d) => d.cluster));
}

function linkArc(sourceX, sourceY, targetX, targetY) {
  // const r = Math.hypot(targetX - sourceX, targetY - sourceY)
  const r = 0;
  return `
      M${sourceX},${sourceY}
      A${r},${r} 0 0,1 ${targetX},${targetY}
    `;
}

export function renderLinks(svgElement, links) {
  select(svgElement)
    .selectAll('line')
    .data(links.filter((l) => l.node1 && l.node2))
    .enter()
    .append('path')
    .attr('d', (d) => linkArc(
      positionXScale(d.node1?.x),
      positionYScale(d.node1?.y),
      positionXScale(d.node2?.x),
      positionYScale(d.node2?.y),
    ))
    .style('fill', 'none')
    .style('fill-opacity', 0.4)
    .style('stroke', 'lightgrey');
}

export function renderNodes(svgElement, nodes) {
  select(svgElement)
    .selectAll('circle')
    .data(nodes, (d) => d.id)
    .enter()
    .append('circle')
    .attr('r', 10)
    .attr('cx', (d) => positionXScale(d.x))
    .attr('cy', (d) => positionYScale(d.y))
    .style('fill', (d) => d.color);
  select(svgElement)
    .selectAll('text')
    .data(nodes)
    .enter()
    .append('text')
    .attr('x', (d) => positionXScale(d.x))
    .attr('y', (d) => positionYScale(d.y) + 5)
    .attr('font-size', '12px')
    .attr('text-anchor', 'middle')
    .attr('fill', '#000')
    .attr('opacity', 1)
    .text((d) => d.label);
}
