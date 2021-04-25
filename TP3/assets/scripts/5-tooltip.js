"use strict";

/**
 * Fichier permettant de définir le texte à afficher dans l'infobulle.
 */


/**
 * Obtient le texte associé à l'infobulle.
 *
 * @param d               Les données associées au cercle survollé par la souris.
 * @param formatNumber    Fonction permettant de formater correctement des nombres.
 * @return {string}       Le texte à afficher dans l'infobulle.
 */
function getToolTipText(d, formatNumber) {
  // TODO: Retourner le texte à afficher dans l'infobulle selon le format demandé.
  //       Assurez-vous d'utiliser la fonction "formatNumber" pour formater les nombres correctement.
  const end = "<br/>"
  const country_row = "Pays: " + d.name.bold() + end
  const life_expectancy_row = "Espérance de vie: " + formatNumber(d.lifeExpectancy).bold() + " ans" + end
  const income_row = "Revenu: " + formatNumber(d.income).bold() + " USD" + end
  const population_row = "Population: " + formatNumber(d.population).bold() + " habitans" + end
  const zone_row = "Zone du monde: " + d.zone.bold() + end
  const hoverBox = country_row + life_expectancy_row + income_row + population_row + zone_row
  return hoverBox
}
