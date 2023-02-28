import { useParams, Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import CatStatus from "../components/CatStatus";
import { baseURL } from "../shared";


export default function Customer() {

    const { id } = useParams(); // Surrounding a variable on curly braces allows to assign it the property of an object, in this case the one useParams() returns.
    const navigate = useNavigate();
    const [customer, setCustomer] = useState();
    const [tempCustomer, setTempCustomer] = useState();
    const [catStatus, setCatStatus] = useState(undefined);
    const [notFound, setNotFound] = useState(false);
    const [changed, setChanged] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        if (!customer) return;
        if (!customer) return;

        let equal = true;
        if (customer.name !== tempCustomer.name) equal = false;

        if (customer.industry !== tempCustomer.industry) equal = false;

        if (equal) setChanged(false);

    });

    useEffect(() => {
        const url = baseURL + 'api/customers/' + id;
        fetch(url, {
            headers: {
                'Content-type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('access'),
            },
        })
            .then((response => {
                if (response.status === 404) {
                    setCatStatus(response.status);
                    setNotFound(true);
                } else if (response.status === 401) {
                    navigate('/login');
                    setCatStatus(response.status);
                }
                if (!response.ok) {
                    //redirect to 404 page
                    // navigate('/404');
                    //render a 404 component
                    setCatStatus(response.status)
                    throw new Error('Something went wrong with the response');
                }
                setCatStatus(response.status)
                return response.json()
            }))
            .then((data) => {
                setCustomer(data.customer)
                setTempCustomer(data.customer);
                setError(undefined);
            })
            .catch(e => {
                setError(e.message);
                console.log(e);
            })

    }, []);

    function updateCustomer(event) {
        event.preventDefault();
        const url = baseURL + 'api/customers/' + id;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('access'),
            },
            body: JSON.stringify(tempCustomer)
        })
            .then((response) => {
                if (response.status === 401) {
                    navigate('/login');
                }
                if (!response.ok) {
                    setCatStatus(response.status)
                    throw new Error('Something went wrong while updating data');
                }
                setCatStatus(response.status)
                return response.json();
            })
            .then((data) => {
                setCustomer(data.customer)
                setChanged(false);
                setError(undefined);
            })
            .catch(e => {
                setError(e.message);
            })
    }

    function deleteCustomer() {
        const url = baseURL + 'api/customers/' + id;
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('access'),
            },
        })
            .then((response) => {
                if (response.status === 401) {
                    navigate('/login');
                    setCatStatus(response.status);
                }
                if (!response.ok) {
                    setCatStatus(response.status)
                    throw new Error('Something went wrong while deleting data')
                }
                setCatStatus(response.status);
                setError(undefined);
                navigate('/customers');
            })
            .catch(e => setError(e.message))
    }

    return (
        <div className="p-3">
            {notFound ? <CatStatus errorName={catStatus} /> : null}

            {customer ?
                <div>
                    <form
                        className="w-full max-w-sm"
                        id="customer"
                        onSubmit={updateCustomer}
                    >
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/4">
                                <label htmlFor='name'>Name</label>
                            </div>
                            <div className="md:w-3/4">
                                <input
                                    className="bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id='name'
                                    type='text'
                                    value={tempCustomer.name}
                                    onChange={(e) => {
                                        setChanged(true);
                                        setTempCustomer({
                                            ...tempCustomer,
                                            name: e.target.value
                                        });
                                    }}
                                />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/4">
                                <label htmlFor='industry'>Industry</label>
                            </div>
                            <div className="md:w-3/4">
                                <input
                                    id='industry'
                                    className="bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    type='text'
                                    value={tempCustomer.industry}
                                    onChange={(e) => {
                                        setChanged(true);
                                        setTempCustomer({
                                            ...tempCustomer,
                                            industry: e.target.value
                                        });
                                    }}
                                />
                            </div>
                        </div>
                    </form>
                    {changed ?
                        <div className="mb-2">
                            <button
                                className='bg-gray-500 hover:bg-red-600 text-white font-bold py-2 px-4 mr-2 border border-blue-700 rounded'
                                onClick={(e) => {
                                    setTempCustomer({ ...customer })
                                    setChanged(false)
                                }}
                            >
                                CANCEL
                            </button>

                            <button
                                className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded'
                                form="customer"
                            // onClick={updateCustomer}
                            >
                                SAVE
                            </button>

                        </div>
                        : null}
                    <button
                        className='block bg-gray-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'
                        onClick={deleteCustomer}
                    >
                        DELETE
                    </button>

                </div>
                : null
            }
            {error
                ? <>
                    <p>{error}</p>
                </>
                : null}
            <br />
            <Link
                className="no-underline bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 border rounded"
                to='/customers'
            >
                ← Go back
            </Link>
            {catStatus !== 404
                ? <div className="m-2">
                    <CatStatus errorName={catStatus} />
                </div>
                : null}
        </div>
    )
}