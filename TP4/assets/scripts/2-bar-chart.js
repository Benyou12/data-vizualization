"use strict";

/**
 * Fichier permettant de dessiner le graphique à bandes.
 */


/**
 * Crée les axes du graphique à bandes.
 *
 * @param g       Le groupe SVG dans lequel le graphique à bandes doit être dessiné.
 * @param xAxis   L'axe X.
 * @param yAxis   L'axe Y.
 * @param height  La hauteur du graphique.
 */
function createAxes(g, xAxis, yAxis, height) {
  // TODO: Dessiner les axes X et Y du graphique. Assurez-vous d'indiquer un titre pour l'axe Y.
  // Axe horizontal
  const x = g.append("g")
  x.attr("class","xAxis")
  x.attr("transform","translate(0, " + height +")")
  x.call(xAxis)
  const x_labels = x.selectAll("text")
  x_labels.attr("transform", "rotate(30)")
  x_labels.style("text-anchor", "start");

  // Axe vertical
  const y = g.append("g")
  y.attr("class","yAxis")
  y.call(yAxis)
    
  const yTitle = g.append("text")
  const position = { x: 0, y: 0}
  yTitle.attr("y", position.x )
  yTitle.attr("x", position.y )
  yTitle.attr("dx", "-1.7em")
  yTitle.attr("dy", "-1em")
  yTitle.text("Nombre de trajets");
  yTitle.style("text-anchor", "start") 
}

/**
 * Crée le graphique à bandes.
 *
 * @param g             Le groupe SVG dans lequel le graphique à bandes doit être dessiné.
 * @param currentData   Les données à utiliser.
 * @param x             L'échelle pour l'axe X.
 * @param y             L'échelle pour l'axe Y.
 * @param color         L'échelle de couleurs qui est associée à chacun des noms des stations de BIXI.
 * @param tip           L'infobulle à afficher lorsqu'une barre est survolée.
 * @param height        La hauteur du graphique.
 */
function createBarChart(g, currentData, x, y, color, tip, height) {
  // TODO: Dessiner les cercles à bandes en utilisant les échelles spécifiées.
  //       Assurez-vous d'afficher l'infobulle spécifiée lorsqu'une barre est survolée.
  const bars = g.selectAll(".bar").data(currentData.destinations).enter()

  const margin = 10
  const bar_width = (x.range()[1]/currentData.destinations.length) - margin/2
  bars.append("rect")
      .attr("x", d => x(d.name) + margin/2)
      .attr("y", d => y(d.count))
      .attr("width", bar_width)
      .attr("height", d => height - y(d.count))
      .attr("fill", d => color(d.name))
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);
}

/**
 * Réalise une transition entre les données actuellement utilisées et les nouvelles qui doivent être utilisées.
 *
 * @param g         Le groupe SVG dans lequel le graphique à bandes est dessiné.
 * @param newData   Les nouvelles données à utiliser.
 * @param y         L'échelle pour l'axe Y.
 * @param yAxis     L'axe Y.
 * @param height    La hauteur du graphique.
 */
function transition(g, newData, y, yAxis, height) {
  /* TODO:
   - Réaliser une transition pour mettre à jour l'axe des Y et la hauteur des barres à partir des nouvelles données.
   - La transition doit se faire en 1 seconde.
   */
  // Updating the vertical axis
  g.select("g.yAxis").call(yAxis)
  // updating the bars
  const oneSeconde = 1000
  const bars = g.selectAll("rect")
  bars.data(newData.destinations)
      .transition()
      .duration(oneSeconde)
      .attr("y", d => y(d.count))
      .attr("height", d => height - y(d.count))
}

/**
 * Obtient le texte associé à l'infobulle.
 *
 * @param d               Les données associées à la barre survollée par la souris.
 * @param currentData     Les données qui sont actuellement utilisées.
 * @param formatPercent   Fonction permettant de formater correctement un pourcentage.
 * @return {string}       Le texte à afficher dans l'infobulle.
 */
function getToolTipText(d, currentData, formatPercent) {
  // TODO: Retourner le texte à afficher dans l'infobulle selon le format demandé.
  //       Assurez-vous d'utiliser la fonction "formatPercent" pour formater le pourcentage correctement.
  const sum = d3.sum(currentData.destinations, d => d.count)
  return ""+ d.count+" ("+formatPercent(d.count/sum)+")";
}
