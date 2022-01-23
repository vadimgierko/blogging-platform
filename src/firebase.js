import { initializeApp, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
//import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
	apiKey: "AIzaSyCDziv5T2lwy_1jcHriik2c9hWd1qPcY_s",
	authDomain: "blogging-platform-4ebc2.firebaseapp.com",
	databaseURL: "https://blogging-platform-4ebc2-default-rtdb.firebaseio.com",
	projectId: "blogging-platform-4ebc2",
	storageBucket: "blogging-platform-4ebc2.appspot.com",
	messagingSenderId: "669118367342",
	appId: "1:669118367342:web:0348ae0115ae90740dc87f",
	measurementId: "G-PQXT1EE1GJ",
};

// Initialize Firebase
let app;
try {
	app = getApp();
} catch (e) {
	app = initializeApp(firebaseConfig);
}

export const firebaseAuth = getAuth(app);
export const database = getDatabase(app);
//const analytics = getAnalytics(firebaseApp);
