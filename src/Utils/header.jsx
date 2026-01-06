import React, { useEffect } from "react"
import { Button } from '../components/ui/button'
import { useNavigate } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import { useUser, useClerk } from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

const Header = () => {
    const { getToken } = useAuth();
    const { isSignedIn, user } = useUser();
    const navigate = useNavigate();


    useEffect(() => {
        const handleLogin = async () => {
            const token = await getToken();

            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,   // 🔥 this is REQUIRED
                    }
                };

                const { data } = await axios.get("https://voyager-i63d.onrender.com/api/user/addNew", config);

                // console.log(data.user);

                localStorage.setItem("userInfo" , JSON.stringify(data.user));
            } catch (error) {
                // console.error("User sync failed:", error);
            }
        }

        if (isSignedIn) {
            handleLogin();
        }
    }, [isSignedIn]);

    return (
        <div className="p-2 shadow-sm flex justify-between" style={{ alignContent: "center" }}>
            <img src='/Voyager.png'></img>
            <div className="flex items-center gap-3">
                <Button
                        variant="outline"
                        className="rounded-full cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        Home Page 
                    </Button>

                {/* If user is logged in */}
                <SignedIn>
                    <Button
                        variant="outline"
                        className="rounded-full cursor-pointer"
                        onClick={() => navigate("/trip-planner")}
                    >
                        + Create Trip
                    </Button>
                    <Button
                        variant="outline"
                        className="rounded-full cursor-pointer"
                        onClick={() => navigate("/my-trips")}
                    >
                        My Trips
                    </Button>

                    <UserButton
                        appearance={{
                            elements: {
                                avatarBox: "h-[35px] w-[35px]"
                            }
                        }}
                    />
                </SignedIn>

                {/* If user is NOT logged in */}
                <SignedOut>
                    <SignInButton mode="modal">
                        <Button className="cursor-pointer">Sign In</Button>
                    </SignInButton>
                </SignedOut>
            </div>
        </div>
    )
}

export default Header;