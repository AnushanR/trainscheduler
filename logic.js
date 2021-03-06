// Initialze Firebase
var config = {
    apiKey: "AIzaSyDdNxTQqC9QbX1ucFt3qySyCpiPqV_Erqo",
    authDomain: "train-51470.firebaseapp.com",
    databaseURL: "https://train-51470.firebaseio.com",
    projectId: "train-51470",
    storageBucket: "train-51470.appspot.com",
    messagingSenderId: "482686561213"
  };
    
    firebase.initializeApp(config);

    var database = firebase.database();

    var divider = "----------------------------------";

    // Add new train to schedule
    $("#add-btn").on("click", function(event){
        event.preventDefault();

        //Grab users input from form 
        var trainName =$("#name").val().trim();
        var destination =$("#destination").val().trim();
        var trainTime =$("#time").val().trim();
        var frequency =$("#frequency").val().trim();

        // temp object for holding new submission

        var newTrain = {
            name: trainName,
            dest: destination,
            time: trainTime,
            freq: frequency
        }

        // upload data into database

        database.ref().push(newTrain);
        
        // log added info to console
        console.log(newTrain.name);
        console.log(newTrain.dest);
        console.log(newTrain.time);
        console.log(newTrain.freq);
        console.log(divider);

        // send alert to user

        alert("The train has been updated!")

        // empty form fields
        $("#name").val("")
        $("#destination").val("")
        $("#time").val("")
        $("#frequency").val("")



    });

    // firebase event for adding new train

    database.ref().on("child_added", function(trainSnapshot) {
        var empName = trainSnapshot.val().name
        var empDest = trainSnapshot.val().dest
        var empTime = trainSnapshot.val().time
        var empFreq = trainSnapshot.val().freq


        //log snapshot Info
        console.log(empDest);
        console.log(empTime);
        console.log(empFreq);
        console.log(empName);
        console.log(divider);

        // train frequency
        var tFrequency = parseInt(empFreq);
       
        // first train time
        var firstTrain = parseInt(empTime);
        

        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
        

        // current time 

        var currentTime = moment().format("hh:mm");
        console.log("current time" + currentTime)

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        


     // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    

    // Minute Until Next Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm a")
   






         // create row for new train
    var newRow = $("<tr>").append(
        $("<td>").text(empName),
        $("<td>").text(empDest),
        $("<td>").text(tFrequency),
        $("<td>").text(nextTrain),
        $("<td>").text(tMinutesTillTrain)
  
      );

        // Append the new row to the table
  $("#newTrain-table > tbody").append(newRow);




    });




      

