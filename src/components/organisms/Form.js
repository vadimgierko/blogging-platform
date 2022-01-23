import { useEffect, useState } from "react";
import LinkButton from "../atoms/LinkButton";

export default function Form({ structure, data, onSubmit, text, to, formClassname }) {
	const [itemArray, setItemArray] = useState();

	useEffect(() => {
		if (structure) {
			const itemArray = [];
			// transform structure / data object into array:
			Object.keys(structure).map((key) => {
				const keyValuePair =
					data && data[key] // is item passed ?
						? [key, data[key]] // set item[key] value
						: [
								// if no item
								key,
								structure[key].value // does structure[key] has value ?
									? structure[key].value // if true, use structure[key] value
									: "", // if false, set empty value to the key
						  ];
				return itemArray.push(keyValuePair);
			});
			if (data) {
				console.log("item array created from passed data:", itemArray);
			} else {
				console.log("item array created from structure template:", itemArray);
			}
			setItemArray([...itemArray]);
		}
	}, [structure, data]);

	if (!structure || (structure && !itemArray))
		return <p>Nothing has been passed to the Form component...</p>;

	return (
		<form className={formClassname}>
			<div className="row mb-3">
				{Object.keys(structure).map((key, i) => (
					<div className="mb-2" key={key + "-input-div"}>
						<input
							className="form-control"
							type={structure[key].type ? structure[key].type : "text"}
							value={itemArray[i] ? itemArray[i][1] : ""} // fix this !!!!!!!!!!!
							placeholder={
								structure[key].placeholder ? structure[key].placeholder : key
							}
							onChange={(e) => {
								const updatedItem = [...itemArray];
								updatedItem[i] = [...updatedItem[i]];
								updatedItem[i][1] = e.target.value;
								setItemArray([...updatedItem]);
							}}
						/>
					</div>
				))}
			</div>
			<LinkButton
				text={text}
				style="success"
				to={to}
				onClick={() => {
					// tranform item / data array back to object & pass it:
					onSubmit(Object.fromEntries(itemArray));
				}}
			/>
		</form>
	);
}
