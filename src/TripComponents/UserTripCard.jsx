import React , {useState , useEffect} from "react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserTripCard  = ({trip})=>{
    const { getToken } = useAuth();
    const [imgUrl , setImgUrl] = useState("");
    const navigate = useNavigate();
    
    
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
                    const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/trip/photo?name=${trip.destination}&lat=${trip.lat}&lng=${trip.long}` , config);
                    setImgUrl(data.imageUrl);
                    
                }catch(err){
                    // console.log("Image fetch error: " , err);
                }
            }
    
            fetchImage();
        } , [trip.destination]);

    return(
        <div onClick={()=> navigate(`/show-trip/${trip._id}`)} className="cursor-pointer hover:scale-105 transition-all">
            <img src={imgUrl || "/sample voyage image.jpg"} className="object-cover rounded-xl h-[220px]"></img>
            <div>
                <h2 className="font-bold text-lg">{trip?.destination}</h2>
                <h2 className="text-sm text-gray-500">{trip?.duration} Days trip with {trip?.budget} Budget</h2>
            </div>
        </div>
    )
}

export default UserTripCard;