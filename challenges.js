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
    loadData();
  }

  function loadData(){
    firebase.database().ref(`/Project/${localStorage.uid}`).on('value', function(snapshot){
      var user = snapshot.val();
      var email = user.email;
      var tasks = user.tasks;
      $.each(tasks, function(key, value){
        if(value.challengerId){
          $('#currentChallenges').append(`
            <tr data-id="${key}">
              <td>${value.challengerEmail}</td>
              <td>${value.task}</td>
              <td>${value.date}</td>
              <td>${value.status}</td>
            </tr>
            `)
        }
      })
    });
  }




})();
