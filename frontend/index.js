var mainText = document.getElementById("mainText");
var submit = document.getElementById("submit");

var productName = document.getElementById("productName");
var itemTags = document.getElementById("itemTags");
var charity = document.getElementById("charity");
var seller = document.getElementById("seller");
var quality = document.getElementById("quality");
var pricing = document.getElementById("pricing");

function submitClick(){
	var firebaseRef = firebase.database().ref().child("Users").push();

	var productNameText = productName.value;
	var itemTagsText = itemTags.value;
	var charityText = charity.value;
	var sellerText = seller.value;
	var qualityText = quality.value;
	var pricingText = pricing.value;

    firebaseRef.child("Product Name").set(productNameText);
    firebaseRef.child("Product Type").set(itemTagsText);
    firebaseRef.child("Charity Name").set(charityText);
    firebaseRef.child("Seller Name").set(sellerText);
    firebaseRef.child("Quality of Product (1-10)").set(qualityText);
    firebaseRef.child("Price of Product").set(pricingText);
    



}