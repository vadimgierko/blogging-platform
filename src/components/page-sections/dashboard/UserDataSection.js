import { useDatabase } from "../../../hooks/use-database";
import Form from "../../organisms/Form";
import LinkButton from "../../atoms/LinkButton";
import { EDIT_USER_DATA } from "../../../initial-data/form-structure-templates";

export default function UserDataSection() {

    const { userPublicData, updateUserPublicData, deleteUserAccount } = useDatabase();

    function handleSubmit(data) {
        if (
            data.firstName.replace(/\s/g, '').length &&
            data.lastName.replace(/\s/g, '').length &&
            data.userName.replace(/\s/g, '').length
        ) {
            updateUserPublicData(data);
        } else {
            alert("You need to complete all input fields (not only white spaces...) to update your account data!");
        }
    }

    if (!userPublicData) return <p>Downloading your data...</p>
    
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
            <LinkButton
                to="/dashboard"
                style="danger"
                text="delete my account"
                onClick={() => {
                    // eslint-disable-next-line no-restricted-globals
                    const wantToDelete = confirm("Are you sure, you want to delete your account & your articles forever? There's no turning back... Delete account?");
                    if (wantToDelete) {
                        //alert("Sorry, for a moment there are no delete account function in this app... Please, contact to the owner of this app to delete your account manually.");
                        deleteUserAccount();
                    }
                }}
            />
        </div>
    );
}