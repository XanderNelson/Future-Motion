
// got clock function from https://stackoverflow.com/questions/28415178/how-do-you-show-the-current-time-on-a-web-page
(function () {
  var clockElement = document.getElementById( "clock" );
  function updateClock ( clock ) {
    clock.innerHTML = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  }
  setInterval(function () {
      updateClock( clockElement );
  }, 1000);
}());

$(document).ready(function(){
  $("#climatePage, #navigationPage, #settingsPage, #audioPage").hide();

  $(document).keypress(function(event){
    var keyPressed = event.which || event.keyCode;
    // var keyPressed = event.which;
    if(keyPressed == 49 || keyPressed == 50 || keyPressed == 51 || keyPressed == 52){
      $("main").css("background-image", "url('images/fMotionHomeActive')");
      $(".center").hide();
      if(keyPressed == 49){
        navigation();
      }
      else if(keyPressed == 50){
        climate();
      }
      else if(keyPressed == 51){
        audio();
      }
      else if(keyPressed == 52){
        settings();
      }
    }
    console.log(keyPressed);

  });


  function navigation(){
    $("#climateLogo").attr('src',"images/climate3D");
    $("#audioLogo").attr("src","images/audio3D");
    $("#navigationLogo").attr("src","images/navigationActive");
    $("#settingsLogo").attr("src","images/settings3D");
    $("#navigationPage").show();
    $("#climatePage, #audioPage, #settingsPage").hide();
  }
  function climate(){
    $("#climateLogo").attr("src", "images/climateActive");
    $("#audioLogo").attr("src", "images/audio3D");
    $("#navigationLogo").attr("src","images/navigation3D");
    $("#settingsLogo").attr("src", "images/settings3D");
    $("#climatePage").show();
    $("#navigationPage, #audioPage, #settingsPage").hide();
  }
  function audio(){

    $("#climateLogo").attr("src","images/climate3D");
    $("#audioLogo").attr("src","images/audioActive");
    $("#navigationLogo").attr("src","images/navigation3D");
    $("#settingsLogo").attr("src", "images/settings3D");
    $("#audioPage").show();
    $("#climatePage, #navigationPage, #settingsPage").hide();
    // $("#volumeBar").toggle(); //need to find a way to untoggle and hide again after a user goes into a different subject, but still keep playing music and have the same volume when they go back into that part of the page
      //This is all just for volume control so we need another type of gesture for pausing or changing the song which shouldn't be too hard
      //leapforward.js had all the different types of data the api gives you
      var songs = [
        {"song": "Hot for Teacher","artist": "Van Halen","source": "../music/VanHalenHotforTeacher.wav"},
        {"song": "Cocaine", "artist": "Eric Clapton", "source": "../music/Cocaine.mp3"},
        {"song": "Girls, Girls, Girls", "artist": "Motle Crue", "source": "../music/Girls,Girls,Girls.mp3"},
        {"song": "Dream On", "artist": "Aerosmith", "source": "../music/DreamOn.mp3"},
        {"song": "Back in Black", "artist": "AC/DC", "source": "../music/BackinBlack.mp3"},
        {"song": "Go Your Own Way", "artist": "Fleetwood Mac", "source": "../music/GoYourOwnWay.mp3"}
      ];


      var sources = ["music/VanHalenHotforTeacher.wav", "music/Cocaine.mp3", "music/Girls,Girls,Girls.mp3", "music/DreamOn.mp3", "music/BackinBlack.mp3", "music/GoYourOwnWay.mp3"];

      var playing = document.getElementById("playing0");
      var playing1 = document.getElementById("playing1");
      var playing2 = document.getElementById("playing2");
      var playing3 = document.getElementById("playing3");
      var playing4 = document.getElementById("playing4");
      var playing5 = document.getElementById("playing5");

      var counter = 0;
      $("#nextSongButton").click(function(){
        if(counter == 5){
          counter = 0;
        }
        else{
          counter++;
        }
        nextSong();
      });
      $("#backSongButton").click(function(){
        if(counter == 0){
          counter = 5;
        }
        else{
          counter--;
        }
        nextSong();
      });
      // playing.play();
      // $("#title").html(songs[counter].song);
      // $("#artist").html(songs[counter].artist);
// this is a pretty robust playlist that I hope we can use the leap with after some modification
// spent so long trying to do it a different way but the js/html audio is strange

      function nextSong(){
        $("#title").html(songs[counter].song);
        $("#artist").html(songs[counter].artist);
        if(counter == 0){
          playing1.pause();
          playing.play();
          playing.currentTime = 0;
          playing5.pause();
        }
        else if(counter ==  1){
          playing.pause();
          playing1.play();
          playing1.currentTime = 0;
          playing2.pause();
        }
        else if(counter == 2){
          playing1.pause();
          playing2.play();
          playing2.currentTime = 0;
          playing3.pause();
        }
        else if(counter == 3){
          playing2.pause();
          playing3.play();
          playing3.currentTime = 0;
          playing4.pause();
        }
        else if(counter == 4){
          playing3.pause();
          playing4.play();
          playing4.currentTime = 0;
          playing5.pause();
        }
        else if(counter == 5){
          playing4.pause();
          playing5.play();
          playing5.currentTime = 0;
          playing.pause();
        }
      }
        // ignore this crap for now

        // var song = $("#playing0 source").attr("src");
        // var song1 = $("#playing1 source").attr("src");
        // var song2 = $("#playing2 source").attr("src");
        // var song3 = $("#playing3 source").attr("src");
        // var song4 = $("#playing4 source").attr("src");
        // var song5 = $("#playing5 source").attr("src");

        // console.log(curSong);
        // // var next = $("#")
        // var i = 0;
        // var indexPlay;
        // for(i; i<5; i++){
        //
        //   // var check = "song" + i;
        //   // if(song == sources[i] || song1 == sources[i] || song2 == sources[i] || song3 == sources[i] || song4 == sources[i] || song5 == sources[i]){
        //   if(song == sources[i]){
        //     if(i == 5){
        //       i = 0; //looping through the songs
        //     }
        //     indexPlay = i+1;
        //     var newPlay = document.getElementById("playing" + indexPlay);
        //     newPlay.currentTime = 0;
        //     newPlay.play();
        //     break;
        //   }
        // }
        // console.log(indexPlay);


        // $("#playing0 source").attr("src", sources[i + 1]);


      var paused = false;
      //var pauseOnGesture = false;
      var count = 1;
      // Setup Leap loop with frame callback function
      var controllerOptions = {enableGestures: true};

      Leap.loop(controllerOptions, function(frame) {
        if (paused) {
            return; // Skip this update
        }

        var volume = document.getElementById("volumeBar");

        if (frame.hands.length > 0) {
            for (var i = 0; i < frame.hands.length; i++) {
                var hand = frame.hands[i];
                var newV = hand.palmVelocity;
                var velocity = newV[0];
                velocity = parseFloat(velocity);

                if(velocity > 1500 && count < 1000){
                        volume.style.width= count+20+"px";
                        count=count+20;
                        var newVolume = count/1000;
                        playing.volume = newVolume;
                    }

                if(velocity < (-1500) && count > 1){
                        volume.style.width= count-20+"px";
                        count=count-20;
                        var newVolume = count/1000;
                        playing.volume = newVolume;
                    }

            }
        }
      })   //END OF LEAP LOOP
  }
  function settings(){
    $("#climateLogo").attr("src","images/climate3D");
    $("#audioLogo").attr("src", "images/audio3D");
    $("#navigationLogo").attr("src", "images/navigation3D");
    $("#settingsLogo").attr("src", "images/settingsActive");
    $("#settingsPage").show();
    $("#climatePage, #audioPage, #navigationPage").hide();
  }
});

//NOT USING MOST OF THESE FUNCTIONS
function vectorToString(vector, digits) {
  if (typeof digits === "undefined") {
    digits = 1;
  }
  return "(" + vector[0].toFixed(digits) + ", "
             + vector[1].toFixed(digits) + ", "
             + vector[2].toFixed(digits) + ")";
}

function togglePause() {
  paused = !paused;

  if (paused) {
    document.getElementById("pause").innerText = "Resume";
  } else {
    document.getElementById("pause").innerText = "Pause";
  }
}

function pauseForGestures() {
  if (document.getElementById("pauseOnGesture").checked) {
    pauseOnGesture = true;
  } else {
    pauseOnGesture = false;
  }
}

function proportion(value,max,minrange,maxrange) {
    return Math.round(((max-value)/(max))*(maxrange-minrange))+minrange;
}

function checkLibrary() {
  if (typeof Leap === "undefined") {
    document.getElementById("main").innerHTML = "The Leap Motion JavaScript client library (leap.js file) was not found. Please download the library from the GitHub project at <a href='https://github.com/leapmotion/leapjs'>https://github.com/leapmotion/leapjs</a>."
    alert("The Leap Motion JavaScript client library (leap.js file) was not found. Please download the latest version from the GitHub project at https://github.com/leapmotion/leapjs");
  }
}
