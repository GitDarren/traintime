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
var startDate = moment().format("MM-DD-YYYY");
var monthlyRate = 0;
var monthsWorked;
var totalBilled;

database.ref().on("child_added", function (snapshot) {
    console.log('here')
    $('#dostuff').append(
        `<tr class="active">
        <td id="table-name">${snapshot.val().inputName}</td>
        <td id="table-dest">${snapshot.val().inputDest}</td>
        <td id="table-freq">${snapshot.val().inputFreq}</td>
        <td id="table-nextarr"></td>
        <td id="table-minutes"></td>
    </tr>
    `)

});

    $("#submit").on("click", function (event) {
        event.preventDefault();
        console.log("Submit button fired");

        var inputName = $("#train-name").val().trim();
        var inputDest = $("#destination").val().trim();
        var inputFirstTrain = parseInt($("#first-train").val().trim());
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


