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
    $('.list-name').hide();

    if($('#gen-filter').val() && $('#type-filter').val()){
      $(`.list-name[data-gen="${$('#gen-filter').val()}"][data-type="${$('#type-filter').val()}"]`).fadeIn();
      $(`.list-name[data-gen="${$('#gen-filter').val()}"][data-secondType="${$('#type-filter').val()}"]`).fadeIn();
    } else if($('#type-filter').val()){
      $(`.list-name[data-type="${$('#type-filter').val()}"]`).fadeIn();
    } else if($('#gen-filter').val()){
      $(`.list-name[data-gen="${$('#gen-filter').val()}"]`).fadeIn();
    } else {
      $('.list-name').fadeIn();
    }
  });
};

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
};

pokedexView.handleClick = function() {
  $('#list').on('click', '.list-name', function(){
    var idx = $(this).attr('data-id');
    $('.dex-entry').hide();
    if($(`desc${idx}`).text('')) {
      $.getJSON(`https://pokeapi.co/api/v2/pokemon-species/${idx}`)
      .then(function(data){
        var flavor = data.flavor_text_entries[1].flavor_text;
        $(`#desc${idx}`).text(flavor);
      });
    }
    $(`.dex-entry[data-id="${$(this).attr('data-id')}"]`).fadeIn();
  });
};

pokedexView.initIndexPage = function() {
  Pokemon.all.forEach(function(pokemon) {
    $('#list ul').append(pokemon.listToHtml());
    $('#pokedex ul').append(pokemon.pokemonToHtml());
    $('.dex-entry').hide();
  });
};

$(document).ready(function () {
  pokedexView.handleBtn();
  pokedexView.handleClick();
});
