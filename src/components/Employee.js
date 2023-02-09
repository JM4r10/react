function Employee(props){
    return (
    <>
    <h3>Employee {props.name}</h3>
    <p>{props.role ? props.role : 'No role'}</p>

    {/* If the ternary condition needs to return elements of different nature */}
    {props.role ? (
    <p className='role'>{props.role}</p>)
    : ( 
    <h4 className='norole'>No role</h4>
    )} 
    </>)
    
}

export default Employee; //