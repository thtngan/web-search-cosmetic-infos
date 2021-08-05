$(".c1").change(function() {
    closeTag('showTag1');
    var c1 = $('input[name="select"]:checked').val();
    console.log(c1);
    $('#showTag1').append(
        `<div class="tag">
            ${c1}
            <button type="button" class="btn-close" aria-label="Close" onclick="closeTag('showTag1')"></button>
        </div>`);
});
$(".c2").change(function() {
    closeTag('showTag2');
    var c2 = $('input[name="selectSkin"]:checked').val();
    $('#showTag2').append(
        `<div class="tag">
            ${c2}
            <button type="button" class="btn-close" aria-label="Close" onclick="closeTag('showTag2')"></button>
        </div>`);
});
$(".c3").change(function() {
    closeTag('showTag3');
    var c3 = $('input[name="selectSkinType"]:checked').val();
    $('#showTag3').append(
        `<div class="tag">
            ${c3}
            <button type="button" class="btn-close" aria-label="Close" onclick="closeTag('showTag3')"></button>
        </div>`);
});
$(".c4").change(function() {
    closeTag('showTag4');
    var c4 = $('input[name="selectOther"]:checked').val();
    $('#showTag4').append(
        `<div class="tag">
            ${c4}
            <button type="button" class="btn-close" aria-label="Close" onclick="closeTag('showTag4')"></button>
        </div>`);
});

function closeTag(tagID) {
    document.getElementById(tagID).innerHTML = '';
}