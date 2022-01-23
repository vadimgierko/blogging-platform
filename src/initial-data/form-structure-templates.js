// add as much inputs, as you like
// according to template below:

// some_key_representanting_variable: { // name of the key / variable
//   type: "password", // (OPTIONAL) include type only if it's value is not "text"
//   value: "some value", // (OPTIONAL) if it's empty, skip this key-value pair
//   placeholder: "some placeholder" // (OPTIONAL) if it's same as key / variable name, skip it
// }

// if all properties are defaul & skipped,
// add a key_name: {},

export const SIGN_IN = {
	email: {
		type: "email",
	},
	password: {
		type: "password",
	},
};

export const EDIT_USER_DATA = {
	firstName: {
		placeholder: "input your real first name",
	},
	lastName: {
		placeholder: "input your real last name",
	},
	userName: {
		placeholder: "input your user name using lower case letters only",
	},
};

export const SIGN_UP = {
	...EDIT_USER_DATA,
	...SIGN_IN,
};

export const CREATE_BLOG = {
	title: {},
	description: {},
};
