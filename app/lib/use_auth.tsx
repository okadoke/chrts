import React, { useState, useEffect, useContext, createContext } from "react"
import { useSession, signIn, signOut } from "next-auth/client"
import * as firebase from "firebase/app"
import "firebase/auth"

// Initialize Firebase
if (firebase.apps.length === 0) {
	// Your web app's Firebase configuration
	var firebaseConfig = {
		apiKey: "AIzaSyB0AUTInDeMI4_ClV7YSSQzyCZGifONYJo",
		authDomain: "chrtsio.firebaseapp.com",
		databaseURL: "https://chrtsio.firebaseio.com",
		projectId: "chrtsio",
		storageBucket: "chrtsio.appspot.com",
		messagingSenderId: "266074650529",
		appId: "1:266074650529:web:d90b786da5405068bb7de0",
		measurementId: "G-RLW45F0GCS",
	}
	firebase.initializeApp(firebaseConfig)
}

type AuthState = "signed_in" | "signed_out" | "unknown"
type User = {
	fbUser: firebase.User
	twitterToken?: string
	twitterSecret?: string
	state: AuthState
}

function useProvideAuth() {
	const [user, setUser] = useState<User>({
		fbUser: null,
		state: "unknown",
	})
	// const [user, setUser] = useState<firebase.User>(null)
	// const [state, setState] = useState<AuthState>('unknown')

	const signin = async () => {
		signIn("twitter")
	}
	// const signin = async () => {
	//   const twitterAuthProvider = new firebase.auth.TwitterAuthProvider()
	//   const signinResp = await firebase.auth().signInWithPopup(twitterAuthProvider)
	//   // test for credential and user
	//   const handle: string = signinResp.additionalUserInfo.username
	//   const credential: any = signinResp.credential
	//   const idToken = await signinResp.user.getIdToken()
	//   const authResp = await fetch('/api/auth', {
	//     method: 'POST',
	//     headers: new Headers({
	//       'Authorization': `Bearer ${idToken}`,
	//       'Content-Type': 'application/json'
	//     }),
	//     body: JSON.stringify({
	//       accessToken: credential.accessToken,
	//       secret: credential.secret
	//     })
	//   })
	//   if (authResp.ok) {
	//     console.log('credential storage succeeded')

	//     // update the fbUser displayName to be the screen_name
	//     // display name is still accessible from providerData
	//     await signinResp.user.updateProfile({ displayName: handle })

	//     // store the credentials in firestore for later use
	//     setUser({
	//       fbUser: signinResp.user,
	//       state: 'signed_in'
	//     })
	//   }
	//   else {
	//     console.log('credential storage failed, signing out')
	//     signout()
	//   }
	// }

	const signout = () => {
		return firebase
			.auth()
			.signOut()
			.then(() => {
				setUser({
					fbUser: null,
					state: "signed_out",
				})
			})
	}

	useEffect(() => {
		console.log("useProvideAuth.useEffect")
		// firebase.auth().getRedirectResult()
		// .then(credential => {
		//   console.log('redirect credential:', credential)
		// })
		const unsub = firebase.auth().onAuthStateChanged((fbUser) => {
			if (!fbUser) {
				setUser({
					fbUser: null,
					state: "signed_out",
				})
			} else if (!user || !user.fbUser || user.fbUser.uid !== fbUser.uid) {
				setUser({
					fbUser: fbUser,
					state: "signed_in",
				})
			}
		})
		// returned function is called on unmount
		return () => unsub()
	}, []) // empty array ensures effect is only called once

	return {
		user: user.fbUser,
		state: user.state,
		signin,
		signout,
	}
}

type Auth = {
	user: firebase.User
	state: AuthState
	signin: () => any
	signout: () => any
}
const authContext = createContext<Partial<Auth>>(null)

export function useAuth() {
	return useContext(authContext)
}

export function ProvideAuth({ children }) {
	const auth = useProvideAuth()
	return <authContext.Provider value={auth}>{children}</authContext.Provider>
}
