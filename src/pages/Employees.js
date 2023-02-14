import Employee from '../components/Employee';
import '../index.css';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AddEmployee from '../components/AddEmployee';
import EditEmployee from '../components/EditEmployee';
import Header from '../components/Header';

function Employees() {

    const [employees, setEmployees] = useState(
        [
            {
                id: uuidv4(),
                name: "Caleb",
                role: "Developer",
                img: "https://images.pexels.com/photos/775358/pexels-photo-775358.jpeg"
            },

            {
                id: uuidv4(),
                name: "Abby",
                role: "Manager",
                img: "https://images.pexels.com/photos/5212320/pexels-photo-5212320.jpeg"
            },

            {
                id: uuidv4(),
                name: "Joe",
                role: "Backend programmer",
                img: "https://images.pexels.com/photos/1933873/pexels-photo-1933873.jpeg"
            },

            {
                id: uuidv4(),
                name: "Samantha",
                role: "HR",
                img: "https://images.pexels.com/photos/2709388/pexels-photo-2709388.jpeg"
            },

            {
                id: uuidv4(),
                name: "Gracie",
                role: "UI developer",
                img: "https://images.pexels.com/photos/3310695/pexels-photo-3310695.jpeg"
            },

            {
                id: uuidv4(),
                name: "Nubia",
                role: "Senior",
                img: "https://images.pexels.com/photos/4355346/pexels-photo-4355346.jpeg"
            }
        ]
    );
    const showEmployees = true;

    function updateEmployee(id, newName, newRole) {
        const updatedEmployees = employees.map((employee) => {
            if (employee.id === id) {
                return { ...employee, name: newName, role: newRole } //spreading
            }
            return employee
        });
        setEmployees(updatedEmployees);
    }

    function newEmployee(name, role, img) {
        const addedEmployee = {
            id: uuidv4(),
            name: name,
            role: role,
            img: img
        }
        setEmployees([...employees, addedEmployee])
    }

    return (
        <div className="App bg-gray-200 min-h-screen">

            {showEmployees ?
                <>
                    <div className='flex flex-wrap justify-center my-2'>
                        {employees.map((employee) => {
                            const editEmployee = (
                                <EditEmployee
                                    id={employee.id}
                                    name={employee.name}
                                    role={employee.role}
                                    updateEmployee={updateEmployee}
                                />);
                            return (
                                <Employee
                                    key={employee.id}
                                    id={employee.id}
                                    name={employee.name}
                                    role={employee.role}
                                    img={employee.img}
                                    editEmployee={editEmployee}
                                />
                            )

                        })}
                    </div>
                </>
                :
                <p>You cannot see the employees</p>
            }
            <AddEmployee
                newEmployee={newEmployee}
            />
        </div>
    );
}

export default Employees;