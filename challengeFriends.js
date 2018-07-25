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

    // que datepicker modal
    $('.modal').modal();
    $('select').formSelect();
    $('.datepicker').datepicker();
    M.updateTextFields();

    loadDropDown();
    $('#friendDropDown').on('change', loadTasks);
    $('#submitChallenge').on('click', saveChallenge);
  }

  function saveChallenge(){
    var challengerEmail;

    firebase.database().ref(`/Project/${localStorage.uid}/`).on('value',function(snapshot){
      challengerEmail = snapshot.val().email
    });

    var user = $('#friendDropDown').val();
    var task = $('#tasksDropDown').val();
    var date = $('#date').val();
    var charity = $('#charity').val();

    var updates = {
      date: date,
      charity: charity,
      challengerId: localStorage.uid,
      challengerEmail: challengerEmail,
      status: 'tbd'
    }

    firebase.database().ref(`/Project/${user}/tasks/${task}`).update(updates).then(function(){
      window.location.replace('./challenges.html');
    });

  }

  function loadTasks(){
    var userId = $(this).val();
    firebase.database().ref(`/Project/${userId}`).on('value',function(snapshot){
      var user = snapshot.val();
      var tasks = user.tasks;
      $.each(tasks, function(key,value){
        $('#tasksDropDown').append(`<option value="${key}">${value.task}</option>`)
      })
    })
  }

  function loadDropDown(){
    firebase.database().ref(`/Project/`).on('value',function(snapshot){
      var users = snapshot.val();
      $.each(users, function(key, value){
        $('#friendDropDown').append(`<option value="${key}">${value.email}</option>`)
      })
    })
  }



})();
