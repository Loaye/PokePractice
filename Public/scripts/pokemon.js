'use strict';

function Pokemon(data){
  this.id = data.id;
  this.name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
  this.sprite = data.sprites.front_default;

// Pokemon's type. If a Pokemon is not dual type, secondType is an empty string.
  this.type = data.types[0].type.name;
  if(data.types.length > 1) {
    this.secondType = data.types[1].type.name;
  } else {
    this.secondType = '';
  }

// Pokemon's base stats
  this.speed = data.stats[0].base_stat;
  this.spDef = data.stats[1].base_stat;
  this.spAtk = data.stats[2].base_stat;
  this.def = data.stats[3].base_stat;
  this.atk = data.stats[4].base_stat;
  this.hp = data.stats[5].base_stat;

}

var pokedex = [];
Pokemon.all = [];
var pokeUrl = 'https://pokeapi.co/api/v2/';

var loadPokedex = function(pokedex){
  Pokemon.all = pokedex.map(function(data, idx, arr) {
    console.log('ID: ', data.id, ' Name: ', data.name);
    return new Pokemon(data);
  });
  pokedexView.initIndexPage();
}

Pokemon.prototype.listToHtml = function() {
  let template = Handlebars.compile($('#list-template').text());
  return template(this);
}

Pokemon.prototype.pokemonToHtml = function() {
  let template = Handlebars.compile($('#pokemon-template').text());
  return template(this);
}

Pokemon.fetchAll = function() {
  if(localStorage.rawData) {
    pokedex = JSON.parse(localStorage.rawData);
    pokedexView.initIndexPage();
  } else {
    $.ajax({
      url: pokeUrl + 'pokemon/?limit=5',
      type: 'GET',
      success: function(data) {
        for(var idx in data.results) {
          $.getJSON(data.results[idx].url)
          .then(function(data){
            console.log('data: ', data);
            pokedex.push(data);
          })
        }
      },
      error: function(err) {
        console.err('err: ', err);
      }
    }).then(function(){
        function savePokemonData(pokedex){
          localStorage.rawData = JSON.stringify(pokedex);
          console.log('localStorage: ', localStorage.rawData);
        }
      })
    }
}
