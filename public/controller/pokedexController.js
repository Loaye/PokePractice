'use strict'
var app = app || {};

function(module) {
  const pokedexController = {};

  pokedexController.index = () => {
    app.'filler'.fetchall(app.'filler'.initIndexPage);
  }

  module.pokedexController = pokedexController
}
