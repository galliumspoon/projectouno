var auth = firebase.auth()
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
  auth.createUserWithEmailAndPassword(email.val(), pass.val()).then(function () {
    var user = auth.currentUser;
    //adds the username
    user.updateProfile({ displayName : name}).then(function() {
      user.sendEmailVerification().then(function() {
        console.log("check email")
        alert("Check your email to authorize your account!")
      }).catch(function(error) {
        console.log("ERR")
        alert("Your email is either incorrectly formatted, or already in the database!")
      })
      console.log(user.displayName)
    })
  })
})

//tracks user state and whether or not to display sign out button and user hello
auth.onAuthStateChanged(function(user) {
  return
  console.log("onAuthStateChanged called")
//  return
  if (user) {
    window.location = "groupProject.html"
    var user = auth.currentUser;
    var displayName = user.displayName;
    $("#header2").css("background-color", "#ffffdd")
    $("#headerText2").html(`<p>Hello ${displayName}!</p><p id="signOut">SIGN OUT</p>`)
    $("#signOut").click(function() {
      auth.signOut().then(function() {
        console.log("signed out!")
        window.location = "login.html"
      }).catch(function(error) {
        console.log("ERR")
      })
    })
  }
})
//   catch(function(error) {
//   console.log("ERR")
// })



//login stuff
loginButton.click(function() {
  let email = $("#emailLog")
  let password = $("#passLog")
  auth.signInWithEmailAndPassword(email.val(), password.val()).then(function() {
    window.location = "groupProject.html"
  }).catch(function(error) {
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
