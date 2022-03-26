import "./App.css";
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	onAuthStateChanged,
} from "firebase/auth";
import { useEffect, useState } from "react";
import axios from 'axios'; 

const BASEURL = 'http://localhost:9000/'

function App() {
	const [isAuth, setIsAuth] = useState(false || window.localStorage.getItem('auth') === 'true');
	const [idToken, setIdToken] = useState('');

	useEffect(() => {
        checkLoggedInUser()
        if(idToken){
            getData(idToken)
        }
	}, [idToken]);

    const getData = async (idToekn) => {
        const res = await axios.get(BASEURL, {
            headers: {
                Authorization: "Bearer " + idToken,
            }, 
        })
        console.log(res);
    }

    const checkLoggedInUser = () => {
        const auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			if (user) {

				// const uid = user.uid;
                setIsAuth(true); 
                
                // this is a way to show the "user logged in" immediately
                window.localStorage.setItem('auth', 'true')

                user.getIdToken().then((idToken) =>{
                    setIdToken(idToken)
                })
			} else {
				// User is signed out
				// ...
                setIsAuth(false)
			}
		});
    }

	const loginWithGoogle = () => {
		const provider = new GoogleAuthProvider();
		const auth = getAuth();
		signInWithPopup(auth, provider)
			.then((result) => {
				setIsAuth(true);
                window.localStorage.setItem('auth', 'true')
				// This gives you a Google Access Token. You can use it to access the Google API.
				// const credential = GoogleAuthProvider.credentialFromResult(result);
				// const token = credential.accessToken;
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

	return (
		<div className="App">
			{isAuth ? (
				<div>
					<h1>User is logged in.</h1>
				</div>
			) : (
				<button onClick={loginWithGoogle}>Login with Google</button>
			)}
		</div>
	);
}

export default App;
