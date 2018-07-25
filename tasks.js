(function(){
  $(document).ready(init);

  // Initialize Firebase
   var config = {
     apiKey: "AIzaSyDoCrQ2D315ugjk7L76SObcabZAwS6KWww",
     authDomain: "test-404f2.firebaseapp.com",
     databaseURL: "https://test-404f2.firebaseio.com",
     projectId: "test-404f2",
     storageBucket: "test-404f2.appspot.com",
     messagingSenderId: "305218602267"
   };

  function init(){
    $('#btn').click(openModal);
    firebase.initializeApp(config);

    $('#createBtn').click(writeData);
    loadData();
  }

  function loadData(){
    firebase.database().ref(`/Project/${localStorage.uid}/tasks/`).on('value', function(snapshot){
      var tasks = snapshot.val();
      $.each(tasks, function(key, value){
        $('#tasks').prepend(`
          <div class="row card teal">
              <div class="col s12 m10 l10 card-content">
                <h5>${value.task}</h5>
             </div>
             <div class="col s12 m2 l2 card-content">
              <button><i class="material-icons">delete</i></button>
             </div>
          </div>
        `)
      })
    })
  }

  function writeData() {
   var task = $('#task').val();
   var tasks = {
     task: task
   }

   var newTaskKey = firebase.database().ref().child(`/Project/${localStorage.uid}/`).push().key;

   return firebase.database().ref(`/Project/${localStorage.uid}/tasks/${newTaskKey}`).update(tasks).then(function(){
     window.location.replace("./tasks.html");
   });
  }

  function openModal(){
    // console.log("woring");
    $('.modal').modal();
    $('.modal').modal('open');
  }
})();
