'use strict';

function Pokemon(data){
  this.id = data.id;
  this.name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
  this.sprite = data.sprites.front_default;

// Placeholder description text for Pokemon.
  this.desc = 'Description text goes here.'

// Pokemon's generation, for filtering.
  if(this.id < 152)
    this.gen = 'first-gen';
  if(this.id > 151 && this.id < 252)
    this.gen = 'second-gen';
  if(this.id > 251 && this.id < 387)
    this.gen = 'third-gen';
  if(this.id > 386 && this.id < 494)
    this.gen = 'fourth-gen';
  if(this.id > 493 && this.id < 650)
    this.gen = 'fifth-gen';
  if(this.id > 649 && this.id < 722)
    this.gen = 'sixth-gen';
  if(this.id > 721 && this.id < 803)
    this.gen = 'seventh-gen';

// Pokemon's type. If a Pokemon is not dual type, secondType is 'blank'.
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
Pokemon.all = [];

var loadPokedex = function(pokedex){
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
  if(localStorage.rawData) {
    pokedex = JSON.parse(localStorage.rawData);
    console.log('loaded pokedex: ', pokedex);
    loadPokedex(pokedex);
  } else {
    $.ajax({
      url: 'https://pokeapi.co/api/v2/pokemon/',
      type: 'GET',
      datatype: 'jsonp',
      success: function(data) {
        for(var i in data.results) {
          $.getJSON(data.results[i].url)
          .then(function(data){
            console.log('id: ', data.id, ' name: ', data.name);
            pokedex.push(data);
          })
          };
        },
      error: function(err) {
        console.error('err: ', err);
      }
    });
  }
}
