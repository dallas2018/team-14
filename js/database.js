
//Initiating functions
//logging in
function signIn(){
	var provider = new  firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithPopup(provider);
}

function signOut(){
	firebase.auth().signOut();
}

function initFirebaseAuth(){
	firebase.auth().onAuthStateChanged(authStateObserver);
}

//datafunctions
//get information
function getCurrentUser(){ //returns user info of the current user
	return firebase.auth().currentUser
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
