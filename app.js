const firebaseConfig = {
    apiKey: "AIzaSyD640twUr5ZAPK7SMPGvJARHv3d1_uLbXY",
    authDomain: "earnsave-e7a88.firebaseapp.com",
    projectId: "earnsave-e7a88",
    storageBucket: "earnsave-e7a88.firebasestorage.app",
    messagingSenderId: "280629896863",
    appId: "1:280629896863:web:f5f6fe584d51c7280be4aa",
    measurementId: "G-3C742ZXNKBH"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();


// =========================
// REGISTER
// =========================

const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword =
            document.getElementById("confirmPassword").value;

        if (!fullName) {
            alert("Please enter your full name.");
            return;
        }

        if (!email) {
            alert("Please enter your email.");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {
            const userCredential =
                await auth.createUserWithEmailAndPassword(
                    email,
                    password
                );

            const user = userCredential.user;

            await user.updateProfile({
                displayName: fullName
            });

            alert("Account created successfully!");

            window.location.href = "dashboard.html";

        } catch (error) {

            console.error("Firebase error:", error);

            if (error.code === "auth/email-already-in-use") {
                alert("This email is already registered.");
            } else if (error.code === "auth/invalid-email") {
                alert("Please enter a valid email.");
            } else if (error.code === "auth/weak-password") {
                alert("Password is too weak.");
            } else if (error.code === "auth/unauthorized-domain") {
                alert("localhost is not authorized in Firebase.");
            } else if (error.code === "auth/api-key-not-valid") {
                alert("Firebase API key is invalid. Check the Firebase project configuration.");
            } else {
                alert("Registration failed: " + error.message);
            }
        }
    });
}


// =========================
// LOGIN
// =========================

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;

        try {

            await auth.signInWithEmailAndPassword(
                email,
                password
            );

            alert("Login successful!");

            window.location.href = "dashboard.html";

        } catch (error) {

            console.error("Firebase login error:", error);

            if (
                error.code === "auth/invalid-credential" ||
                error.code === "auth/user-not-found" ||
                error.code === "auth/wrong-password"
            ) {
                alert("Incorrect email or password.");
            } else if (error.code === "auth/invalid-email") {
                alert("Please enter a valid email.");
            } else {
                alert("Login failed: " + error.message);
            }
        }
    });
}