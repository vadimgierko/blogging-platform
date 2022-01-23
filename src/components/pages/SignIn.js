import { useDatabase } from "../../hooks/use-database";
import Form from "../organisms/Form";
import { SIGN_IN } from "../../initial-data/form-structure-templates";

export default function SignIn() {
	const { signIn } = useDatabase();

	function handleSubmit(signInData) {
		if (signInData.email.replace(/\s/g, "").length) {
			if (signInData.password.replace(/\s/g, "").length) {
				signIn(signInData);
			} else {
				alert("You need to input your password (& not only white spaces...) to log in!");
			}
		} else {
			alert("You need to input your email (& not only white spaces...) to log in!");
		}
	}

	return (
		<div className="sign-in-page container">
			<h1>Sign in!</h1>
			<hr />
			<Form
				formClassname="sign-in-form"
				structure={SIGN_IN}
				onSubmit={handleSubmit}
				to="/dashboard"
				text="log in"
			/>
		</div>
	);
}
