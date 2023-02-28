import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DefinitionSearch() {

    const [word, setWord] = useState('');
    const navigate = useNavigate();

    return (
        <form
            className="flex space-between space-x-2 max-w-[300px]"
            onSubmit={() => {
                navigate(`/dictionary/${word}`)
            }}
        >
            <input
                className="shrink min-w-0 px-2 py-1 rounded"
                placeholder="Search for..."
                type="text"
                onChange={(e) => {
                    setWord(e.target.value);

                }}
            />
            <button
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-1 px-2 border border-blue-700 rounded"
            >Search</button>
            {/* by default, a button inside a form would trigger the onSubmit property the same way pressing Enter would do  */}
        </form>
    )

}