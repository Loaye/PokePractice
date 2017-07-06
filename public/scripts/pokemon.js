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
    this.secondType = 'blank';
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
var desc = [];
Pokemon.all = [];

var loadPokedex = function(pokedex){
  if(!localStorage.rawData) {
     localStorage.rawData = JSON.stringify(pokedex);
     console.log('localStorage: ', localStorage.rawData.length);
  }

  Pokemon.all = pokedex.map(function(data, idx, arr) {
  return new Pokemon(data);
  });

  Pokemon.all.sort(function(poke1, poke2) {
    return poke1.id - poke2.id;
  })

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
  var pokeUrl = 'https://pokeapi.co/api/v2/';
  if(localStorage.rawData) {
    pokedex = JSON.parse(localStorage.rawData);
    console.log('loaded pokedex: ', pokedex);
    pokedexView.initIndexPage();
  } else {
    // $.ajax({
    //   url: pokeUrl + 'pokemon/?limit=10',
    //   type: 'GET',
    //   success: function(data) {
        for(var i = 1;i < 30; i++) {
          $.getJSON(pokeUrl + 'pokemon/' + i)
          .then(function(data){
            console.log('data: ', data);
            pokedex.push(data);
          });
        }
  //     },
  //     error: function(err) {
  //       console.err('err: ', err);
  //     }
  //   })
  // }
  }
}
