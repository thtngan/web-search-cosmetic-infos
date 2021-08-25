var listmenu = document.getElementById('list');
listmenu.onscroll = function () { scrollFunction() };
function scrollFunction() {
  console.log(listmenu.scrollTop);
  if (listmenu.scrollTop > 10) {
    document.getElementById('preBtn').style.display = "block";
  } else {
    document.getElementById('preBtn').style.display = "none";
  }
}
document.getElementById('preBtn').addEventListener("click", function () {
  listmenu.scrollTop -= 100;
});
document.getElementById('nextBtn').addEventListener("click", function () {
  listmenu.scrollTop += 100;
});
$.event.special.widthChanged = {
  remove: function () {
    $(this).children('iframe.width-changed').remove();
  },
  add: function () {
    var elm = $(this);
    var iframe = elm.children('iframe.width-changed');
    if (!iframe.length) {
      iframe = $('<iframe/>').addClass('width-changed').prependTo(this);
    }
    var oldWidth = elm.width();
    function elmResized() {
      var width = elm.width();
      if (oldWidth != width) {
        elm.trigger('widthChanged', [width, oldWidth]);
        oldWidth = width;
      }
    }

    var timer = 0;
    var ielm = iframe[0];
    (ielm.contentWindow || ielm).onresize = function () {
      clearTimeout(timer);
      timer = setTimeout(elmResized, 20);
    };
  }
}

$('.horizontal-scroll-wrapper').css({ "maxHeight": $('#myDiv').width() });
$('#myDiv').on('widthChanged', function () {
  // console.log($(this).width());
  $('.horizontal-scroll-wrapper').css({ "maxHeight": $(this).width() });
  // console.log($('.horizontal-scroll-wrapper').height());
});

//Search script
$('#searchbar').autocomplete({
  source: function(req, res){
    $.ajax({
      url:"autocompleteIndex",
      dataType: "json",
      type: "GET",
      data: req, 
      success: function(data){
        // console.log(data);
        
        res(data);
        // res($.map(data, function(item) {
        //   return {
        //     value: item.Name,
        //     avatar: item.picture
        //   };
        // }))
      },
      err: function(err){
        console.log(err.status);
      }
    });
  },
  // The minimum number of characters a user must type before a search is performed.
  minLength: 1,
  focus: function(event, ui) {
    this.value = ui.item.label,
    event.preventDefault();
  },
  select: function(event, ui){
    //window.location.href = 'Search.aspx?q=' + ui.item.value;;
    window.location.href = 'info/' + ui.item.value;
  }
  
}).data( "ui-autocomplete" )._renderItem = function( ul, item ) {
  if (item.picture == null){
    var inner_html = '<h4><b>' + item.label + '</b></h4>';
  }
  else{
    var inner_html = '<div class="list_item_container"><div class="imageSearch"><img src="' + item.picture + '" ></div><div class="labelSearch"><h4><b>' + item.label + '</b></h4></div></div>';
  }
    return $( "<li></li>" )
          .data( "item.autocomplete", item )
          .append(inner_html)
          .appendTo( ul );  
};
