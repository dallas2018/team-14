
//logging in
function signIn(){
	var provider = new  firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithPopup(provider);
}

function signOut(){
	firebase.auth().signOut();
}


//datafunctions
//get information
getUserInfo = function(){

};

