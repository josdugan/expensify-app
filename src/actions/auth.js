import { firebase, googleAuthProvider } from '../firebase/firebase';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

const login = (uid) => {
    return {
        type: LOGIN,
        uid
    };
};

const startLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider);
    };
};

const logout = () => {
    return {
        type: LOGOUT
    };
};

const startLogout = () => {
    return () => {
        return firebase.auth().signOut();
    };
};

export {
    login,
    logout,
    startLogin,
    startLogout
};
