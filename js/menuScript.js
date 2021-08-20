 // function openNav() {
    //   document.getElementById("mySidebar").style.width = "252px";
    //   document.getElementById("main").style.marginLeft = "240px";
    //   $('.sidebar a span').css({ "display": "inline-block" });
    //   $('.sidebar h2').css({ "display": "block" });
    //   $('.media').css({'display':'block'});
    // }

    // function closeNav() {
    //   document.getElementById("mySidebar").style.width = "92px";
    //   document.getElementById("main").style.marginLeft = "80px";
    //   $('.sidebar a span').css({ "display": "none" });
    //   $('.media').css({'display':'none'});
    //   $('.sidebar h2').css({ "display": "none" });
    // }
    // $(document).ready(function(){
      
    // });
    document.getElementById('action').onclick = function (e) {
    if (this.checked) {
      document.getElementById("mySidebar").style.width = "252px";
      $('#main, footer').css({ "marginLeft": "240px" });
      $('.sidebar a span').css({ "display": "inline-block" });
      $('.sidebar h2').css({ "display": "block" });
      $('.media').css({ 'display': 'block' });
    }
    else {
      document.getElementById("mySidebar").style.width = "92px";
      $('#main, footer').css({ "marginLeft": "80px" });
      $('.sidebar a span').css({ "display": "none" });
      $('.media').css({ 'display': 'none' });
      $('.sidebar h2').css({ "display": "none" });
    }
  };


    
    // $(window).resize(function(){
    //   var windowWidth = $(window).width();
    //   var imgSrc = $('#image');
    //   console.log(windowWidth);
    //   if(windowWidth > 600){			
    //     document.getElementById('action').onclick = function (e) {
    //       if (this.checked) {
    //         document.getElementById("mySidebar").style.width = "252px";
    //         $('#main, footer').css({ "marginLeft": "240px" });
    //         $('.sidebar a span').css({ "display": "inline-block" });
    //         $('.sidebar h2').css({ "display": "block" });
    //         $('.media').css({ 'display': 'block' });
    //       }
    //       else {
    //         document.getElementById("mySidebar").style.width = "92px";
    //         $('#main, footer').css({ "marginLeft": "80px" });
    //         $('.sidebar a span').css({ "display": "none" });
    //         $('.media').css({ 'display': 'none' });
    //         $('.sidebar h2').css({ "display": "none" });
    //       }
    //     };
    //   }
    //   else if(windowWidth <= 600){
    //     document.getElementById('action').onclick = function (e) {
    //       if (this.checked) {
    //         document.getElementById("mySidebar").style.width = "92px";
    //         $('#main, footer').css({ "marginLeft": "80px" });
    //         $('.sidebar a span').css({ "display": "inline-block" });
    //         $('.sidebar h2').css({ "display": "block" });
    //         $('.media').css({ 'display': 'block' });
    //       }
    //       else {
    //         document.getElementById("mySidebar").style.width = "0px";
    //         $('#main, footer').css({ "marginLeft": "0px" });
    //         $('.sidebar a span').css({ "display": "none" });
    //         $('.media').css({ 'display': 'none' });
    //         $('.sidebar h2').css({ "display": "none" });
    //       }
    //     };
    //   }
    // });