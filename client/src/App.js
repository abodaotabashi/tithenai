
import {
    getAuth,
    onAuthStateChanged,
} from "firebase/auth";
import { useEffect, useState } from "react";


function App() {
    const [isAuth, setIsAuth] = useState();


    useEffect(() => {
        checkLoggedInUser();
    });

    const checkLoggedInUser = () => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuth(true);
            } else {
                setIsAuth(false);
            }
        });
    };

}

export default App;
