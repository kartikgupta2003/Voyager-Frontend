import React , {useEffect , useState} from "react";
import axios from "axios";
import { useUser, useClerk } from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-react";

const PlaceCard = ({place})=>{
    const [imgUrl , setImgUrl] = useState("");
    const { getToken } = useAuth();

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
                const {data} = await axios.get(`https://voyager-frontend-8fox.vercel.app/api/trip/photo?name=${place.placeName}&lat=${place.lat}&lng=${place.long}` , config);
                setImgUrl(data.imageUrl)
            }catch(err){
                // console.log("Image fetch error: " , err);
            }
        }

        fetchImage();
    } , [place.placeName]);

    return(
        <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md">
            <img src={imgUrl || "/sample voyage image.jpg"} className="w-[130px] h-[130px] rounded-xl"/>
            <div>
                <h2 className="font-bold text-lg">{place?.displayName}</h2>
                <p className="text-sm text-gray-400">{place.placeDetails}</p>
                <h2 className="mt-2">Time to travel :- {place.timeToTravel}</h2>
                <h2 className="mt-2">💵 {place.ticketPricing}</h2>
            </div>
        </div>
    )
}

export default PlaceCard;