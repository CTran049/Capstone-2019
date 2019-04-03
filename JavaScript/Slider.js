/*
    Developed by: Ryan
    Date Developed: 2.13.19
*/

// Grabs the element that contains the images.
var divElm = document.getElementById("imageHolder");

// The array of the images inside of the divElm
var imageArray = divElm.getElementsByTagName("img");

// The currentImage.
var current = 0;

// The variable to store the auto feature.
var auto;

// Default settings and their values.
var setSettingArray = [
    ["Auto", false],
    ["ArrowColor", "White"],
    ["AutoTime", 3],
    ["Opacity", 1]
];

// When the script loads the following code is run.
init();

function init() {
    // Set all of the images except the first one to be hidden.
    for (var i = 0; i < imageArray.length; i++) {
        if (i > 0) {
            imageArray[i].style.display = "none";
        }
        imageArray[i].style.width = "100%";
    }
}

// Handles setting the setting.
function setSetting(key, value) {
    // Finds the key specified.
    var found = setSettingArray.find(function (va) {
        return key === va[0];
    });

    // If not found the following error is sent.
    if (!found) {
        console.error("The setting " + key + " was not found in the settings list!");
        return;
    }

    // Finds the index of the key.
    var index = findSettingIndex(key);
    // Sets the value of that key to the value specified.
    setSettingArray[index][1] = value;
    // Applies the changes.
    applySetting(key);
}

// Function to apply the changes.
function applySetting(key) {
    // Looks for the instructions for that specific settings key.
    switch (key) {
        case "ArrowColor":
            // Sets the color.
            document.getElementById('next').style.color = setSettingArray[findSettingIndex(key)][1];
            document.getElementById('prev').style.color = setSettingArray[findSettingIndex(key)][1];
            break;
        case "Auto":
            // Sets the auto.
            if (!setSettingArray[findSettingIndex(key)][1]) {
                clearInterval(auto);
            } else {
                auto = setInterval(nextButton, setSettingArray[findSettingIndex("AutoTime")][1] * 1000);
            }
            break;
        case "AutoTime":
            // Sets the time.
            if (auto != null) {
                clearInterval(auto);
                auto = setInterval(nextButton, (setSettingArray[findSettingIndex(key)][1] * 1000));
            }
            break;
        case "Opacity":
            // Sets the opacity.
            for (var i = 0; i < imageArray.length; i++) {
                imageArray[i].style.opacity = setSettingArray[findSettingIndex(key)][1];
            }
            break;
    }
}

// Finds the key index within the settings array list.
function findSettingIndex(key) {
    for (var i = 0; i < setSettingArray.length; i++) {
        if (setSettingArray[i][0] === key) {
            return i;
        }
    }
    return;
}

// Switches the image.
function nextButton() {
    imageArray[current].style.display = "none";
    setNext();
    imageArray[current].style.display = "block";
}

// Switches the image back one.
function previousButton() {
    imageArray[current].style.display = "none";
    setPrevious();
    imageArray[current].style.display = "block";
}

// Finds the next image to pull up.
function setNext() {
    if (current === (imageArray.length - 1)) {
        current = 0;
    } else {
        current++;
    }
}

// Finds the previous image to pull up.
function setPrevious() {
    (current === 0) ? current = (imageArray.length - 1): current--;
}