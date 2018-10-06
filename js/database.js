//define basic variables
sessionStorage.USER;

//Initiating functions
//logging in
function signIn(){
	var provider = new firebase.auth.GoogleAuthProvider();
	
	console.log(sessionStorage.USER);
	if(sessionStorage.USER){
		signOut();
	}else{

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
		var playersRef = firebase.database().ref("Users").child(user.uid);
		playersRef.on("value", function(snapshot){
			if(snapshot.val() == null){
				playersRef.set({
					name: user.displayName, 
					email: user.email,
					rating: "0",
					numOfRatings: "0",
					comments: {}, //keys are uid of people commenting, comment
					donations: {}, //keys are cid, amnt
					pic: getProfilePic()
					
				});
			}else{
				
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
	
	sessionStorage.USER = user;
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

function getProfilePic(){
	return firebase.auth().currentUser.photoURL || '/assets/profile_placeholder.png';
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