"use strict";

/**
 * Fichier permettant de dessiner le diagramme à cordes.
 */


/**
 * Crée les groupes du diagramme à cordes.
 *
 * @param g               Le groupe SVG dans lequel le diagramme à cordes doit être dessiné.
 * @param data            Les données provenant du fichier JSON.
 * @param layout          La disposition utilisée par le diagramme à cordes.
 * @param arc             Fonction permettant de dessiner les arcs.
 * @param color           L'échelle de couleurs qui est associée à chacun des noms des stations de BIXI.
 * @param total           Le nombre total de trajets réalisés pour le mois d'août 2015.
 * @param formatPercent   Fonction permettant de formater correctement un pourcentage.
 *
 * @see https://bl.ocks.org/mbostock/4062006
 */
function createGroups(g, data, layout, arc, color, total, formatPercent) {
  /* TODO:
     - Créer les groupes du diagramme qui sont associés aux stations de BIXI fournies.
     - Utiliser un "textPath" pour que les nom de stations suivent la forme des groupes.
     - Tronquer les noms des stations de BIXI qui sont trop longs (Pontiac et Métro Mont-Royal).
     - Afficher un élément "title" lorsqu'un groupe est survolé par la souris.
  */
    const circles = g.selectAll("g").data(layout.groups).enter()
        .append("g")
        .classed("arc",true)
    // Diagramme groups
    const arcPath = circles.append("path")
    arcPath.attr("id", d=>"arc-"+d.index)
    arcPath.attr("fill", d => color(d.index))
    arcPath.attr("d", arc);
    // Util functions
    const isPontiacOrMontRoyal = name => name === "Pontiac / Gilford" || name === "Métro Mont-Royal (Rivard/Mont-Royal)"
    const truncate = name => (name === "Pontiac / Gilford")? "Pontiac" : "Métro Mont-Royal"
    const formatName = name => isPontiacOrMontRoyal(name) ? truncate(name) : name
    // Labels
    const label = circles.append("text")
    label.attr("fill", "white")
         .attr("font-size","11px")
         .attr("font-weigth","bold")
         .attr("dx","0.7em")
         .attr("dy","1.4em")
         .append("textPath")
         .attr("href", d=>"#arc-"+d.index)
         .style("text-anchor","start")
         .text(d => formatName(data[d.index].name));
    // Title
    const tooltipLabel =  d => {
      const sum = d3.sum(data[d.index].destinations, d=> d.count)
      return data[d.index].name+": "+formatPercent(sum/total)+" des departs"
    }
    const tooltip = circles.append("title")
    tooltip.text(d => tooltipLabel(d))
}

/**
 * Crée les cordes du diagramme à cordes.
 *
 * @param g               Le groupe SVG dans lequel le diagramme à cordes doit être dessiné.
 * @param data            Les données provenant du fichier JSON.
 * @param layout          La disposition utilisée par le diagramme à cordes.
 * @param path            Fonction permettant de dessiner les cordes.
 * @param color           L'échelle de couleurs qui est associée à chacun des noms des stations de BIXI.
 * @param total           Le nombre total de trajets réalisés pour le mois d'août 2015.
 * @param formatPercent   Fonction permettant de formater correctement un pourcentage.
 *
 * @see https://beta.observablehq.com/@mbostock/d3-chord-dependency-diagram
 */
function createChords(g, data, layout, path, color, total, formatPercent) {
  /* TODO:
     - Créer les cordes du diagramme avec une opacité de 80%.
     - Afficher un élément "title" lorsqu'une corde est survolée par la souris.
  */
  const arrowRigth = " &rarr; "
  const fromSource = d => data[d.source.index].name + arrowRigth + data[d.target.index].name + " " +formatPercent(d.source.value/total)
  const toSource = d => data[d.target.index].name + arrowRigth + data[d.source.index].name + " " +formatPercent(d.target.value/total) 
  const chordLabel = d => fromSource(d) + "\n" + toSource(d)
  
  g.selectAll("chord")
    .data(layout)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("fill", d => color(d.source.index))
    .attr("class","chord")
    .append("title")
    .html( d => chordLabel(d))
}

/**
 * Initialise la logique qui doit être réalisée lorsqu'un groupe du diagramme est survolé par la souris.
 *
 * @param g     Le groupe SVG dans lequel le diagramme à cordes est dessiné.
 */
function initializeGroupsHovered(g) {
  /* TODO:
     - Lorsqu'un groupe est survolé par la souris, afficher les cordes entrant et sortant de ce groupe avec une
       opacité de 80%. Toutes les autres cordes doivent être affichées avec une opacité de 10%.
     - Rétablir l'affichage du diagramme par défaut lorsque la souris sort du cercle du diagramme.
  */
  // Events
  const onMouseOver = arc => g.selectAll(".chord").each( function(c) {
    const notRelated = arc.index!=c.source.index && arc.index!=c.target.index
    if (notRelated) 
      d3.select(this).classed("fade", true)  
  })
  const onMouseOut = _ => g.selectAll(".chord").classed("fade", false)

  g.selectAll(".arc")
   .on("mouseover", arc => onMouseOver(arc))
   .on("mouseout", _ => onMouseOut())
}
