import "./App.css";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut} from "firebase/auth";
import { useEffect, useState } from "react";
import axios from "axios";

const BASEURL = "http://localhost:9000/";

function App() {
	const [isAuth, setIsAuth] = useState(
		false || window.localStorage.getItem("auth") === "true"
	);
	const [idToken, setIdToken] = useState("");

	useEffect(() => {
		checkLoggedInUser();
		if (idToken) {
			getData(idToken);
		}
	}, [idToken]);

    // only authenticated users can get data
	const getData = async (idToekn) => {
		const res = await axios.get(BASEURL, {
			headers: {
				Authorization: "Bearer " + idToken,
			},
		});
		console.log(res);
	};

	const checkLoggedInUser = () => {
		const auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			if (user) {
				// const uid = user.uid;
				setIsAuth(true);

				// this is a way to show the "user logged in" immediately
				window.localStorage.setItem("auth", "true");

				user.getIdToken().then((idToken) => {
					setIdToken(idToken);
				});
			} else {
				// User is signed out
				// ...
				setIsAuth(false);
                setIdToken("")
			}
		});
	};

	const signUpWithGoogle = () => {
		const provider = new GoogleAuthProvider();
		const auth = getAuth();
		signInWithPopup(auth, provider)
			.then((result) => {
				setIsAuth(true);
				window.localStorage.setItem("auth", "true");
				// const user = result.user; // The signed-in user info.
			})
			.catch((error) => {
				// Handle Errors here.
				// const errorCode = error.code;
				// const errorMessage = error.message;
				// The email of the user's account used.
				// const email = error.email;
				// The AuthCredential type that was used.
				// const credential = GoogleAuthProvider.credentialFromError(error);
			});
	};

	const appSignOut = () => {
		const auth = getAuth();
		signOut(auth)
			.then(() => {
				// Sign-out successful.
			})
			.catch((error) => {
				// An error happened.
			});
	};

	return (
		<div className="App">
			{isAuth ? (
				<div>
					<h1>User is signed in.</h1>
					<button onClick={appSignOut}>Sign out</button>
				</div>
			) : (
				<button onClick={signUpWithGoogle}>Sign up / Sign in with Google</button>
			)}
		</div>
	);
}

export default App;
