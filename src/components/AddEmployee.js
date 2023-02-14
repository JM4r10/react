import React, { useState } from 'react';
// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AddEmployee(props) {
    const [show, setShow] = useState(false);

    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [img, setImg] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const resetState = () =>{
        setTimeout(
            handleClose(),
            setImg(''),
            setName(''),
            setRole(''),
            0)
    }    
    
    return (
        <>
            <button
                className='block mx-auto m-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'
                onClick={handleShow}
            >
                + Add Employee
            </button>


            <Modal show={show} onHide={resetState}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault(); //prevents a page refresh 
                            props.newEmployee(name, role, img);
                        }}
                        id='addModal'
                        className="w-full max-w-sm"
                    >
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                    htmlFor="name">
                                    Full Name
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="name"
                                    type="text"
                                    placeholder='Your Name'
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value)
                                    }}
                                />
                            </div>
                        </div>

                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                    htmlFor="role">
                                    Role
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="role"
                                    placeholder='Your Role'
                                    type="text"
                                    value={role}
                                    onChange={(e) => {
                                        setRole(e.target.value)
                                    }}
                                />
                            </div>
                        </div>

                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label
                                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                                    htmlFor="img"
                                >
                                    Image URL
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="img"
                                    placeholder='https://www.yourImageHere.com'
                                    type="text"
                                    value={img}
                                    onChange={(e) => {
                                        setImg(e.target.value)
                                    }}
                                />
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className='bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 border border-blue-700 rounded'
                        onClick={resetState}
                    >
                        Close
                    </button>
                    <button
                        className='bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'
                        form='addModal'
                        onClick={resetState}
                    >
                        Add
                    </button>
                </Modal.Footer>

            </Modal>
        </>
    );
}

export default AddEmployee;