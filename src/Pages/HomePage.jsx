import {React , useEffect} from "react";
import Hero from "../Utils/Hero";
import Header from "../Utils/header";
import { useNavigate } from "react-router-dom";

const HomePage = ()=>{
    const navigate = useNavigate();

    useEffect(()=>{
        navigate("/" ,{ replace: true });
    } , [])
    return (
        <>
        <Header></Header>
        <Hero></Hero>
        </>
    )
}

export default HomePage;