"use strict";

/**
 * File used for generating the legend and controlling the interactions with it.
 */


/**
 * Create a legend from the given source.
 *
 * @param svg       SVG element to use in order to create the legend.
 * @param sources   Data sorted by street name and by date.
 * @param color     The 10-color scale to use.
 */
function legend(svg, sources, color) {
  // TODO: Create the legend that supplements the graphic.
  const onClick = function() {
    const rectIdentifier = ".rect." + this.id
    const rect = d3.select(rectIdentifier)
    const currRectBg = rect.attr("fill")
    const bgColor = (this.id == "Moyenne")? "#000" : color(this.id)
    const newRectBg = (currRectBg === "#fff") ? bgColor : "#fff"
    rect.attr("fill",newRectBg)
    displayLine(".line." + this.id, newRectBg)
  }
  const size = 15
  const rects = svg.selectAll("rects")
  rects.data(sources)
      .enter()
      .append("rect")
      .attr("class", s => "rect " + s.name)
      .attr("id", s => s.name)
      .attr("x", 75)
      .attr("y", (_,i) => 5 + i*(size+10))
      .attr("width", size)
      .attr("height", size)
      .attr("fill", s => {return (s.name == "Moyenne")? "#000" : color(s.name)})
      .attr("stroke",s => "#000")
      .on("click", onClick)

  const labels = svg.selectAll("labels")
  labels.data(sources)
      .enter()
      .append("text")
      .attr("x", 80 + size)
      .attr("y", (_,i) =>  10 + i*(size+10) + (size/2))
      .text(s => s.name)
      .attr("class", "legend-label")
}

/**
 * Allows for show/hide whether the line that corresponding to the clicked square.
 *
 * By clicking on a square, we display/hide the corresponding line and the square's interior becomes white/goes back to its original color.
 *
 * @param element   The square that was clicked
 * @param color     The 10-color scale
 */
function displayLine(element, color) {
  // TODO: Complete the code to show or hide a line depending on the selected item
  const path = d3.selectAll(element)
  const pathOpacity = parseInt(path.style("opacity"))
  const opacity = (pathOpacity === 1) ? 0 : 1  
  path.style("opacity", opacity)
}
