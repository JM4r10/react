import { useEffect, useState } from "react";
import { v4 as uuid4 } from 'uuid';
import { useParams } from "react-router-dom";

export default function Definition() {

    const [word, setWord] = useState();
    let { search } = useParams();


    useEffect(() => {
        fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + search)
            .then((response) => response.json())
            .then((data) => {
                setWord(data[0].meanings);
                console.log(data[0].meanings)
            });
    }, []);

    return (
        <>
            <h1>Here is a definition:</h1>
            {/* Ternary operator to give time for useEffect() to initialize word state*/}
            {word
                ? word.map((meaning) => {
                    const category = meaning.partOfSpeech;
                    return (
                        <p
                            key={uuid4()}
                            className="px-2">
                            <i>{`${category.charAt(0).toUpperCase()}${category.slice(1)}: `}</i>
                            {`${meaning.definitions[0].definition}`}</p>
                    )
                }) : null}
        </>
    )
}