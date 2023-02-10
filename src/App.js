import Employee from './components/Employee';
import './index.css';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Next } from 'react-bootstrap/esm/PageItem';

function App() {
  const [role, setRole] = useState('dev');
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
      if (employee.id == id) {
        return { ...employee, name: newName, role: newRole } //spreading
      }
      return employee
    });
    setEmployees(updatedEmployees);
  }

  return (
    <div className="App">
      {showEmployees ?
        <>
          <input
            id='inputNombre'
            type='text'
            onChange={(e) => {
              console.log(e.target.value);
              setRole(e.target.value);
            }}
          />
          <div className='flex flex-wrap justify-center'>
            {employees.map((employee) => {

              return (
                <Employee
                  key={employee.id}
                  id={employee.id}
                  name={employee.name}
                  role={employee.role}
                  img={employee.img}
                  updateEmployee={updateEmployee}
                />
              )

            })}
          </div>


        </>
        :
        <p>You cannot see the employees</p>
      }
    </div>
  );
}

export default App;
