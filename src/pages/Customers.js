import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddCustomer from "../components/AddCustomer";
import { baseURL } from "../shared";

export default function Customers() {

    const [customers, setCustomers] = useState();
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    
    function toggleShow() {
        setShow(!show);
    }

    useEffect(() => {
        fetch(baseURL + 'api/customers')
            .then((response) => {
                if(response.status === 401){
                    navigate('/login');
                }
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