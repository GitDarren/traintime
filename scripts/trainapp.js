//Javascript for Train Tracker App

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAT5KIpLNfjB0xG0SHWLBn66dfL_3WnsYw",
    authDomain: "traintime-632e9.firebaseapp.com",
    databaseURL: "https://traintime-632e9.firebaseio.com",
    projectId: "traintime-632e9",
    storageBucket: "traintime-632e9.appspot.com",
    messagingSenderId: "1013396731660"
};
firebase.initializeApp(config);

//Sets up database as the firebase database. 
var database = firebase.database();

//Setting up global variable
var timeRemainder = 0;


//Setting up database  
database.ref().orderByChild("inputDest").on("child_added", function (snapshot) {
    console.log('here')

    //Creates the first time that uses the first train time entered by the user and subtracts 1 year//
    var firstTimeCoverted = moment(snapshot.val().inputFirstTrain, "HHmm").subtract(1, "years");
    console.log("This is first time converted = " + firstTimeCoverted);

    //Creates a variable for the current time
    var currentTime = moment();
    console.log(currentTime);

    //Create a var for the difference of time between current time and the firstTimeCoverte
    var diffTime = currentTime.diff(moment(firstTimeCoverted), "minutes");
    console.log("Difference in Time: " + diffTime);

    //Uses the variable timeRemainder to determine the modulus of diffTime and timeFrequency
    timeRemainder = diffTime % snapshot.val().inputFreq;
    console.log(timeRemainder);

    //Uses the variable timeFrequency to capture the value at that moment of inputFreq
    var timeFrequency = snapshot.val().inputFreq;
    console.log("This is time frequency " + timeFrequency);

    //Creates a variable that computes the number of minutes until the next train arrives
    var minutesAway = timeFrequency - timeRemainder;
    console.log("Minutes until the train arrives: " + minutesAway);

    //Creates a variable that adds the number of minutes away to the current time to determine the next arrival time.
    var nextArrival = moment().add(minutesAway, "minutes");
    console.log("The train will arrive at " + moment(nextArrival).format("HHmm"));

    //This appends the DOM with a new table that contains the inputted values and calculated values for the trains//
    $('#dostuff').append(
        `<tr class="active">
        <td id="table-name">${snapshot.val().inputName}</td>
        <td id="table-dest">${snapshot.val().inputDest}</td>
        <td id="table-freq">${snapshot.val().inputFreq}</td>
        <td id="table-nextarr">${moment(nextArrival).format("HHmm")}</td>
        <td id="table-minutes">${minutesAway}</td>
    </tr>`
    )
});
//On click of submit button, first prevent refresh of screen//
$("#submit").on("click", function (event) {
    event.preventDefault();
    console.log("Submit button fired");

    //The variables for the manually inputted info from user//
    var inputName = $("#train-name").val().trim();
    var inputDest = $("#destination").val().trim();
    var inputFirstTrain = $("#first-train").val().trim();
    var inputFreq = $("#frequency").val().trim();

    console.log(inputName);
    console.log(inputDest);
    console.log(inputFreq);

    //Pushes the user input to Firebase//
    database.ref().push({
        inputName: inputName,
        inputDest: inputDest,
        inputFirstTrain: inputFirstTrain,
        inputFreq: inputFreq
    })
    //Clears the form values for the next enty. 
    $('input').val('');
});


    //Things to fix
    //2.  Fix the sorting function so that happens on submit, not on page fresh
    //3.  Add a little flair to the table 
    //4.  I need to remind Eric that T.Brady got robbed twice.  TWICE!!!  
