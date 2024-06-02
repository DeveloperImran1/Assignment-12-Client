

import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic()

    // user create
    const register = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    };

    // login with google
    const googleProvider = new GoogleAuthProvider();
    const signInGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    // login with github
    const githubProvider = new GithubAuthProvider();
    const signInGithub = () => {
        setLoading(true);
        return signInWithPopup(auth, githubProvider);
    }

    // login user
    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    };

    // logOut
    const logOut = () => {
        setLoading(true);
        return signOut(auth)
    };
    // add name and userProfile pic
    const handleUpdateProfile = (name, photo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }

    // save user data in db
    const handleSaveUser = async (user) => {
        if (user?.displayName || user?.email, user?.photoURL) {
            const userInfo = {
                userName: user?.displayName,
                userEmail: user?.email,
                userPhoto: user?.photoURL,
                userRole: "Tourist",
                userStatus: 'Verified'
            }
            console.log("Db te user add hotr jaia", userInfo)
            const data = await axiosPublic.post('/users', userInfo);
        }

    }



    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log(" Current user: ", currentUser)
            // If current user thakle token generate now
            if (currentUser) {
                const userInfo = { email: currentUser.email };
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        console.log(res.data.token)
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token)
                            handleSaveUser(currentUser)
                        }
                    })
            }
            else {
                localStorage.removeItem('access-token')
            }

            setLoading(false);

        });

        return () => {
            unSubscribe();
        }
    }, [axiosPublic]);





    const authInfo = { register, login, user, logOut, signInGoogle, signInGithub, loading, setLoading, handleUpdateProfile, }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;