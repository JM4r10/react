import { useEffect, useState } from "react";
import { v4 as uuid4 } from 'uuid';
import { useNavigate, useParams, Link } from "react-router-dom";
import CatStatus from "../components/CatStatus";
import DefinitionSearch from "../components/DefinitionSearch";

export default function Definition() {

    const [word, setWord] = useState();
    const [notFound, setNotFound] = useState(false);
    const [error, setError] = useState(false);
    const [catStatus, setCatStatus] = useState(undefined);

    let { search } = useParams();
    // const navigate = useNavigate();

    useEffect(() => {
        // const url = "http://httpstat.us/404";
        const url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + search

        fetch(url)
            .then((response) => {
                if (response.status === 404) {
                    // navigate('/404');
                    setNotFound(true);
                    setCatStatus(response.status);
                }
                if (!response.ok) {
                    setCatStatus(response.status);
                    setError(true)                    
                    throw new Error('Something went wrong');
                }
                return response.json()
            })
            .then((data) => {
                setWord(data[0].meanings);
                console.log(data[0].meanings)
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    if (notFound === true) {
        return (
            <>
                {catStatus
                    ?
                    <>
                        <CatStatus errorName={catStatus} />
                        <Link className="flex justify-center my-3" to='/dictionary'>Please try another word</Link>
                    </>
                    : null}

            </>
        )

    }

    if (error === true) {
        return (
            <>
                <CatStatus errorName={catStatus} />
                <p>Something went wrong</p>
                <Link className="flex justify-center my-3" to='/dictionary'>Please try another word</Link>
            </>
        )
    }

    return (
        <>
            {/* Ternary operator to give time for useEffect() to initialize word state*/}
            {word ? (
                <>
                    <h1>Here is a definition:</h1>
                    {word.map((meaning) => {
                        const category = meaning.partOfSpeech;
                        return (
                            <p
                                key={uuid4()}
                                className="px-2">
                                <i>{`${category.charAt(0).toUpperCase()}${category.slice(1)}: `}</i>
                                {`${meaning.definitions[0].definition}`}
                            </p>
                        )
                    })}
                    <p>Would you like to search again?</p>
                    <DefinitionSearch />
                </>
            ) : null}
        </>
    )
}