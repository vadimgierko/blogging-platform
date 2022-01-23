import { useDatabase } from "../../hooks/use-database";
import Form from "../organisms/Form";
import { SIGN_UP } from "../../initial-data/form-structure-templates";

export default function SignUp() {
	const { signUp } = useDatabase();

	function handleSubmit(signUpData) {
		if (
			signUpData.email.replace(/\s/g, "").length &&
			signUpData.firstName.replace(/\s/g, "").length &&
			signUpData.lastName.replace(/\s/g, "").length &&
			signUpData.password.replace(/\s/g, "").length &&
			signUpData.userName.replace(/\s/g, "").length
		) {
			signUp(signUpData);
		} else {
			alert(
				"You need to complete all input fields (not only white spaces...) to create an account!"
			);
		}
	}

	return (
		<div className="sign-up-page container">
			<h1>Create account!</h1>
			<hr />
			<Form
				formClassname="sign-up-form"
				structure={SIGN_UP}
				onSubmit={handleSubmit}
				//onSubmit={() => alert("I'm currently updating the app according to new database structure & security rules, so you can't create an account at the moment... Sorry, wait a few days!")}
				to="/dashboard"
				text="sign up"
			/>
		</div>
	);
}
