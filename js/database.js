
//Initiating functions
//logging in
function signIn(){
	var provider = new firebase.auth.GoogleAuthProvider();
	
	firebase.auth().signInWithPopup(provider).then(function(result) {
		var token = result.credential.accessToken;
		var user = result.user;

		console.log(token)
		console.log(user)
	}).catch(function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;

		console.log(error.code)
		console.log(error.message)
	});
}

function signOut(){
   firebase.auth().signOut()
	
   .then(function() {
      console.log('Signout Succesfull')
   }, function(error) {
      console.log('Signout Failed')  
   });
}

//datafunctions
//get information
function getCurrentUser(){ //returns user info of the current user
	//return firebase.auth().currentUser
}

function getUserInfo(id){ //returns user info of the user

}

function getProductInfo(id){
	return firebase.database().ref("UserTable");
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

var mainText = document.getElementById("mainText");
var submit = document.getElementById("submit");


function submitClick(){
	var firebaseRef = firebase.database().ref().child("Users").push();

	var messageText = mainText.value;
	

    	firebaseRef.child("Text").set(messageText);

	//("Text").set(messageText);
}

