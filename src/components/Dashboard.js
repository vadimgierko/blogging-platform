import { useState } from "react";
import { database } from "../firebase";
import { ref, set } from "firebase/database";

export default function Dashboard({ userId, userData }) {

    const [data, setData] = useState(userData ? userData : null);

    function handleSubmit() {
        console.log(data);
        set(ref(database, 'users/' + userId), {
            ...data
        });
    }
    
    return (
        <div>
            <h1>Dashboard</h1>
            <hr />
            <form>
                <div className="mb-2">
                    <p>Your real first name:</p>
                    <input
                        type="input"
                        className="form-control"
                        defaultValue={data ? data.firstName : null }
                        onChange={(e) => setData({...data, firstName: e.target.value})}
                    />
                </div>
                <div className="mb-2">
                    <p>Your real last name:</p>
                    <input
                        type="input"
                        className="form-control"
                        defaultValue={data ? data.lastName : null}
                        onChange={(e) => setData({...data, lastName: e.target.value})}
                    />
                </div>
                <button type="button" className="btn btn-outline-success" onClick={handleSubmit}>Save changes</button>
            </form>
        </div>
    );
}