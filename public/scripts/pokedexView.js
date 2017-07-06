'use strict';

const pokedexView = {};

pokedexView.handleGenFilter = function() {
  $('#gen-filter').on('change', function() {
    if($(this).val()) {
      $('.list-name').hide();
      $(`.list-name[data-gen="${$(this).val()}"]`).fadeIn();
    } else {
      $('.list-name').fadeIn();
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

pokedexView.handleClick = function() {
  $('#list').on('click', '.list-name', function(){
    $('.dex-entry').hide();
    $(`.dex-entry[data-id="${$(this).attr('data-id')}"]`).fadeIn();
  })
}

pokedexView.initIndexPage = function() {
  Pokemon.all.forEach(function(pokemon) {
    $('#list ul').append(pokemon.listToHtml());
    $('#pokedex ul').append(pokemon.pokemonToHtml());
    $('.dex-entry').hide();
  });
}

$(document).ready(function () {
  console.log('document ready');
  pokedexView.handleGenFilter();
  pokedexView.handleTypeFilter();
  pokedexView.handleClick();
})
