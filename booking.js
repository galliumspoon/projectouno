
var user = firebase.auth().currentUser;

// firebase.auth().currentUser.email

var displayName = user.displayName;
$("#header2").css("background-color", "#ffffdd")
// $("#headerText2").html(`<p>Hello ${displayName}!</p><p id="signOut">SIGN OUT</p>`)
// $("#signOut").click(function() {
//   firebase.auth().signOut().then(function() {
//     console.log("signed out!")
//     window.location = "login.html"
//   }).catch(function(error) {
//     console.log("ERR")
//   })
