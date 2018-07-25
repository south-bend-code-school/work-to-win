(function(){
  $(document).ready(initialize);

  // Initialize Firebase
   var config = {
     apiKey: "AIzaSyDoCrQ2D315ugjk7L76SObcabZAwS6KWww",
     authDomain: "test-404f2.firebaseapp.com",
     databaseURL: "https://test-404f2.firebaseio.com",
     projectId: "test-404f2",
     storageBucket: "test-404f2.appspot.com",
     messagingSenderId: "305218602267"
   };

  function initialize(){
    // initialize firebase
    firebase.initializeApp(config);

    // character count
    $('input#input_text, textarea#textarea2').characterCounter();

    $('#submitButton').click(writeData);
    loadData();
}

function writeData() {
 var email = $('#email').val();

 var project = {
   email : email,
 };

 var newProjectKey = firebase.database().ref().child('Project').push().key;
 localStorage.setItem("uid",newProjectKey);
 var updates = {};
 updates['/Project/' + newProjectKey] = project;

 return firebase.database().ref().update(updates).then(function(){
   window.location.replace("./home.html");
 });
}

function loadData(){
 firebase.database().ref('/Project/').on('value', function(snapshot){
   var users = snapshot.val();
   $.each(users, function(key, value){
     $('#email-list').append("<p>"+value.email+"</p>")
   })
 })
}

})();
