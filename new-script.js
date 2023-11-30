//declaring global arrays

//local array to store all players' information 
var playerRegistrationData = [];
let playerRegistrationDataAsString;

//session storage for the player in the game at the moment
var currentPlayer = [];
let currentPlayerAsString;

//variables for the play game & check answer functions
var random1;
var random2;
var product;

//variables for the numOfCheckClicks function
let clickCounter = 0;
var checkButton;

//variables for counting the number of times a player got a question correct and incorrect
let correctCounter = 0;
let incorrectCounter = 0;


//to calculate genders & ages
let femaleCounter = 0;
let maleCounter = 0;
let genderCounter = 0;

let allAgeCounter = 0;
let age8Counter = 0;
let age9Counter = 0;
let age10Counter = 0;
let age11Counter = 0;
let age12Counter = 0;


// Function to register a player
function register() {
    // Step 1: Accept all entries into the form
    var firstName = document.getElementById("firstname").value;
    var lastName = document.getElementById("lastname").value;
    var dob = document.getElementById("dob").value;
    var email = document.getElementById("email").value;
    var gender = document.querySelector('input[name="gender"]:checked');
    var ageInput = document.getElementById("age");

    // Step 2: Validate the entries
    // Check for null fields
    if (!firstName || !lastName || !dob || !gender || !email) {
        alert("All fields are required");
        return;
    }

    // Validate first name and last name lengths
    if (firstName.length < 3 || lastName.length < 3) {
        alert("First name and last name must be at least 3 characters long");
        return;
    }

    // Validate age
    var currentDate = new Date();
    var birthDate = new Date(dob);
    var age = currentDate.getFullYear() - birthDate.getFullYear();
    if (age < 8 || age > 12) {
        alert("Age must be between 8 and 12 to register");
        return;
    }

    // Validate gender
    if (!gender) {
        alert("Please select a gender");
        return;
    }

    // Validate email using pattern (hardcoded for @gmail.com)
    var emailPattern = /@gmail\.com$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid Gmail email address");
        return;
    }

    // append to the session storage array
    currentPlayer.push(firstName);
    currentPlayer.push(lastName);
    currentPlayer.push(dob);
    currentPlayer.push(age);
    currentPlayer.push(gender.value);
    currentPlayer.push(email);

    currentPlayerAsString = JSON.stringify(currentPlayer);

    sessionStorage.setItem("currentPlayer", currentPlayerAsString);

    // Step 4: Disable all fields and buttons after registration
    disableForm();

    // Step 5: Enable two other buttons (adjust function calls based on your actual buttons)
    enableButtons();

    // Display a success message (you can modify this part based on your needs)
    alert("Registration successful! Press [Start] to play.");

    // Optionally, you can log the player data to the console
    console.log(currentPlayerAsString);
}


function disableForm() {
    var formElements = document.getElementById("regForm").elements;

    // Disable all form elements
    for (var i = 0; i < formElements.length; i++) {
        formElements[i].disabled = true;
    }

    // Disable the Register button
    document.getElementById("registerBtn").disabled = true;
}


// Function to enable two other buttons (modify this function when actual buttons are put in)
function enableButtons() {
    // Enable the first additional button: start
    document.getElementById("start").disabled = false;

    // Enable the second additional button: end
    document.getElementById("end").disabled = false;

    //enable check answer button
    document.getElementById("checkAnsBtn").disabled = false;

    //enable next equation button
    document.getElementById("nextEqBtn").disabled = false;
    return;
}


//playGame()

function playGame() {
    document.getElementById('yourAnswer').value = '';
    document.getElementById('ans').innerHTML = '';

    random1 = Math.floor(Math.random() * 9 + 1);
    random2 = Math.floor(Math.random() * 5 + 1);

    document.getElementById("firstNumber").value = random1;
    document.getElementById("secondNumber").value = random2;

    product = random1 * random2;
    return;
}


//checkAnswer()

function checkAnswer() {
    numOfCheckClicks();

    var userAnswer = document.getElementById("yourAnswer").value;

    if (parseInt(userAnswer) === product) {
        document.getElementById("ans").innerHTML = "Correct ★ You're a star!";
        correctCounter++;
    } else {
        document.getElementById("ans").innerHTML = "Incorrect ✘. Don't worry, try again!";
        incorrectCounter++;
    }
    return;
}


//findPercentageScore()

function findPercentageScore() {
    disableplayAreaFormAndButtons();

    enableRegForm();

    //enableResultsForm();

    currentDateTime();

    printCurrentPlayerInfo();

    document.getElementById('showPercentage').innerHTML = '';

    //calculate the percentage score of the user 
    let percentageScore = (correctCounter/clickCounter) * 100;

    //get the textarea element by its ID
    let percentageScoreTextArea = document.getElementById("showPercentage");

    //set the value of the textarea to display the percentage score
    percentageScoreTextArea.value = percentageScore.toFixed(2) + "%";

    showAllStats();

    // Set up an interval to execute the function every 5 seconds
    setInterval(femalePlayerPercent, 5000);
    femalePlayerPercent();

    // Set up an interval to execute the function every 5 seconds
    setInterval(malePlayerPercent, 5000);
    malePlayerPercent();

    // Set up an interval to execute the function every 5 seconds
    setInterval(agePercents, 5000);
    agePercents();
}

//function to print current player array elements to the textarea
function printCurrentPlayerInfo() {
    // append to the session storage array
    currentPlayer.push(clickCounter);
    currentPlayer.push(correctCounter);
    currentPlayer.push(incorrectCounter);

    currentPlayerAsString = JSON.stringify(currentPlayer);

    sessionStorage.setItem("currentPlayer", currentPlayerAsString);

    //retrieve the session storage array: currentPlayer
    currentPlayerAsString = sessionStorage.getItem("currentPlayer");

    //check if the array is actually in session storage
    if(currentPlayerAsString) {
        //parse the array string into a javascript array
        currentPlayer = JSON.parse(currentPlayerAsString);

        //get the textarea element by its ID
        let currentPlayerTextArea = document.getElementById("yourStatsArea");

        //set the value of the textarea to display the current player array
        currentPlayerTextArea.value = currentPlayer.join(", ");
    } else {
        console.log("Session storage for current player not found.");
    }
}

//function to disable the play area form (called in findPercentageScore)
function disableplayAreaFormAndButtons() {
    var formElements = document.getElementById("playAreaForm").elements;

    // Disable all form elements
    for (var i = 0; i < formElements.length; i++) {
        formElements[i].disabled = true;
    }

    document.getElementById("start").disabled = true;

    document.getElementById("checkAnsBtn").disabled = true;

    document.getElementById("nextEqBtn").disabled = true;
}

//function to enable the registration form (called in findPercentageScore)

function enableRegForm() {
    var formElements = document.getElementById("regForm").elements;

    // Disable all form elements
    for (var i = 0; i < formElements.length; i++) {
        formElements[i].disabled = false;
    }
}


//function to enable the statistics form (called in findPercentScore)
/*function enableResultsForm() {
    var formElements = document.getElementById("results").elements;

    // Enable all form elements
    for (var i = 0; i < formElements.length; i++) {
        formElements[i].disabled = false;
    }
}*/


//function to count the number of times check answer is clicked let clickCounter = 0; var checkButton;
function numOfCheckClicks() {
    checkButton = document.getElementById("checkAnsBtn");

    checkButton.addEventListener("click", function() {
        clickCounter++;
    });
}


//function to print the locale date and time for the user
function currentDateTime() {
    //create new object
    let currentDate = new Date();

    //get the current date as string
    let currentDateTimeString = currentDate.toLocaleString();

    //get the html h4 tag by its id then set the value to the current date and time
    let userDateTime = document.getElementById("dateTimeArea");

    userDateTime.value = currentDateTimeString;

    //show the date and time using inner html
    userDateTime.innerHTML = currentDateTimeString;

    //log the current date and time to the console
    console.log(currentDateTimeString);
}


//function to append session storage currentPlayer to local storage playerRegistrationData
function appendSessionStorage() {
    //retrieve both arrays from session and local storage
    currentPlayerAsString = sessionStorage.getItem("currentPlayer");

    //check if the session array actually exist in session and local storage
    if (currentPlayerAsString) {
        //parse array into javascript arrays
        currentPlayer = JSON.parse(currentPlayerAsString);

        //retrieve the local storage array
        playerRegistrationDataAsString = localStorage.getItem("playerRegistrationData");

        //check if the local array actually exists in local storage
        playerRegistrationData = playerRegistrationDataAsString ? JSON.parse(playerRegistrationDataAsString) : [];

        //append elements of session to local
        playerRegistrationData = playerRegistrationData.concat(currentPlayer);

        //store the updated array in local storage
        localStorage.setItem("playerRegistrationData", JSON.stringify(playerRegistrationData));

        console.log("Arrays appended and updated successfully.");
    } else {
        console.log("Arrays not found.");
    }
}


//function to show all the statistics of the players (called in findPercentageScore function)
function showAllStats() {
    appendSessionStorage();

    document.getElementById('showAllPlayers').innerHTML = '';

    //retrieve the local storage array
    playerRegistrationDataAsString = localStorage.getItem("playerRegistrationData");

    //check if the array is in local storage
    if (playerRegistrationDataAsString) {
        //parse the array string into a javascript array
        playerRegistrationData = JSON.parse(playerRegistrationDataAsString);

        //generate html table rows with 9 elements per row
        let tableBody = document.getElementById("showAllPlayers");

        for (let i = 0; i < playerRegistrationData.length; i+= 9) {
            let row = document.createElement("tr");

            for (let j = i; j < i + 9 && j < playerRegistrationData.length; j++) {
                let cell = document.createElement("td");
                cell.innerHTML = playerRegistrationData[j];
                row.appendChild(cell);
            }

            tableBody.appendChild(row);
        }

        console.log("Table populated sucessfully");
    } else {
        console.log("Array not found.");
    }
}


//function to count the number of female players

function countFemalePlayers() {
    appendSessionStorage();

    //retrieve the local storage array
    playerRegistrationDataAsString = localStorage.getItem("playerRegistrationData");

    //check if the array is in local storage
    if (playerRegistrationDataAsString) {
        //parse the array string into a javascript array
        playerRegistrationData = JSON.parse(playerRegistrationDataAsString);

        //count the number of female players
        for (let i = 0; i < playerRegistrationData.length; i++) {
            if (playerRegistrationData[i] === "female") {
                femaleCounter+=1;
            }
        }

        console.log(femaleCounter);
    } else {
        console.log("Array not found.");
    }
}

//function to count the number of male players

function countMalePlayers() {
    appendSessionStorage();

    //retrieve the local storage array
    playerRegistrationDataAsString = localStorage.getItem("playerRegistrationData");

    //check if the array is in local storage
    if (playerRegistrationDataAsString) {
        //parse the array string into a javascript array
        playerRegistrationData = JSON.parse(playerRegistrationDataAsString);

        //count the number of male players
        for (let i = 0; i < playerRegistrationData.length; i++) {
            if (playerRegistrationData[i] === "male") {
                maleCounter+=1;
            }
        }

        console.log(maleCounter);
    } else {
        console.log("Array not found.");
    }
}

//function to count all gender players

function countGenderPlayers() {
    appendSessionStorage();

    //retrieve the local storage array
    playerRegistrationDataAsString = localStorage.getItem("playerRegistrationData");

    //check if the array is in local storage
    if (playerRegistrationDataAsString) {
        //parse the array string into a javascript array
        playerRegistrationData = JSON.parse(playerRegistrationDataAsString);

        //count the number of male and female players
        for (let i = 0; i < playerRegistrationData.length; i++) {
            if (playerRegistrationData[i] === "male" || playerRegistrationData[i] === "female") {
                genderCounter+=1;
            }
        }

        console.log(genderCounter);
    } else {
        console.log("Array not found.");
    }
}

//functions to calculate female and male player percentage
function femalePlayerPercent() {
    countFemalePlayers();
    countGenderPlayers();

    let femalePercent = (femaleCounter/genderCounter) * 100;
    
    //new width for females
    let newWidth = femalePercent;

    //get the container element by its ID
    let showChartsForGirls = document.getElementById("showChartsForGirls");

    //modify the html content to change the width of the container
    showChartsForGirls.innerHTML = `<img src="chart-imgs/pink-girls-img.png" alt="placeholder for gender chart" width="${newWidth}">`;
}

function malePlayerPercent() {
    countMalePlayers();
    countGenderPlayers();

    let malePercent = (maleCounter/genderCounter) * 100;

    //new width for males
    let newWidth = malePercent;

    //get the container element by its ID
    let showChartsForBoys = document.getElementById("showChartsForBoys");

    //modify the html content to change the width of the container
    showChartsForBoys.innerHTML = `<img src="chart-imgs/blue-boys-img.png" alt="" width="${newWidth}">`;
}

//function to count all age players
function countAllAgePlayers() {
    appendSessionStorage();

    //retrieve the local storage array
    playerRegistrationDataAsString = localStorage.getItem("playerRegistrationData");

    //check if the array is in local storage
    if (playerRegistrationDataAsString) {
        //parse the array string into a javascript array
        playerRegistrationData = JSON.parse(playerRegistrationDataAsString);

        //count the number of male and female players
        for (let i = 0; i < playerRegistrationData.length; i++) {
            if (playerRegistrationData[i] === 8 || playerRegistrationData[i] === 9 || playerRegistrationData[i] === 10 || playerRegistrationData[i] === 11 || playerRegistrationData[i] === 12) {
                allAgeCounter+=1;
            }
        }

        console.log(allAgeCounter);
    } else {
        console.log("Array not found.");
    }
}

//function to change the width of age containers
function agePercents() {
    appendSessionStorage();
    countAllAgePlayers();

    //retrieve the local storage array
    playerRegistrationDataAsString = localStorage.getItem("playerRegistrationData");

    //check if the array is in local storage
    if (playerRegistrationDataAsString) {
        //parse the array string into a javascript array
        playerRegistrationData = JSON.parse(playerRegistrationDataAsString);

        for (let i = 0; i < playerRegistrationData.length; i++) {
            switch (playerRegistrationData[i]) {
                case 8:
                    age8Counter+=1;
                    let age8Percent = (age8Counter/allAgeCounter) * 100;
    
                    //new width for age 8
                    let newWidth8 = age8Percent;

                    //get the container element by its ID
                    let showChartsFor8 = document.getElementById("showChartsFor8");

                    //modify the html content to change the width of the container
                    showChartsFor8.innerHTML = `<img src="chart-imgs/8-img.png" alt="placeholder for age chart" width="${newWidth}">`;
                    break;
                    
                case 9:
                    age9Counter+=1;
                    let age9Percent = (age9Counter/allAgeCounter) * 100;
    
                    //new width for age 9
                    let newWidth9 = age9Percent;

                    //get the container element by its ID
                    let showChartsFor9 = document.getElementById("showChartsFor9");

                    //modify the html content to change the width of the container
                    showChartsFor9.innerHTML = `<img src="chart-imgs/9-img.png" alt="placeholder for age chart" width="${newWidth}">`;
                    break;

                case 10:
                    age10Counter+=1;
                    let age10Percent = (age10Counter/allAgeCounter) * 100;
        
                    //new width for age 10
                    let newWidth10 = age10Percent;
    
                    //get the container element by its ID
                    let showChartsFor10 = document.getElementById("showChartsFor10");
    
                    //modify the html content to change the width of the container
                    showChartsFor10.innerHTML = `<img src="chart-imgs/10-img.png" alt="placeholder for age chart" width="${newWidth}">">`;
                    break;
                        
                case 11:
                    age11Counter+=1;
                    let age11Percent = (age11Counter/allAgeCounter) * 100;
    
                    //new width for age 11
                    let newWidth11 = age11Percent;

                    //get the container element by its ID
                    let showChartsFor11 = document.getElementById("showChartsFor11");

                    //modify the html content to change the width of the container
                    showChartsFor11.innerHTML = `<img src="chart-imgs/11-img.png" alt="placeholder for age chart" width="${newWidth}">`;
                    break;
            
                case 12:
                    age12Counter+=1;
                    let age12Percent = (age12Counter/allAgeCounter) * 100;
    
                    //new width for age 12
                    let newWidth12 = age12Percent;

                    //get the container element by its ID
                    let showChartsFor12 = document.getElementById("showChartsFor12");

                    //modify the html content to change the width of the container
                    showChartsFor12.innerHTML = `<img src="chart-imgs/12-img.png" alt="placeholder for age chart" width="${newWidth}">`;
                    break;

                default:
                    console.log("There's other ages?")
            }
        }
    } else {
        console.log("Array not found.");
    }
}