/*==================================================================
    [ Some vars ]*/

var fieldCounter = 0;
var last_url_number = null;
var url_fields_list = [0];
var last_element = 0;

/*==================================================================
    [ Focus input ]*/

(function ($) {
    "use strict";

    $(".input100").each($.fn.hasValue = function () {
        $(this).on('blur', function () {
            if ($(this).val().trim() != "") {
                $(this).addClass('has-val');
            } else {
                $(this).removeClass('has-val');
            }
        })
    })
})(jQuery);

/*==================================================================
    [ getting and setting title from youtube video when input lost focus]*/

function getUrlTitle(input_id) {
    var url_number = input_id.substr(input_id.length - 1);
    var url_value = $(`#url${url_number}`).val();

    if (url_value == "") {
        $(`#placeholder-url${url_number}`).attr("data-placeholder", "url");
    }

    last_url_number = url_number;

    eel.getUrlTitle(url_value);
}

eel.expose(setUrlTitle)

function setUrlTitle(title) {
    $(`#placeholder-url${last_url_number}`).attr("data-placeholder", title);
}

/*==================================================================
    [ Adding/deleting url fields ]*/

function createUrlField() {
    last_element = url_fields_list[url_fields_list.length - 1]

    //URL FIRLD + DELETE FIELD BUTTON --------------------------------------
    var elem1 = `<div id="row-url${last_element+1}" class="row fadeIn-animation">`;
    var elem2 = `<div id="col-url${last_element+1}" class="col">`;
    var elem3 = `<div id="input${last_element+1}" class="wrap-input100">`;
    var elem4 = `<input id="url${last_element+1}" class="input100" onfocusout="getUrlTitle(this.id)" type="url" required>`;
    var elem5 = `<span id="placeholder-url${last_element+1}" class="focus-input100" data-placeholder="url"></span>`;
    var elem6 = '</div>';
    var elem7 = '</div>';
    var elem8 = `<div id="close-btn-url${last_element+1}" title="Close this URL" class="col-1 del-url-btn-col" onclick=deleteURLField(${last_element+1})>`
    var elem9 = `<span class="fa fa-times del-url-btn"></span>`
    var elem10 = '</div>'
    var elem11 = '</div>';

    //RADIO BUTTONS --------------------------------------
    var elem12 = `<div id="radio-buttons-${last_element+1}" class="fadeIn-animation">`;
    var elem13 = `<label id="label-mp3-${last_element+1}" title=".mp3" for="mp3-option-${last_element+1}" class="l-radio">`;
    var elem14 = `<input type="radio" id="mp3-option-${last_element+1}" name="selector-${last_element+1}" tabindex="1" checked>`;
    var elem15 = `<span>audio</span>`;
    var elem16 = `</label>`;
    var elem17 = `<label id="label-mp4-${last_element+1}" title=".mp4" for="mp4-option-${last_element+1}" class="l-radio l-radio2">`;
    var elem18 = `<input type="radio" id="mp4-option-${last_element+1}" name="selector-${last_element+1}" tabindex="2">`;
    var elem19 = `<span>audio & video</span>`;
    var elem20 = `</label>`;
    var elem21 = `</div>`;

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
    $("#added-fields").append(elem12);
    $(`#radio-buttons-${last_element+1}`).append(elem13);
    $(`#label-mp3-${last_element+1}`).append(elem14);
    $(`#label-mp3-${last_element+1}`).append(elem15);
    $(`#radio-buttons-${last_element+1}`).append(elem16);
    $(`#radio-buttons-${last_element+1}`).append(elem17);
    $(`#label-mp4-${last_element+1}`).append(elem18);
    $(`#label-mp4-${last_element+1}`).append(elem19);
    $(`#radio-buttons-${last_element+1}`).append(elem20);
    $("#added-fields").append(elem21);

    // execute a jQuery function to verify if field has something writen
    $('.input100').hasValue();

    fieldCounter++;

    url_fields_list[url_fields_list.length] = last_element + 1;

    last_element++;
}

function deleteURLField(urlField) {
    $(`#row-url${urlField}`).remove();
    $(`#radio-buttons-${urlField}`).remove();

    var index = url_fields_list.indexOf(urlField);
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
        if (url_fields_list[index] > 0) {
            $(`#row-url${url_fields_list[index]}`).remove();
            $(`#radio-buttons-${url_fields_list[index]}`).remove();
        }
    }

    fieldCounter = 0;
    url_fields_list = [0];
    last_element = 0;

    $("#url0").val("");
    $(`#placeholder-url0`).attr("data-placeholder", "url");
    $("#start-download-btn").attr("disabled", false);
}

/*==================================================================
    [ validate youtube url ]*/

function validateURLs() {
    var validURLs = 0;

    var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

    for (let index = 0; index < url_fields_list.length; index++) {
        url = document.getElementById(`url${url_fields_list[index]}`).value;
        if (url.match(p)) {
            validURLs++;
        }
    }

    if (validURLs == url_fields_list.length) {
        document.getElementById('validation-warning').style.display = "none";
        sendURLsToPython()
    } else {
        document.getElementById('validation-warning').style.display = "block";
    }
}

/*==================================================================
    [ Sendding url's to python script ]*/

function sendURLsToPython() {
    var radio = "";

    for (let index = 0; index < url_fields_list.length; index++) {
        url = document.getElementById(`url${url_fields_list[index]}`).value;
        if (document.getElementById(`mp3-option-${url_fields_list[index]}`).checked) {
            //audio radio button is checked
            radio = "mp3";
        } else if (document.getElementById(`mp4-option-${url_fields_list[index]}`).checked) {
            //audio + video radio button is checked
            radio = "mp4";
        }
        eel.getUrlAndRadio(url, radio)
    }

    $("#start-download-btn").attr("disabled", true);
    document.getElementById('status-bar').style.display = "block";
    eel.convertURLs();

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