import {react} from "react";
import {Button} from "../components/ui/button";
import { useNavigate } from "react-router-dom";


const Hero = ()=>{
    const navigate = useNavigate();

    const handleClick = ()=>{
        navigate("/trip-planner");
    }

    return(
       <div className="flex flex-col items-center mx-56 gap-9">
        <h1 className="font-extrabold text-[40px] text-center mt-10">
            <span className="text-[#f56551]">Plan your next adventure with Voyager: </span>Personalized Itineraries at your fingertips !</h1>
            <p className="text-xl text-gray-500 text-center">Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.</p>
            <Button className="cursor-pointer" onClick={handleClick}>Get Started , It's Free</Button>
       </div> 
    )
}

export default Hero;