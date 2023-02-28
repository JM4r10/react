import { useState } from "react"
import { baseURL } from "../shared";
import CatStatus from "../components/CatStatus"

export default function Login() {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [catStatus, setCatStatus] = useState(undefined);

    function login(e) {
        e.preventDefault();
        const url = baseURL + 'api/token/';
        fetch(url,{
            method: 'POST',
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify({
                username: username,
                password:password,
            })
        })
            .then(response => {
                if (!response.ok) {
                    setCatStatus(response.status);
                    throw new Error('Something went wrong with the login');
                }
                setCatStatus(response.status);
                return response.json()
            })
            .then(data => {
                console.log(data);
            }).catch(e => {
                console.log(e);
            })
    }

    return (
        <>
            <form
                className="w-full max-w-sm"
                id="customer"
                onSubmit={login}
            >
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/4">
                        <label htmlFor='name'>Username</label>
                    </div>
                    <div className="md:w-3/4">
                        <input
                            className="bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id='username'
                            type='text'
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value)
                            }}
                        />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/4">
                        <label htmlFor='industry'>Password</label>
                    </div>
                    <div className="md:w-3/4">
                        <input
                            id='password'
                            className="bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            type='password'
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                        />
                    </div>
                </div>
                <button
                    className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                >
                    LOGIN
                </button>
            </form>
            {catStatus ? <CatStatus errorName={catStatus} /> : null}

        </>
    )
}