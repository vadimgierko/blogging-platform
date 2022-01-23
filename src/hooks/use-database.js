import { createContext, useContext, useState, useEffect } from "react";
import { firebaseAuth, database } from "../firebase";

import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	deleteUser,
} from "firebase/auth";

import { ref, set, onValue, remove } from "firebase/database";

const DatabaseContext = createContext();

export const useDatabase = () => useContext(DatabaseContext);

export function DatabaseProvider({ children }) {
	const [user, setUser] = useState(null);
	const [userPublicData, setUserPublicData] = useState();
	const [userBlogsList, setUserBlogsList] = useState(); // ordered by keys

	const signIn = (signInData) => {
		const email = signInData.email;
		const password = signInData.password;
		return signInWithEmailAndPassword(firebaseAuth, email, password).catch((error) => {
			alert(error.message);
		});
	};

	const signUp = (signUpData) => {
		return createUserWithEmailAndPassword(firebaseAuth, signUpData.email, signUpData.password)
			.then((userCredential) => {
				console.log("user is sign up. userCredential.user: ", userCredential.user);

				// create user in database:
				set(ref(database, "users/" + userCredential.user.uid), {
					privateData: {
						email: signUpData.email,
					},
					publicData: {
						data: {
							firstName: signUpData.firstName,
							lastName: signUpData.lastName,
							userName: signUpData.userName,
						},
					},
				}).catch((error) => {
					alert(error.message);
				});

				// add user's public data into users list ordered by keys:
				set(ref(database, "users/listOrderedByKeys/" + userCredential.user.uid), {
					firstName: signUpData.firstName,
					lastName: signUpData.lastName,
					userName: signUpData.userName,
				}).catch((error) => {
					alert(error.message);
				});

				// add user's public data into users list ordered by user name:
				set(ref(database, "users/listOrderedByUserName/" + signUpData.userName), {
					firstName: signUpData.firstName,
					lastName: signUpData.lastName,
					userId: userCredential.user.uid,
				}).catch((error) => {
					alert(error.message);
				});
			})
			.catch((error) => {
				alert(error.message);
			});
	};

	const logOut = async () => {
		try {
			await signOut(firebaseAuth);
		} catch (error) {
			alert(error.message);
		}
	};

	//===================== UPDATE USER DATA

	const updateUserPublicData = (userData) => {
		// save prev userName val:
		const prevUserName = userPublicData.userName;
		// update user data:
		set(ref(database, "users/" + user.uid + "/publicData/data"), {
			...userData,
		}).catch((error) => {
			alert(error.message);
		});

		// update user's public data in users list ordered by keys:
		set(ref(database, "users/listOrderedByKeys/" + user.uid), {
			...userData,
		}).catch((error) => {
			alert(error.message);
		});

		// update user's public data in users list ordered by user name:
		if (userData.userName === prevUserName) {
			// if userName wasn't updated:
			set(ref(database, "users/listOrderedByUserName/" + prevUserName), {
				firstName: userData.firstName,
				lastName: userData.lastName,
				userId: user.uid,
			}).catch((error) => {
				alert(error.message);
			});
		} else {
			// if userName was updated:
			// delete prev userName record:
			remove(ref(database, "users/listOrderedByUserName/" + prevUserName))
				.then(() => console.log(prevUserName, "record was deleted from database."))
				.catch((error) => {
					alert(error.message);
				});
			// set new userName record:
			set(ref(database, "users/listOrderedByUserName/" + userData.userName), {
				firstName: userData.firstName,
				lastName: userData.lastName,
				userId: user.uid,
			})
				.then(() => console.log(userData.userName, "record was added to database."))
				.catch((error) => {
					alert(error.message);
				});
		}
	};

	//===================== DELETE USER PUBLIC & PRIVATE DATA & DELETE USER FROM USERS LISTS

	const deleteUserPublicAndPrivateDataAndDeleteUserFromUsersLists = () => {
		// NOTE: use this method only after all blogs & articles are deleted !!!!!!!!!!!!!!!!!

		const userName = userPublicData.userName;
		// delete user public data:
		remove(ref(database, "users/" + user.uid))
			.then(() =>
				console.log("User's", user.uid, userName, "public & private data were deleted.")
			)
			.catch((error) => {
				alert(error.message);
			});

		// delete user's public data from users list ordered by keys:
		remove(ref(database, "users/listOrderedByKeys/" + user.uid))
			.then(() =>
				console.log(
					"User",
					user.uid,
					userName,
					"was deleted from users list ordered by keys."
				)
			)
			.catch((error) => {
				alert(error.message);
			});

		// delete user's public data from users list ordered by user name:
		remove(ref(database, "users/listOrderedByUserName/" + userName))
			.then(() => console.log(userName, "record was deleted from database."))
			.catch((error) => {
				alert(error.message);
			});
	};

	//==================== DELETE USER ACCOUNT

	const deleteUserAccount = () => {
		// NOTE: use this method only after deleting user's public & private data & all blogs & articles are deleted !!!!!!!!!!!!!!!!!

		const userForDelete = firebaseAuth.currentUser;
		deleteUser(userForDelete)
			.then(() => {
				console.log("User " + userForDelete.uid + " was deleted.");
				alert("Your account was successfully deleted! Good bye!");
			})
			.catch((error) => {
				alert(
					error.message,
					"Try again to delete your account after logging again. Your blogs & user data were already deleted."
				);
			});
	};

	function fetchUserBlogsList() {
		const currentUserDataRef = ref(database, "users/" + user.uid + "/publicData/blogs");
		onValue(currentUserDataRef, (snapshot) => {
			const data = snapshot.val();
			console.log("current user blogs list data object:", data);
			setUserBlogsList(data);
		});
		console.log("DATA WAS FETCHED: USER BLOGS LIST");
	}

	useEffect(() => {
		onAuthStateChanged(firebaseAuth, (user) => {
			if (user) {
				setUser(user);
				console.log("user logged in. user:", user);
				const userPublicDataRef = ref(database, "users/" + user.uid + "/publicData/data");
				onValue(userPublicDataRef, (snapshot) => {
					const data = snapshot.val();
					console.log("user public data:", data);
					setUserPublicData(data);
					console.log("DATA WAS FETCHED: USER PUBLIC DATA");
				});
			} else {
				setUser(null);
				setUserPublicData(null);
				console.log("user is logged out");
			}
		});
	}, []);

	const value = {
		signIn,
		signUp,
		logOut,
		user,
		userPublicData,
		userBlogsList,
		fetchUserBlogsList,
		updateUserPublicData,
		deleteUserPublicAndPrivateDataAndDeleteUserFromUsersLists,
		deleteUserAccount,
	};

	return <DatabaseContext.Provider value={value}>{children}</DatabaseContext.Provider>;
}
