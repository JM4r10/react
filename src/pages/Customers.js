import { useEffect, useState } from "react";
import { Link, } from "react-router-dom";
import AddCustomer from "../components/AddCustomer";
import { baseURL } from "../shared";

export default function Customers() {

    const [customers, setCustomers] = useState();
    const [show, setShow] = useState(false);


    useEffect(() => {
        console.log('Fetching...')
        fetch(baseURL + 'api/customers')
            .then((response => response.json()))
            .then((data) => {
                console.log(data.customers);
                setCustomers(data.customers);
            })
            .catch((e) => console.log(e))
    }, []);

    function toggleShow() {
        setShow(!show);
    }

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
                console.log("dataPOST",data)
                setCustomers([...customers,data.customer]);
            })
            .catch(e => console.log(e))
    }
    return (
        <>
            <h1>Here are our customers:</h1>
            <ul>
                {customers ?
                    customers.map((customer) => {
                        return (
                            <li key={customer.id}>
                                <Link to={'/customers/' + customer.id}>
                                    $ {customer.name}
                                </Link>
                            </li>
                        )
                    })
                    : null}
            </ul>
            <AddCustomer newCustomer={newCustomer} show={show} toggleShow={toggleShow} />
        </>)
}