/*==================================================================
    [ Some vars ]*/

var fieldCounter = 0;
// var last_titleUrl_number = null;
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
        document.getElementById(`url${url_number}-title`).style.display = "none";
        document.getElementById(`placeholder-url${url_number}`).style.display = "block";
    } else {
        // last_titleUrl_number = url_number;
        eel.getUrlTitle(url_value, url_number);
    }
}

eel.expose(setUrlTitle)

function setUrlTitle(title, url_number) {
    document.getElementById(`placeholder-url${url_number}`).style.display = "none";
    document.getElementById(`url${url_number}-title`).style.display = "block";
    document.getElementById(`url${url_number}-title`).value = title;
}

eel.expose(hideUrlTitle)

function hideUrlTitle(url_number) {
    document.getElementById(`url${url_number}-title`).style.display = "none";
    document.getElementById(`placeholder-url${url_number}`).style.display = "block";
}

/*==================================================================
    [ INSERTING VALIDATION ICON FOR THE CONVERTED URLS ]*/

eel.expose(setConvertionCompleteIcon)

function setConvertionCompleteIcon(url_number) {
    document.getElementById(`url${url_number}-status-icon`).style.display = "block";
}

/*==================================================================
    [ Adding/deleting url fields ]*/

function createUrlField() {
    last_element = url_fields_list[url_fields_list.length - 1]

    //URL FIELD BLOCK --------------------------------------
    var elem0 = `<div id="field-block-url${last_element+1}">`
    var elem1 = `<div id="row-url${last_element+1}" class="row">`;
    var elem2 = `<div id="col-url${last_element+1}" class="col">`;
    var elem3 = `<div id="input${last_element+1}" class="wrap-input100">`;
    var elem4 = `<div id="url${last_element+1}-title-block" class="row">`
    var elem5 = `<div id="col-title-url${last_element+1}" class="col">`
    var elem6 = `<input id="url${last_element+1}-title" class="url-title" style="display: none;" readonly="readonly" value="">`
    var elem7 = `</div>`
    var elem8 = `<div id="col-status-url${last_element+1}" class="col-1 url-convertion-status">`
    var elem9 = `<span id="url${last_element+1}-status-icon" class="fa fa-check" style="display: none;"></span>`
    var elem10 = `</div>`
    var elem11 = `</div>`
    var elem12 = `<input id="url${last_element+1}" class="input100" onfocusout="getUrlTitle(this.id)" type="url" required>`;
    var elem13 = `<span id="placeholder-url${last_element+1}" class="focus-input100" data-placeholder="url" style="display: block;"></span>`;
    var elem14 = `</div>`;
    var elem15 = `</div>`;
    var elem16 = `<div id="close-btn-url${last_element+1}" title="Close this URL" class="col-1 del-url-btn-col" onclick=deleteURLField(${last_element+1})>`
    var elem17 = `<span class="fa fa-times del-url-btn"></span>`
    var elem18 = `</div>`
    var elem19 = `</div>`;
    var elem20 = `<div id="radio-buttons-${last_element+1}">`;
    var elem21 = `<label id="label-mp3-${last_element+1}" title=".mp3" for="mp3-option-${last_element+1}" class="l-radio">`;
    var elem22 = `<input type="radio" id="mp3-option-${last_element+1}" name="selector-${last_element+1}" tabindex="1" checked>`;
    var elem23 = `<span>audio</span>`;
    var elem24 = `</label>`;
    var elem25 = `<label id="label-mp4-${last_element+1}" title=".mp4" for="mp4-option-${last_element+1}" class="l-radio l-radio2">`;
    var elem26 = `<input type="radio" id="mp4-option-${last_element+1}" name="selector-${last_element+1}" tabindex="2">`;
    var elem27 = `<span>audio & video</span>`;
    var elem28 = `</label>`;
    var elem29 = `</div>`;
    var elem30 = `</div>`

    $(`#added-fields`).append(elem0);
    $(`#field-block-url${last_element+1}`).append(elem1);
    $(`#row-url${last_element+1}`).append(elem2);
    $(`#col-url${last_element+1}`).append(elem3);
    $(`#input${last_element+1}`).append(elem4);
    $(`#url${last_element+1}-title-block`).append(elem5);
    $(`#col-title-url${last_element+1}`).append(elem6);
    $(`#url${last_element+1}-title-block`).append(elem7);
    $(`#url${last_element+1}-title-block`).append(elem8);
    $(`#col-status-url${last_element+1}`).append(elem9);
    $(`#url${last_element+1}-title-block`).append(elem10);
    $(`#input${last_element+1}`).append(elem11);
    $(`#input${last_element+1}`).append(elem12);
    $(`#input${last_element+1}`).append(elem13);
    $(`#col-url${last_element+1}`).append(elem14);
    $(`#row-url${last_element+1}`).append(elem15);
    $(`#row-url${last_element+1}`).append(elem16);
    $(`#close-btn-url${last_element+1}`).append(elem17);
    $(`#row-url${last_element+1}`).append(elem18);
    $(`#field-block-url${last_element+1}`).append(elem19);
    $(`#field-block-url${last_element+1}`).append(elem20);
    $(`#radio-buttons-${last_element+1}`).append(elem21);
    $(`#label-mp3-${last_element+1}`).append(elem22);
    $(`#label-mp3-${last_element+1}`).append(elem23);
    $(`#radio-buttons-${last_element+1}`).append(elem24);
    $(`#radio-buttons-${last_element+1}`).append(elem25);
    $(`#label-mp4-${last_element+1}`).append(elem26);
    $(`#label-mp4-${last_element+1}`).append(elem27);
    $(`#radio-buttons-${last_element+1}`).append(elem28);
    $(`#field-block-url${last_element+1}`).append(elem29);
    $(`#added-fields`).append(elem30);

    // execute a jQuery function to verify if field has something writen
    $('.input100').hasValue();

    fieldCounter++;

    url_fields_list[url_fields_list.length] = last_element + 1;

    last_element++;
}

function deleteURLField(urlField_number) {
    $(`#field-block-url${urlField_number}`).remove();

    var index = url_fields_list.indexOf(urlField_number);
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

    for (let index = 0; index < url_fields_list.length; index++) {
        if (url_fields_list[index] > 0) {
            $(`#field-block-url${index}`).remove();
        }
    }

    fieldCounter = 0;
    url_fields_list = [0];
    last_element = 0;

    document.getElementById(`url0-status-icon`).style.display = "none";
    document.getElementById(`url0-title`).style.display = "none";
    document.getElementById(`placeholder-url0`).style.display = "block";
    $(`#url0`).val("");

    // remove focus from input fields
    $(function () {
        $('input').blur();
    });

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
        eel.getUrlFieldInfo(url, radio, url_fields_list[index])
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
    [ BEHAVIORS ]*/

function scrollTo(hash) {
    location.hash = "#" + hash;
}