
//Initiating functions
//logging in
firebase.auth().getRedirectResult().then(function(result) {
  if (result.credential) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // ...
  }
  // The signed-in user info.
  var user = result.user;
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

firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // ...
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


//datafunctions
//get information
function getCurrentUser(){ //returns user info of the current user
	//return firebase.auth().currentUser
}

function getUserInfo(id){ //returns user info of the user

}

function getProductInfo(id){
	
}

function authStateObserver(user){
	if (user) { // User is signed in!

		// We save the Firebase Messaging Device token and enable notifications.
		saveMessagingDeviceToken();
	} else { // User is signed out!
		// Hide user's profile and sign-out button.

		// Show sign-in button.
	}	
}

