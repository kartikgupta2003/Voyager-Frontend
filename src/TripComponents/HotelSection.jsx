import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HotelCard from "./HotelCard";

const HotelSection = ({ trip }) => {
    const navigate = useNavigate();

    return (
        <div>
            <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                {trip?.hotelOptions?.map((hotel, idx) => {
                    return (
                        <div key={idx}>
                            <HotelCard hotel={hotel}/>
                        </div>                            
                    )
                })}
            </div>
        </div>
    )
}

export default HotelSection;