$(".cross").hide();
$(".menu").hide();
$(".hamburger").click(function() {
  $(".menu").slideToggle("slow", function() {
    $(".hamburger").hide();
    $(".cross").show();
  });
});

$(".cross").click(function() {
  $(".menu").slideToggle("slow", function() {
    $(".cross").hide();
    $(".hamburger").show();
  });
});

$(document).ready(function() {
  $('.clicktopin').click(function() {
    $('.sidebar').toggleClass('sidebarpin');
    $('.label').toggleClass('labelpin');
  });
});
