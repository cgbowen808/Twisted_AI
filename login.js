// Firebase config (Replace with your actual Firebase project credentials)
var firebaseConfig = {
  apiKey: "AIzaSyD2sP5O1r0PLnzEjcTZIyMoC-DZo4InSUA",
  authDomain: "twistedprojectsai.firebaseapp.com",
  projectId: "twistedprojectsai",
  appId: "1:81796979203:web:b6e3eaafe5e3516de44c36",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();

// Function to send a passwordless email sign-in link
function sendSignInLink() {
  var email = prompt("Enter your email to receive a login link:");

  if (email) {
    var actionCodeSettings = {
      url: window.location.href, // Redirects user back to this page after sign-in
      handleCodeInApp: true,
    };

    auth
      .sendSignInLinkToEmail(email, actionCodeSettings)
      .then(() => {
        alert("Login link sent! Check your email.");
        localStorage.setItem("emailForSignIn", email); // Store email temporarily
      })
      .catch((error) => {
        console.error("Error sending login link:", error);
        alert("Error: " + error.message);
      });
  }
}

// Function to verify and log in the user when they return via email link
if (auth.isSignInWithEmailLink(window.location.href)) {
  let email = localStorage.getItem("emailForSignIn");
  if (!email) {
    email = prompt("Please enter your email again:");
  }

  auth
    .signInWithEmailLink(email, window.location.href)
    .then((result) => {
      localStorage.removeItem("emailForSignIn"); // Clear stored email
      alert("Successfully logged in!");
      console.log("User:", result.user);
      // Redirect user or show authenticated content
    })
    .catch((error) => {
      console.error("Error during sign-in:", error);
      alert("Error: " + error.message);
    });
}

// Attach event listener to login button
document.getElementById("loginButton").addEventListener("click", sendSignInLink);
