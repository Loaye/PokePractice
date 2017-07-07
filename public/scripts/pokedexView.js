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

pokedexView.handleBtn = function() {
  $('#choose').on('click', function() {
    console.log('Selected Gen: ' + $('#gen-filter').val() + ', Selected Type: ' + $('#type-filter').val());

  if($('#gen-filter').val() && $('#type-filter').val()){
    $('.list-name').hide();
    $(`.list-name[data-gen="${$('#gen-filter').val()}"][data-type="${$('#type-filter').val()}"]`).fadeIn();
    $(`.list-name[data-gen="${$('#gen-filter').val()}"][data-secondType="${$('#type-filter').val()}"]`).fadeIn();
  } else if($('#type-filter').val()){
    $('.list-name').hide();
    $(`.list-name[data-type="${$('#type-filter').val()}"]`).fadeIn();
  } else if($('#gen-filter').val()){
    $('.list-name').hide();
    $(`.list-name[data-gen="${$('#gen-filter').val()}"]`).fadeIn();
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
  console.log('document ready');;
  pokedexView.handleBtn();
  pokedexView.handleClick();
})
