var one = Number($('#one').text());
var two = Number($('#two').text());
var three = Number($('#three').text());
var four = Number($('#four').text());
var five = Number($('#five').text());
var total = one + two + three + four + five;
var avg = one/total + 2*two/total + 3*three/total + 4*four/total + 5*five/total;
$(document).ready(function() {
    $('#total').html(total);
    $('.rating-num').html(avg.toFixed(1));
  $('.bar span').hide();
  $('#bar-five').animate({
     width: five/total*100 + '%'}, 1000);
  $('#bar-four').animate({
     width: four/total*100 + '%'}, 1000);
  $('#bar-three').animate({
     width: three/total*100 + '%'}, 1000);
  $('#bar-two').animate({
     width: two/total*100 + '%'}, 1000);
  $('#bar-one').animate({
     width: (one/total*100) + '%'}, 1000);
  
  setTimeout(function() {
    $('.bar span').fadeIn('slow');
  }, 1000);
  
});
(function() {
   'use strict';
   window.addEventListener('load', function() {
     // Get the forms we want to add validation styles to
     var forms = document.getElementsByClassName('needs-validation');
     // Loop over them and prevent submission
     var validation = Array.prototype.filter.call(forms, function(form) {
       form.addEventListener('submit', function(event) {
         if (form.checkValidity() === false) {
           event.preventDefault();
           event.stopPropagation();
         }
         form.classList.add('was-validated');
       }, false);
     });
   }, false);
 })();
 $(".nav .nav-link").on("click", function(){
   $(".nav").find(".active").removeClass("active");
   $(this).addClass("active");
 });