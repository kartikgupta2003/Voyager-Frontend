import React , {useState , useEffect} from "react";
import { IoIosSend } from "react-icons/io";
import { Button } from "../components/ui/button";
import axios from "axios";
import { useUser, useClerk } from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-react";

const InfoSection = ({ trip }) => {
    const { getToken } = useAuth();
    const [imgUrl , setImgUrl] = useState("");

    useEffect(()=>{
        const fetchImage = async()=>{
            try{
                const token = await getToken();
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,   // 🔥 this is REQUIRED
                    }
                }
                const {data} = await axios.get(`https://voyager-frontend-8fox.vercel.app/api/trip/photo?name=${trip.destination}&lat=${trip.lat}&lng=${trip.long}` , config);
                setImgUrl(data.imageUrl);
                
            }catch(err){
                // console.log("Image fetch error: " , err);
            }
        }

        fetchImage();
    } , [trip.destination]);
    return (
        <div>
            <img src={imgUrl || "/sample voyage image.jpg"} className="h-[340px] w-full object-cover rounded-xl" />
            <div className="flex justify-between items-center">
                <div className="my-5 flex flex-col gap-2">
                    <h2 className="font-bold text-2xl">{trip?.destination}</h2>
                    <div className="flex gap-5">
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">🗓️ {trip?.duration} Day</h2>
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">💰 {trip?.budget} Budget</h2>
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">🥂 No. Of Travellers: {trip?.noOfPeople}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoSection;