'use strict';

const pokedexView = {};

pokedexView.handleGenFilter = function() {
  var firstGen;
  // firstGen = 1 - 151
  var secondGen;
  // secondGen = 152 - 251
  var thirdGen;
  // thirdGen = 252 - 386
  var fourthGen;
  // fourthGen = 387 - 493
  var fifthGen;
  // fifthGen = 494 - 649
  var sixthGen;
  // sixthGen = 650 - 721
  var seventhGen;
  // seventhGen = 722 - 802

  $('#gen-filter').on('change', function() {
    if($(this).val() === 'first-gen') {
      $('.dex-entry').hide();
      $(`.dex-entry[data-id="${firstGen}"]`).fadeIn();
    }
    if($(this).val() === 'second-gen'){
      $('.dex-entry').hide();
      $(`.dex-entry[data-id="${secondGen}"]`).fadeIn();
    }
    if($(this).val() === ''){
      $('.dex-entry').fadeIn();
    }
  })
}

pokedexView.handleTypeFilter = function() {
  $('#type-filter').on('change', function() {
    if($(this).val()) {
      $('.list-name').hide();
      $(`.list-name[data-type="${$(this).val()}"]`).fadeIn();
      $(`.list-name[data-secondtype="${$(this).val()}"]`).fadeIn();
    } else {
      $('.list-name').fadeIn();
    }
  });
}

pokedexView.handleClickEvent = function() {
  $('.list-name').click(function() {
    console.log('clicked: ', this);
    var selected = $(this[data-name].val());
    console.log(selected);
    $('.dex-entry').hide();
    $(`.dex-entry[data-name="${selected}"]`).fadeIn();
  })
}

pokedexView.initIndexPage = function() {
  Pokemon.all.forEach(function(pokemon) {
    $('#list ul').append(pokemon.listToHtml());
    $('#pokedex ul').append(pokemon.pokemonToHtml());
// 
//    $('.dex-entry').hide();
  });
}

$(document).ready(function () {
  pokedexView.handleGenFilter();
  pokedexView.handleTypeFilter();
  pokedexView.handleClickEvent();
})
