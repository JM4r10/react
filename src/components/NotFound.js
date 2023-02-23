import { useEffect, useState } from "react"

export default function NotFound(props) {
    
    const [errorCat, setErrorCat] = useState()
        
    useEffect(()=>{
        setErrorCat("https://http.cat/"+props.errorName)        
    },[props.errorName])
    
    return (
        <>
            {errorCat ? <img className="m-auto pt-2" src={errorCat} alt='404 - file not found' /> : null}
        </>
    )
}