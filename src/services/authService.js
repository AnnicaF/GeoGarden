import "../firebase";
import '../firebase/index';
import {
	getAuth,
	onAuthStateChanged,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";

const auth = getAuth();

export const onSignOut = async () => {
	try {
		await signOut(auth);
	} catch (e) {
		console.log(e);
	}
};

export const stateChange = (callback) => {
	onAuthStateChanged(auth, callback);
};

export const signIn = async (email, password) => {
	try {
		const userData = await signInWithEmailAndPassword(
			auth,
			email,
			password
		);
		console.log(userData.user);

		return {
			uid: userData.user.uid,
		};
	} catch (e) {
		return console.log(e);
	}
};

export const passwordReset = async (email) => {
	sendPasswordResetEmail(auth, email)
		.then(() => {
			alert("password reset email sent");
		})
		.catch((error) => {
			// sendPasswordResetEmail no longer sends error messages as per 15 sept 2023 (for safety, see link below)
			// https://cloud.google.com/identity-platform/docs/admin/email-enumeration-protection
			//   const errorCode = error.code;
			//   const errorMessage = error.message;
			alert("error sending password reset mail");
		});
};


