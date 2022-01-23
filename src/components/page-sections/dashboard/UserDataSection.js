import { useDatabase } from "../../../hooks/use-database";
import Form from "../../organisms/Form";
import { EDIT_USER_DATA } from "../../../initial-data/form-structure-templates";
import { useEffect, useState } from "react";

export default function UserDataSection() {
	const {
		user,
		userPublicData,
		updateUserPublicData,
		fetchUserBlogsList,
		userBlogsList,
		deleteUserAccount,
		deleteUserPublicAndPrivateDataAndDeleteUserFromUsersLists,
	} = useDatabase();

	const [isDeletingAccountProcedureStarted, setIsDeletedAccountProcedureStarted] =
		useState(false);

	function handleSubmit(data) {
		if (
			data.firstName.replace(/\s/g, "").length &&
			data.lastName.replace(/\s/g, "").length &&
			data.userName.replace(/\s/g, "").length
		) {
			updateUserPublicData(data);
		} else {
			alert(
				"You need to complete all input fields (not only white spaces...) to update your account data!"
			);
		}
	}

	useEffect(() => {
		if (!userBlogsList) {
			fetchUserBlogsList();
		}
	}, [userBlogsList]);

	useEffect(() => {
		if (isDeletingAccountProcedureStarted) {
			if (userBlogsList) {
				alert(
					"You have blogs in database. You need to delete them manually first, and then you can delete your account. So go to your blogs section and delete your blogs."
				);
			} else {
				if (userPublicData) {
					console.log(
						"Deleting user account procedure started. 1. Delete user private & public data first."
					);
					deleteUserPublicAndPrivateDataAndDeleteUserFromUsersLists();
				} else {
					console.log("User public & private data was deleted. 2. Delete user now.");
					deleteUserAccount();
				}
			}
		}
	}, [isDeletingAccountProcedureStarted, userBlogsList, userPublicData]);

	if (!userPublicData && !isDeletingAccountProcedureStarted)
		return <p>Downloading your data...</p>;

	if (isDeletingAccountProcedureStarted) {
		if (user) {
			return <p className="text-center text-danger">Deleting account... Please wait..</p>;
		} else {
			console.log("User was deleted.");
			return <p className="text-center text-success">User was successfully deleted.</p>;
		}
	}

	return (
		<div className="edit-user-data-section">
			<Form
				structure={EDIT_USER_DATA}
				data={userPublicData}
				onSubmit={handleSubmit}
				to="/dashboard"
				text="save changes"
				formClassname="edit-user-data-form"
			/>
			<div className="d-grid">
				<button
					className="btn btn-outline-danger mb-3 mt-2"
					onClick={() => {
						// eslint-disable-next-line no-restricted-globals
						const wantToDelete = confirm(
							"Are you sure, you want to delete your account & all of your data forever? There's no turning back... Delete account?"
						);
						if (wantToDelete) {
							if (userBlogsList) {
								alert(
									"You have blogs in database. You need to delete them manually first, and then you can delete your account. So go to your blogs section and delete your blogs."
								);
							} else {
								// start delete account procedure
								setIsDeletedAccountProcedureStarted(true);
							}
						}
					}}
				>
					Delete my account
				</button>
			</div>
		</div>
	);
}
