const about = $("#about");
const how = $("#htp");
const overview = $("#overview");
const play = $("#play");

$(document).ready(()=>{

  AOS.init({
    duration: 1200,
  })

  $(about).click(function() {
    $('html,body').animate({
        scrollTop: $("#aboutPart").offset().top},
        'slow');
  });

  $(how).click(function() {
    $('html,body').animate({
        scrollTop: $("#howto").offset().top},
        'slow');
  });

  $(overview).click(function() {
    $('html,body').animate({
        scrollTop: $("#aboutCards").offset().top},
        'slow');
  });

  $(play).click(function() {
    $('html,body').animate({
        scrollTop: $("#ready").offset().top},
        'slow');
  });

  const target = $("#info-cont");

  const horizontal = (event)=>{
    let y = event.originalEvent.deltaY;
    let x = event.originalEvent.deltaX;
    event.preventDefault();
    target[0].scrollLeft+=y*100;
  }

  $(target).on('wheel', horizontal);

});
