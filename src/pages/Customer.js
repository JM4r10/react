import { useParams, Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import NotFound from "../components/NotFound";
import { baseURL } from "../shared";


export default function Customer() {

    const [customer, setCustomer] = useState();
    const [notFound, setNotFound] = useState(false);
    const { id } = useParams(); // Surrounding a variable on curly braces allows to assign it the property of an object, in this case the one useParams() returns.
    const navigate = useNavigate();

    useEffect(() => {
        const url = baseURL + 'api/customers/' + id;
        fetch(url)
            .then((response => {
                if (!response.ok) {
                    if (response.status === 404) {
                        //redirect to 404 page
                        // navigate('/404');
                        //render a 404 component
                        setNotFound(true)
                    }
                    throw new Error('Something went wrong with the response');
                }
                return response.json()
            }))
            .then((data) => {
                console.log(data)
                setCustomer(data.customer)
            })
            .catch(e => console.log(e))

    }, []);

    function deleteCustomer() {
        const url = baseURL + 'api/customers/' + id;
        fetch(url, {
            method: 'DELETE', headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Something went wrong')
                }
                navigate('/customers');
            })
            .catch(e => console.log(e))
    }

    return (
        <>
            {notFound ? <NotFound /> :
                <>
                    {customer ?
                        <div>
                            <h1>{customer.name}</h1>
                            <p>{customer.id}</p>
                            <p>{customer.industry}</p>
                        </div>
                        : null}
                    <button onClick={deleteCustomer}>DELETE</button>
                </>
            }
            <br></br>
            <Link to='/customers'>Go back to Customers</Link>
        </>
    )
}