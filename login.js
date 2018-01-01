firebase.initializeApp(config);

let getButton = $("#registerButton")
let loginButton = $("#loginButton")
let registerSwap = $("#registerLabel")
let loginSwap = $("#loginLabel")
let register = $("#registerBody")
let login = $("#loginBody")

//sets up registration
getButton.click(function() {
  let email = $("#emailReg")
  let pass = $("#passReg")
  let name = $("#nameReg").val()
  //creates user
  firebase.auth().createUserWithEmailAndPassword(email.val(), pass.val()).then(function () {
    var user = firebase.auth().currentUser;
    //adds the username
    user.updateProfile({ displayName : name}).then(function() {
      user.sendEmailVerification().then(function() {
        console.log("check email")
        alert("Check your email to authorize your account!")
      }).catch(function(error) {
        console.log("error!")
      })
      var displayName = user.displayName;
      console.log(displayName)
      $("#headerText").html(`<p>Hello ${displayName}!</p><p id="signOut">SIGN OUT</p>`)
      $("#signOut").click(function() {
        firebase.auth().signOut().then(function() {
          console.log("signed out!")
          $("#headerText").html(`<p>Signed Out!</p>`)
        }).catch(function(error) {
          console.log("ERR")
        })
      })
    })
  }).catch(function(error) {
    alert("Your email is either incorrectly formatted, or already in the database!")
  })
  email.val("")
  pass.val("")
  $("#nameReg").val("")
})

//tracks user state and whether or not to display sign out button and user hello
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    console.log(displayName)
    $("#header").css("background-color", "#ffffdd")
    $("#headerText").html(`<p>Hello ${displayName}!</p><p id="signOut">SIGN OUT</p>`)
    $("#signOut").click(function() {
      firebase.auth().signOut().then(function() {
        console.log("signed out!")
        $("#headerText").html(`<p>Signed Out!</p>`)
      }).catch(function(error) {
        console.log("ERR")
      })
    })
  }
})

//login stuff
loginButton.click(function() {
  let email = $("#emailLog")
  let password = $("#passLog")
  firebase.auth().signInWithEmailAndPassword(email.val(), password.val()).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(error.code)
    console.log(error.message)
    alert("Wrong username or password! Please try again!")
    // ...
  });
  email.val("")
  password.val("")
})

registerSwap.click(function() {
  loginZIndex = login.css("z-index")
  register.css("z-index", parseInt(loginZIndex) + 1)
  registerSwap.css("background-color", "#fffaad")
  loginSwap.css("background-color", "#ffffdd")
})

loginSwap.click(function() {
  regZIndex = register.css("z-index")
  login.css("z-index", parseInt(regZIndex) + 1)
  loginSwap.css("background-color", "#fffaad")
  registerSwap.css("background-color", "#ffffdd")
})
