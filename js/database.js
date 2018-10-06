
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
function getUserInfo(){

}

function authStateObserver(user){
	if (user) { // User is signed in!
		// Get the signed-in user's profile pic and name.
		var profilePicUrl = getProfilePicUrl();
		var userName = getUserName();

		// Set the user's profile pic and name.
		userPicElement.style.backgroundImage = 'url(' + profilePicUrl + ')';
		userNameElement.textContent = userName;

		// Show user's profile and sign-out button.
		userNameElement.removeAttribute('hidden');
		userPicElement.removeAttribute('hidden');
		signOutButtonElement.removeAttribute('hidden');

		// Hide sign-in button.
		signInButtonElement.setAttribute('hidden', 'true');

		// We save the Firebase Messaging Device token and enable notifications.
		saveMessagingDeviceToken();
	} else { // User is signed out!
		// Hide user's profile and sign-out button.
		userNameElement.setAttribute('hidden', 'true');
		userPicElement.setAttribute('hidden', 'true');
		signOutButtonElement.setAttribute('hidden', 'true');

		// Show sign-in button.
		signInButtonElement.removeAttribute('hidden');
	}	
}
