import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser, useClerk } from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import UserTripCard from "../TripComponents/UserTripCard";
import Header from "../Utils/header";

const MyTrips = () => {
    const { getToken } = useAuth();
    const [userTrips, setUserTrips] = useState([]);
    const user = JSON.parse(localStorage.getItem("userInfo"));
    const location = useLocation();


    useEffect(() => {
        const fetch = async () => {
            const token = await getToken();

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,   // 🔥 this is REQUIRED
                }
            };
            try {
                const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/trip/fetchAll`, { userId: user._id }, config);

                // console.log("apki trip " , data);

                setUserTrips(data);
            } catch (err) {
                window.scrollTo({ top: 0, behavior: "smooth" });
                return toast.error(err.response.data.message);
            }
        }

        fetch();
    }, [location.pathname]);

    return (
        <>
        <Header></Header>
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
            <h2 className="font-bold text-3xl">My Trips</h2>
            <div className="grid grid-cols-2 mt-10 md:grid-cols-3 gap-5">
                {userTrips.length>0 ? userTrips.map((trip , idx)=>{
                    return <UserTripCard key={idx} trip={trip}/>
                }) : (
                    <>No trips yet — start planning your first one! 🌍</>
                )}
            </div>
        </div>
        </>
    )
}

export default MyTrips;