"use strict";

/**
 * Fichier permettant de dessiner le graphique à bulles.
 */


/**
 * Crée les axes du graphique à bulles.
 *
 * @param g       Le groupe SVG dans lequel le graphique à bulles doit être dessiné.
 * @param xAxis   L'axe X.
 * @param yAxis   L'axe Y.
 * @param height  La hauteur du graphique.
 * @param width   La largeur du graphique.
 */
function createAxes(g, xAxis, yAxis, height, width) {
  // TODO: Dessiner les axes X et Y du graphique.
  
  // Axe horizontal
  const x = g.append("g")
  x.attr("class", "x axis")
  x.attr("transform", "translate(0," + height + ")")
  x.call(xAxis);  

  // x label
  const label_x = g.append("text")
  const text_x = "Espérance de vie (années)"
  label_x.text(text_x)
  const label_x_position = {x: width - 190, y: height - 10}
  label_x.attr("x", label_x_position.x)
  label_x.attr("y", label_x_position.y)
  
  // Axe verticale
  const y = g.append("g")
  y.attr("class", "y axis")
  y.call(yAxis)
  
  // y label
  const label_y = g.append("text")
  const text_y = "Revenu (USD)" 
  label_y.text(text_y)
  label_y.attr("transform", "rotate(-90)")
  const label_y_position = {x: -105, y: 20}
  label_y.attr("x", label_y_position.x)
  label_y.attr("y", label_y_position.y)
}

/**
 * Crée le graphique à bulles.
 *
 * @param g       Le groupe SVG dans lequel le graphique à bulles doit être dessiné.
 * @param data    Les données à utiliser.
 * @param x       L'échelle pour l'axe X.
 * @param y       L'échelle pour l'axe Y.
 * @param r       L'échelle pour le rayon des cercles.
 * @param color   L'échelle pour la couleur des cercles.
 * @param tip     L'infobulle à afficher lorsqu'un cercle est survolé.
 */
function createBubbleChart(g, data, x, y, r, color, tip) {
  // TODO: Dessiner les cercles du graphique en utilisant les échelles spécifiées.
  //       Assurez-vous d'afficher l'infobulle spécifiée lorsqu'un cercle est survolé.
  const bubbles = g.append('g')
                    .selectAll("circle")
                    .data(data)
                    .enter()
                        
  bubbles.append('circle')
          .attr("name", d => d.name)
          .attr("cx", d => x(d.lifeExpectancy))
          .attr("cy", d => y(d.income))
          .attr("r", d => r(d.population))
          .attr("fill", d => color(d.zone))
          .on('mouseover', tip.show)
          .on('mouseout', tip.hide)
}
