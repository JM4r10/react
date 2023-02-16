import { useEffect, useState } from "react";
import { v4 as uuid4 } from 'uuid';

export default function Customers() {

    const [customers, setCustomers] = useState();

    useEffect(() => {
        console.log('Fetching...')
        fetch('http://localhost:8000/api/customers')
            .then((response => response.json()))
            .then((data) => {
                console.log(data.customers);
                setCustomers(data.customers);
            })
            .catch((e) => console.log(e))
    }, []);
    return (
        <>
            <h1>Here are our customers:</h1>
            {customers ?
                customers.map((customer) => {
                    return <p
                        key={uuid4()}
                    >
                        $ {customer.name} 
                        </p>
                })
                : null}
        </>)
}