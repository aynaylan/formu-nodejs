  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBjHMa-a500mDxJQ_QyWGUp3lBe7nc2lbw",
    authDomain: "maformuu.firebaseapp.com",
    databaseURL: "https://maformuu.firebaseio.com",
    projectId: "maformuu",
    storageBucket: "maformuu.appspot.com",
    messagingSenderId: "300991746205"
  };
  firebase.initializeApp(config);
  var provider = new firebase.auth.GoogleAuthProvider();
  var userCurrent = firebase.auth().currentUser;



  $( document ).ready(function() {



      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          $(document).ready(function(){
            $("#jinaO").val(user.name);
            $("#emailO").val(user.email);
            $("#phoneO").val(user.phone);
            $("#ola").fadeOut(3000);

            $("#authentify").text("Log out");

            $("#authentify").click(function(){
            firebase.auth().signOut();
            });



            });




        } else {



       var f = document.getElementById("cEvent");
       for(var i=0; i< f.length; i++){ f[i].disabled = true;}

          $("#authentify").text("Log In");
          $("#ola").fadeIn(3000);

                  $("#authentify").click(function(){



                    firebase.auth().signInWithRedirect(provider);
                    firebase.auth().getRedirectResult().then(function(result) {
                    if (result.credential) {
                      // This gives you a Google Access Token. You can use it to access the Google API.
                      var token = result.credential.accessToken;
                      // ...
                    }
                    // The signed-in user info.
                    var user = result.user;
                    var email = result.email;
                  }).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // ...
                  });

                  });


        }
      });



  });





var rootRef = firebase.database().ref().child("Events");

rootRef.on("child_added", snap => {

var name = snap.child('Name').val();
var date = snap.child('Date').val();
var category = snap.child('Category').val();
var description = snap.child('Description').val();
var location = snap.child('Location').val();
 console.log(snap.val());





 $('.card-header').html(category);
 $('.card-title').html(name);
 $('.card-text').html(description);
 $('.card-footer p').html(date);
 $('.card-link').html(location);

   $(".card-columns").append("<div class='card'><div>"+snap.child('Category').val()+"</div><div class='card-body'>"+"<h4>"+snap.child('Name').val()+"</h4>"+"<p>"+snap.child('Description').val()+"</p>"+"</div><div class='card-footer'>"+"<a>"+snap.child('Location').val()+" : "+"</a>" + snap.child('Date').val() +" "+snap.child('Time').val()+"</div></div>");

});
