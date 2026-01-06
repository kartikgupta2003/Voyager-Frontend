import React , {useState , useEffect} from "react";
import {toast} from "react-toastify";

const MAPTILER_KEY = import.meta.env.VITE_MAPTILER_KEY;

const AutoComplete = ({onSelectPlace , savedQuery})=>{
    const [query , setQuery] = useState("");
    const [suggestions , setSuggestions] = useState([]);

    useEffect(()=>{
        if(savedQuery){
            setQuery(savedQuery)
        }
        else setQuery("");
    } , [savedQuery]);

    const handleInputChange = async(e)=>{
        const value = e.target.value;
        setQuery(value);

        if(value.length < 2){
            setSuggestions([]);
            return ;
        }

        try{
            const res = await fetch(`https://api.maptiler.com/geocoding/${value}.json?key=${MAPTILER_KEY}&limit=5`);
            const data = await res.json();
            // console.log(data);
            setSuggestions(data.features || []);
        }catch(err){
            return toast.error("Error fetching suggestions!");
        }
    }

    const handleSelect = (place) =>{
        setQuery(place.
place_name
)
        setSuggestions([]);
        onSelectPlace(place);
    }

    return(
        <div className="relative w-full  mt-1 text-left">
            <input type="text" value={query} onChange={handleInputChange} placeholder="Search for a place..."
            className="w-full p-2 border rounded-md outline-none"></input>
            {suggestions.length>0 && (
                <ul className="absolute z-10 w-full bg-white border rounded-md mt-1 shadow-md">
                    {suggestions.map((place)=>{
                        return(
                            <li
                            key={place.id}
                            onClick={()=> handleSelect(place)}
                            className="p-2 cursor-pointer hover:bg-gray-100">
                                {place.place_name}
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}

export default AutoComplete;