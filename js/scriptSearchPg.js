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

/*Function search*/
var word;
var jsonData;

fetch('dbcosmetic.json')
    .then(onResponseReady)
    .then(onJsonReady);

function onResponseReady(response) {
    return response.json();
}

function onJsonReady(json) {
    jsonData = json;
}
let suggestions = [];

const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");

let webLink;

// if user press any key and release
inputBox.onkeyup = (e)=>{
    if (suggestions.length == 0){
        for (const items of jsonData){
            console.log(items)
            suggestions.push(items.Name);
        }  
    }

    let userData = e.target.value; //data from user input
    word = userData;
    let emptyArray = [];
    if(userData){
        /*Click search button*/
        icon.onclick = ()=>{
            // webLink = `https://www.google.com/search?q=${userData}`;
            // linkTag.setAttribute("href", webLink);
            // linkTag.click();
            var results = document.getElementById('results');
            results.removeChild(results.childNodes[0])
            var newCourse = document.createTextNode('Result: ' + userData);
            results.appendChild(newCourse);
            console.log(results);

        }

        /*Create array to suggestion*/
        emptyArray = suggestions.filter((data)=>{
            //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });
        emptyArray = emptyArray.map((data)=>{
            // passing return data inside li tag
            return data = `<li>${data}</li>`;
        });
        searchWrapper.classList.add("active"); //show autocomplete box
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            //adding onclick attribute in all li tag
            allList[i].setAttribute("onclick", "select(this)");
        }
    }else{
        searchWrapper.classList.remove("active"); //hide autocomplete box
    }
    
}

function select(element){
    let selectData = element.textContent;
    inputBox.value = selectData;
    icon.onclick = ()=>{
        // webLink = `https://www.google.com/search?q=${selectData}`;
        // linkTag.setAttribute("href", webLink);
        // linkTag.click();
        var results = document.getElementById('results');
        results.removeChild(results.childNodes[0])
        var newCourse = document.createTextNode('Result: ' + selectData);
        results.appendChild(newCourse);
        console.log(results);
    }
    searchWrapper.classList.remove("active");
}

function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;
    }else{
      listData = list.join('');
    }
    suggBox.innerHTML = listData;
}

