console.log("This shit is working");

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


var database = firebase.database();

var name = "";
var dest = "";
var timeFrequency = 0;
var firstTime = 0;
var timeRemainder = 0;



database.ref().orderByChild("inputDest").on("child_added", function (snapshot) {
    console.log('here')

    var firstTimeCoverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log("This is first time converted = " + firstTimeCoverted);

    var currentTime = moment();
    console.log(currentTime);

    var diffTime = moment().diff(moment(firstTimeCoverted), "minutes");
    console.log("Difference in Time: " + diffTime);

    timeRemainder = diffTime % timeFrequency;
    console.log(timeRemainder);

    var minutesAway = timeFrequency - timeRemainder;
    console.log("Minutes until the goddamn train: " + minutesAway);

    var nextArrival = moment().add(minutesAway, "minutes");
    console.log("The fucking train will arrive at " + moment(nextArrival).format("hh:mm"));

    timeFrequency = snapshot.val().inputFreq;
    console.log("This is time frequency " + timeFrequency);

    firstTime = snapshot.val().inputFirstTrain;
    console.log("This is first time " + firstTime);
    


    $('#dostuff').append(
        `<tr class="active">
        <td id="table-name">${snapshot.val().inputName}</td>
        <td id="table-dest">${snapshot.val().inputDest}</td>
        <td id="table-freq">${snapshot.val().inputFreq}</td>
        <td id="table-nextarr">${moment(nextArrival).format("hh:mm")}</td>
        <td id="table-minutes">${minutesAway}</td>
    </tr>`
    )

});

    $("#submit").on("click", function (event) {
        event.preventDefault();
        console.log("Submit button fired");

        var inputName = $("#train-name").val().trim();
        var inputDest = $("#destination").val().trim();
        var inputFirstTrain = $("#first-train").val().trim();
        var inputFreq = $("#frequency").val().trim();

        console.log(inputName);
        console.log(inputDest);
        console.log(inputFirstTrain);
        console.log(inputFreq);

        database.ref().push({
            inputName: inputName,
            inputDest: inputDest,
            inputFirstTrain: inputFirstTrain,
            inputFreq: inputFreq
        })
        $('input').val('');
    });


