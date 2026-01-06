import { React, useState, useEffect } from "react";
import Header from "../Utils/header";
import { useLocation } from "react-router-dom";
import AutoComplete from "../Utils/AutoComplete";
import { Input } from "@/components/ui/input";
import { selectTravelList, selectBudgetOptions } from "../constants/options";
import { Button } from "../components/ui/button";
import { toast } from "react-toastify";
import axios from "axios";
import { Spinner } from "../components/ui/spinner";
import { useNavigate } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-react";




const CreateTrip = () => {
  const { getToken } = useAuth();
  const location = useLocation();
  const { isSignedIn, user } = useUser();
  const clerk = useClerk();

  const [formData, setFormData] = useState({
    destination: {},
    duration: "",
    budget: "",
    noOfPeople: "",
    preferences: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const savedInfo = localStorage.getItem("pendingTripForm");
    if (savedInfo) {
      setFormData(JSON.parse(savedInfo));
      localStorage.removeItem("pendingTripForm");
      setLoading(false);
    }
  }, []);

  const handleInput = (name, value) => setFormData({ ...formData, [name]: value });

  // Submit the actual trip to backend
  const submitTrip = async () => {
    // Validation
    if (formData.duration > 20) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return toast.error("Trip days cannot be more than 20 days!");
    }
    if (Number(formData.duration) === 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return toast.error("Trip duration should be atleast 1 day!");
    }
    if (formData.budget === "" || formData.noOfPeople === "" || !formData.destination.place_name) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return toast.error("Please fill all the fields!");
    }

    if (!isSignedIn) {
      localStorage.setItem("pendingTripForm", JSON.stringify(formData));
      clerk.openSignIn();         // opens Clerk login popup
      return;
    }

    const token = await getToken();
    
    const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,   // 🔥 this is REQUIRED
    }
  };

    const {data} = await axios.get("https://voyager-frontend-8fox.vercel.app/api/user/addNew" , config);
    localStorage.setItem("userInfo" , JSON.stringify(data.user));


    const body = {
      location: formData.destination.place_name,
      duration: Number(formData.duration),
      budget: formData.budget,
      people: formData.noOfPeople,
      preferences: formData.preferences
    };

    // const config = {
    //   headers: { "Content-type": "application/json" },
    //   withCredentials: true
    // };/
      
    
  

    try {
      setLoading(true);
      const { data } = await axios.post("https://voyager-frontend-8fox.vercel.app/api/trip/plan", body, config);

      setLoading(false);
      setFormData({
        destination: {},
        duration: "",
        budget: "",
        noOfPeople: "",
        preferences: ""
      });
      navigate(`/show-trip/${data._id}`);
    } catch (err) {
      // console.log(err.response.data);
      setLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return toast.error("AI service failed!");
    }
  };



  return (
    <>
      <Header />
      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
        <h2 className="font-bold text-3xl text-[#f56551]">Tell us your travel preferences</h2>
        <p className="mt-3 text-gray-500 text-xl">Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>
        <div className="mt-20">
          <div className="flex flex-col items-start">
            <h2 className="text-xl my-3 font-medium">What is your destination ?</h2>
            <AutoComplete
              savedQuery={formData.destination?.place_name}
              onSelectPlace={(loc) => setFormData({ ...formData, destination: loc })}
            />
          </div>
        </div>

        <div className="mt-10">
          <div className="flex flex-col items-start">
            <h2 className="text-xl my-3 font-medium">How many days will your trip last?</h2>
            <Input onChange={(e) => handleInput("duration", e.target.value)} placeholder="e.g. 3" type="number" value={formData.duration} />
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-xl my-3 font-medium">What is your budget ?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {selectBudgetOptions.map((obj, idx) => (
              <div
                onClick={() => handleInput("budget", obj.title)}
                key={idx}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${obj.title === formData.budget && "shadow-lg border-black"}`}
              >
                <h2 className="text-4xl">{obj.icon}</h2>
                <h2 className="font-bold text-lg">{obj.title}</h2>
                <h2 className="text-sm text-gray-500">{obj.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-xl my-3 font-medium">Who do you plan on travelling with on your next adventure ?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {selectTravelList.map((obj, idx) => (
              <div
                onClick={() => handleInput("noOfPeople", obj.people)}
                key={idx}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${obj.people === formData.noOfPeople && "shadow-lg border-black"}`}
              >
                <h2 className="text-4xl">{obj.icon}</h2>
                <h2 className="font-bold text-lg">{obj.title}</h2>
                <h2 className="text-sm text-gray-500">{obj.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <div className="flex flex-col items-start">
            <h2 className="text-xl my-3 font-medium">Any additional preference or description?</h2>
            <Input onChange={(e) => handleInput("preferences", e.target.value)} placeholder="e.g. ‘We love water sports’, ‘I prefer peaceful clean beaches’, ‘Avoid crowded places’" type="text" value={formData.preferences} />
          </div>
        </div>

        {loading ? (
          <div className="my-10 justify-end flex">
            <Spinner />
          </div>
        ) : (
          <div className="my-10 justify-end flex">
            <Button className={"cursor-pointer"} onClick={submitTrip}>Generate Trip</Button>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateTrip;
