var express = require('express');
var router = express.Router();
var admin = require("firebase-admin");
//var firebase = require("firebase");



var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: true });



var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://maformuu.firebaseio.com",
  });

  var db = admin.database();
  var storage = admin.storage();
  var ref = db.ref('/');

  /*
  firebase.initializeApp({

    apiKey: "AIzaSyBjHMa-a500mDxJQ_QyWGUp3lBe7nc2lbw",
    authDomain: "maformuu.firebaseapp.com",
    databaseURL: "https://maformuu.firebaseio.com",
    projectId: "maformuu",
    storageBucket: "maformuu.appspot.com",
    messagingSenderId: "300991746205"

  });
  var authen = fire.auth();
  
*/




function getData(){
  
  return ref.child('Events').once('value').then(snap => snap.val());
      
}

function orgDate(){
  return  ref.child('Events').on('child_added', (snapshot) => snap.val());
}


/* HOME PAGE */
router.get('/', function(req, res, next) {
  
  getData().then(data => {

    res.render('index',{ data });
  });
  
});

router.post('/', function(req, res, next) {

});

router.get('/Login', function(req, res) {
  res.render('login', { title:'Login' });
});

/* REGISTER USER PAGE */
router.get('/Register', function(req, res) {
    res.render('register', { title:'Register' });
});

router.post('/Register', function(req, res, next) {



});

/* REGISTER EVENT PAGE */
router.get('/Create', function(req, res, next) {


    res.render('create', { title:'Create' });


});
router.post('/Create', function(req, res) {

  var file = req.body.file;
  //Select Destination of posting
  var uploadTask = strref.child("Events/time").put(file);
  uploadTask.on('state_changed', snapshot =>{

  var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
 // <div class="progress-bar progress-bar-striped progress-bar-animated" style="width:40%">Uploading</div>
  console.log('Upload is ' + progress + '% done');

  },error=>{
      console.log(error);
  },function(){
      //If the upload is successful retrieve the download URL
      uploadTask.snapshot.ref.getDownloadURL().then(downloadURL =>{
      console.log('File available at', downloadURL);
              
              var eventRef = ref.child('Events');
              var newItemRef = eventRef.push();
              newItemRef.set({
                "Name": req.body.jina,
                "Location": req.body.locality,
                "Date": req.body.date,
                "Time": req.body.time,
                "Category": req.body.category,
                "Price":"free",
                "Description":req.body.description,
                "Featured": "false",
                "Organiser Name": req.body.jinaO,
                "Organiser Email": req.body.emailO,
                "Organiser phone" : req.body.phoneO
            
              });
            
              var itemId = newItemRef.key;
              console.log("A new evnt item with ID " + itemId + " is created.");


     
          

      });

  });



  res.redirect("/");


});

//post method


//post method



module.exports = router;
