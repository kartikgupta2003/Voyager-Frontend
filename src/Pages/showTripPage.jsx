import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import InfoSection from "../TripComponents/InfoSection";
import HotelSection from "../TripComponents/HotelSection";
import Itenarary from "../TripComponents/placesToVisit";
import Footer from "../TripComponents/Footer";
import Header from "../Utils/header";
import { useUser, useClerk } from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-react";


const ShowTrip = () => {
    const { getToken } = useAuth();
    const { id } = useParams();

    const [trip, setTrip] = useState([]);

    const getTripData = async () => {
        const token = await getToken();
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,   // 🔥 this is REQUIRED
                }
            }

            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/trip/fetch`, { id }, config);
                // console.log(data);
                setTrip(data);

            } catch (err) {
                window.scrollTo({ top: 0, behavior: "smooth" });
                return toast.error(err.response.data.message);
            }
        }

    useEffect(() => {
            id && getTripData();
        }, [id]);

        return (
            <>
                <Header></Header>
                <div className="p-10 md:px-20 lg:px-44 xl:px-56">
                    {/* information section */}
                    <InfoSection trip={trip} />
                    {/* recommended hotels */}
                    <HotelSection trip={trip} />
                    {/* itenary */}
                    <Itenarary trip={trip} />
                    {/* footer */}
                    <Footer trip={trip} />
                </div>
            </>
        )
    }

    export default ShowTrip;