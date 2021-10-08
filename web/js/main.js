/*==================================================================
    [ Some vars ]*/
var fieldCounter = 0;
const url_fields_list = [0];

(function ($) {
    "use strict";

    /*==================================================================
    [ Focus input ]*/
    $(".input100").each($.fn.hasValue = function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })
})(jQuery);


/*==================================================================
    [ Adding/deleting url fields ]*/

function createUrlField() {
    const last_element = url_fields_list[url_fields_list.length - 1]

    var elem1 = `<div id="row-url${last_element+1}" class="row fadeIn-animation">`;
    var elem2 =     `<div id="col-url${last_element+1}" class="col">`;
    var elem3 =         `<div id="input${last_element+1}" class="wrap-input100">`;
    var elem4 =             `<input id="url${last_element+1}" class="input100" type="url" required>`;
    var elem5 =             `<span id="placeholder-url${last_element+1}" class="focus-input100" data-placeholder="url"></span>`;
    var elem6 =         '</div>';
    var elem7 =     '</div>';
    var elem8 =     `<div id="close-btn-url${last_element+1}" class="col-1 del-url-btn-col">`
    var elem9 =         `<span class="fa fa-times del-url-btn" onclick=deleteURLField(${last_element+1})></span>`
    var elem10 =    '</div>'
    var elem11 ='</div>';

    $("#added-fields").append(elem1);
    $(`#row-url${last_element+1}`).append(elem2);
    $(`#col-url${last_element+1}`).append(elem3);
    $(`#input${last_element+1}`).append(elem4);
    $(`#input${last_element+1}`).append(elem5);
    $(`#input${last_element+1}`).append(elem6);
    $(`#col-url${last_element+1}`).append(elem7);
    $(`#row-url${last_element+1}`).append(elem8);
    $(`#close-btn-url${last_element+1}`).append(elem9);
    $(`#row-url${last_element+1}`).append(elem10);
    $('#added-fields').append(elem11);


    // execute a jQuery function to verify if field has something writen
    $('.input100').hasValue();

    fieldCounter++;

    url_fields_list[url_fields_list.length] = last_element + 1;
}

function deleteURLField(urlField) {
    $(`#row-url${urlField}`).remove();

    const index = url_fields_list.indexOf(urlField);
    if (index > -1) {
        url_fields_list.splice(index, 1);
    }

    fieldCounter--;
}

/*==================================================================
    [ restart form ]*/

eel.expose(restartForm);
function restartForm() {
    document.getElementById('status-bar').style.display = "none";
    document.getElementById('status-bar-fill').style.width = "5%";
    // while(fieldCounter >= 2) {
    //     $(`#input${fieldCounter}`).remove();
    //     fieldCounter--;
    // }
    for (let index = 0; index < url_fields_list.length; index++) {
        if(url_fields_list[index] > 0){
            $(`#row-url${url_fields_list[index]}`).remove();
        }
    }
    document.getElementById("url0").value = "";
}

/*==================================================================
    [ validate youtube url ]*/

function validateURLs() {
    var validURLs = 0;
    
    var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

    for (let index = 0; index < url_fields_list.length; index++) {
        url = document.getElementById(`url${url_fields_list[index]}`).value;
        if(url.match(p)){
            validURLs++;
        }
    }

    if(validURLs == url_fields_list.length) {
        document.getElementById('validation-warning').style.display = "none";
        sendURLsToPython()
    } else {
        document.getElementById('validation-warning').style.display = "block";
    }
}

/*==================================================================
    [ Sendding url's to python script ]*/

function sendURLsToPython() {
    const urls = [];
    var radio = "";

    if(document.getElementById('mp3-radio-btn').checked) {
        //audio radio button is checked
        radio = "mp3";
    }else if(document.getElementById('mp4-radio-btn').checked) {
        //audio + video radio button is checked
        radio = "mp4";
    }
    
    for (let index = 0; index < url_fields_list.length; index++) {
        urls[urls.length] = document.getElementById(`url${url_fields_list[index]}`).value;
    }
    
    document.getElementById('status-bar').style.display = "block";
    eel.convertURLs(urls, radio);
    
    scrollTo("status-bar")
}

/*==================================================================
    [ ProgressBar Functions ]*/

eel.expose(updateStatusBar);
function updateStatusBar(value) {
    document.getElementById('status-bar-fill').style.width = `${value}%`;
}

/*==================================================================
    [ others ]*/

function scrollTo(hash) {
    location.hash = "#" + hash;
}
