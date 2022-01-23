import { createContext, useContext, useState } from "react";
import { database } from "../firebase";

import { ref, onValue, query, limitToFirst } from "firebase/database";

const ListsContext = createContext();

export const useLists = () => useContext(ListsContext);

export function ListsProvider({ children }) {
	const [usersListOrderedByUserName, setUsersListOrderedByUserName] = useState();
	const [usersListOrderedByKeys, setUsersListOrderedByKeys] = useState();

	const [blogsListOrderedByKeys, setBlogsListOrderedByKeys] = useState();

	const fetchBlogsListOrderedByKeys = () => {
		const listRef = query(ref(database, "blogs/listOrderedByKeys"), limitToFirst(100));
		onValue(listRef, (snapshot) => {
			const data = snapshot.val();
			console.log("blogs list ordered by keys:", data);
			setBlogsListOrderedByKeys(data);
		});
		console.log("DATA WAS FETCHED: BLOGS LIST ORDERED BY KEYS");
	};

	const fetchUsersListOrderedByUserName = () => {
		const listRef = query(ref(database, "users/listOrderedByUserName"), limitToFirst(100));
		onValue(listRef, (snapshot) => {
			const data = snapshot.val();
			console.log("users list ordered by user name object:", data);
			setUsersListOrderedByUserName(data);
		});
		console.log("DATA WAS FETCHED: USERS LIST ORDERED BY USER NAME");
	};

	const fetchUsersListOrderedByKeys = () => {
		const listRef = query(ref(database, "users/listOrderedByKeys"), limitToFirst(100));
		onValue(listRef, (snapshot) => {
			const data = snapshot.val();
			console.log("users list ordered by user id object:", data);
			setUsersListOrderedByKeys(data);
		});
		console.log("DATA WAS FETCHED: USERS LIST ORDERED BY KEYS");
	};

	const value = {
		usersListOrderedByKeys,
		usersListOrderedByUserName,
		blogsListOrderedByKeys,
		fetchUsersListOrderedByKeys,
		fetchUsersListOrderedByUserName,
		fetchBlogsListOrderedByKeys,
	};

	return <ListsContext.Provider value={value}>{children}</ListsContext.Provider>;
}
