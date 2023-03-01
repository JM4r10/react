import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AddCustomer from "../components/AddCustomer";
import { baseURL } from "../shared";
import { LoginContext } from "../App";

export default function Customers() {
    const [loggedIn, setLoggedIn] = useContext(LoginContext);
    const [customers, setCustomers] = useState();
    const [show, setShow] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    function toggleShow() {
        setShow(!show);
    }

    useEffect(() => {
        const url = baseURL + 'api/customers';
        // Since GET method is the default, is not necesary to put it in the body of the second param 
        fetch(url, {
            headers: {
                'Content-type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('access'),
            },
        })
            .then((response) => {
                if (response.status === 401) {
                    setLoggedIn(false);
                    console.log('loggedIn', loggedIn);
                    navigate('/login', {
                        state: {
                            previousUrl: location.pathname,
                        }
                    });
                }
                console.log('loggedIn', loggedIn);
                return response.json()
            }
            )
            .then((data) => {
                console.log(data.customers);
                setCustomers(data.customers);
            })
            .catch((e) => console.log(e))
    }, []);

    function newCustomer(name, industry) {
        const data = {
            name: name,
            industry: industry
        };
        const url = baseURL + 'api/customers';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("something went wrong")
                }
                return response.json();
            })
            .then((data) => {
                toggleShow();
                console.log("dataPOST", data)
                setCustomers([...customers, data.customer]);
            })
            .catch(e => console.log(e))
    }
    return (
        <>
            <h1>Here are our customers:</h1>

            {customers ?
                customers.map((customer) => {
                    return (
                        <div className="m-2" key={customer.id}>
                            <Link to={'/customers/' + customer.id}>
                                <button className="no-underline bg-slate-500 hover:bg-purple-700 text-white font-bold py-2 px-3 border rounded">
                                    {customer.name}
                                </button>
                            </Link>
                        </div>
                    )
                })
                : null}

            <AddCustomer newCustomer={newCustomer} show={show} toggleShow={toggleShow} />
        </>)
}