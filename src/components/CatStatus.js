import { useEffect, useState } from "react"

export default function CatStatus(props) {
    
    const [errorCat, setErrorCat] = useState()
        
    useEffect(()=>{
        setErrorCat("https://http.cat/"+props.errorName)        
    },[props.errorName])
    
    return (
        <>
            {errorCat ? <img className="m-auto pt-2" src={errorCat} alt='http cat_status' /> : null}
        </>
    )
}