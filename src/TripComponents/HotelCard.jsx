import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser, useClerk } from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-react";


const HotelCard = ({ hotel }) => {
    const { getToken } = useAuth();
    const [imgUrl, setImgUrl] = useState("");

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const token = await getToken();
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,   // 🔥 this is REQUIRED
                    }
                }
                const { data } = await axios.get(
                    `https://voyager-i63d.onrender.com/api/trip/photo?name=${hotel.HotelName}&lat=${hotel.latitude}&lng=${hotel.longitude}`,
                    config
                );
                setImgUrl(data.imageUrl);
            } catch (err) {
                // console.log("Hotel image fetch error: ", err);
            }
        };

        fetchImage();
    }, [hotel.HotelName]);

    return (
        <div className="hover:scale-105 transition-all cursor-pointer"
        >
            <img src={imgUrl || "/sample voyage image.jpg"} className="rounded-xl w-full h-40 object-cover"></img>
            <div className="my-2 flex flex-col gap-2">
                <h2 className="font-medium">{hotel?.HotelName}</h2>
                <h2 className="text-xs text-gray-500">📍 {hotel?.address}</h2>
                <h2 className="text-xs text-gray-500">🔍 {hotel?.description}</h2>
                <h2 className="text-sm">💰 {hotel?.pricePerNight}</h2>
                <h2 className="text-sm">⭐ {hotel?.rating}</h2>
            </div>
        </div>
    );
};

export default HotelCard;