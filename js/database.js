//define basic variables
var USER;

//Initiating functions
//logging in
function signIn(){
	var provider = new firebase.auth.GoogleAuthProvider();
	
	console.log(USER);
	if(USER != null){
		signOut();
	}else{
		firebase.auth().signInWithPopup(provider).then(function(result) {
			var token = result.credential.accessToken;
			var user = result.user;
		}).catch(function(error) {
			var errorCode = error.code;
			var errorMessage = error.message;
		});
	}
}

function signOut(){
   firebase.auth().signOut()
	
   .then(function() {
      console.log('Signout Succesfull')
   }, function(error) {
      console.log('Signout Failed');
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
		console.log("USER LOGGED IN")
		var playersRef = firebase.database().ref("Users").child(user.uid);
		playersRef.on("value", function(snapshot){
			if(snapshot.val() == null){
				playersRef.set({
					name: user.displayName,
					lastname: "",
					dob: "1/1/1970",
					email: user.email,
					rating: "0",
					numOfRatings: "0",
					comments: {}, //keys are uid of people commenting, comment
					donations: {}, //keys are cid, amnt
					
					
				});
			}else{
				var info = snapshot.val(); //update ui with the array
				var profilePic = document.getElementById("profilePic");
				
				console.log(getProfilePicUrl());
				profilePic.src = getProfilePicUrl();
				
				var name = document.getElementById("P_Name");
				name.innerText = info.name;
				var email = document.getElementById("P_email");
				email.innerText = info.email;
			}
						
		}, function(error){
			
		});
		
		//ui changes for when user just logged in
		var but = document.getElementById("MENU_Logout");
		but.innerText = "Logout";
	} else { // User is signed out!
		//ui changes for when user just logged off
		var but = document.getElementById("MENU_Logout");
		but.innerText = "Log In";		
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

function getProfilePicUrl() {
  return firebase.auth().currentUser.photoURL || '/images/profile_placeholder.png';
}

function setUserInfo(data){
	var user = firebase.database().ref("Users").child(USER.uid);
	user.set(data);
}

//purchasing
function purchase(pid, sid, pay){
	var trans = firebase.database().ref("Trans").push(pid, USER.uid, sid, pay);
	
	//change sold item to sold
	var prod = firebase.database().ref("Products").child(sid).child("sold");
	prod.set(true);
}



initFirebaseAuth();