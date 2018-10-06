//define basic variables
var USER;

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

// Initiate firebase auth.
function initFirebaseAuth() {
	firebase.auth().onAuthStateChanged(authStateObserver);
}

// Triggers when the auth state change for instance when the user signs-in or signs-out.
function authStateObserver(user) {
	if (user) { // User is signed in!
		//check if user is a new user
		var playersRef = firebase.database().ref("Users").child(user.uid);
		playersRef.on("value", function(snapshot){
			if(snapshot.val() == null){
				playersRef.set({name: "bob", age: "2"});
			}else{
				
			}
		}, function(error){
			
		});
		} else { // User is signed out!
	}
	
	USER = user;
}

//datafunctions
//get information

function getUserInfo(id, func){ //returns user info of the user
	if(id){
		var user = firebase.database().ref("Users").child(id);
		user.on("value", func);		
	}else{
		var user = firebase.database().ref("Users").child(USER.uid);
		user.on("value", func);
	}
}

function getProductInfo(id){
	return firebase.database().ref("UserTable");
}

function setUserInfo(data){
	var user = firebase.database().ref("Users").child(USER.uid);
	user.set(data);
}

initFirebaseAuth();