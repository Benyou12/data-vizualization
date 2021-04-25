"use strict";

/**
 * File to draw the "focus" and "context" line charts.
 */


/**

 * Creates an SVG line using the specified X and Y domains
 * This function is used by the "focus" and "context" line charts
 *
 * @param x               X domain
 * @param y               Y domain
 * @return d3.svg.line    SVG line
 *
 * @see https://bl.ocks.org/gordlea/27370d1eea8464b04538e6d8ced39e89      (see line generator)
 */
function createLine(x, y) {
  // TODO: Return an SVG line (see "d3.line"). For the curve option, use a curveBasisOpen.
  return d3.line()
  .x(s => x(s.date))
  .y(s => y(s.count))
  .curve(d3.curveBasisOpen)
}

/**
 * Creates the "focus" line chart
 *
 * @param g         The SVG group where you draw the graphic. 
 * @param sources   The data to use. 
 * @param line      The function to draw the lines of the graphic. 
 * @param color     Color scale with street names associated to colors
 */
function createFocusLineChart(g, sources, line, color) {

  // TODO: Draw the "focus" line chart in the "g" group
  // For each "path" you draw, specify this attribute : .attr("clip-path", "url(#clip)").
  const blackHex = "#000000"
  const defineWith = code => (code == "Moyenne") ? 3 : 1
  const paths = g.selectAll("focus").data(sources)
  paths.enter()
  .append("path")
  .attr("class", s => "line focus " + s.name)
  .attr("data-legend", s => s.name)
  .attr("stroke", s => {return (s.name == "Moyenne")? blackHex : color(s.name)})
  .attr("fill", "none")
  .attr("stroke-width", s => defineWith(s.name))
  .attr("d", s => line(s.values))
  .attr("clip-path", "url(#clip)")
}

/**
 * Creates the "context" line chart
 *
 * @param g         The SVG group where you draw the graphic. 
 * @param sources   The data to use. 
 * @param line      The function to draw the lines of the graphic. 
 * @param color     Color scale with street names associated to colors
 */
function createContextLineChart(g, sources, line, color) {
  // TODO: Draw the "context" line chart in the "g" group
  const blackHex = "#000000"
  const paths = g.selectAll("context").data(sources)
  paths.enter()
  .append("path")
  .attr("class", s => "line context " + s.name)
  .attr("data-legend", s => s.name)
  .attr("stroke", s => {return (s.name == "Moyenne")? blackHex : color(s.name)})
  .attr("fill", "none")
  .attr("stroke-width", 1)
  .attr("d", s => line(s.values))
}
