import React from "react";
import PlaceCard from "./PlaceCard";

const Itenarary = ({ trip }) => {
    return (
        <div className="mt-5">
            <h2 className="font-bold text-lg">Places to Visit</h2>
            <div>
                {trip?.itinerary?.map((tr, idx) => {
                    return (
                        <div key={idx} className="mt-5">
                            <h2 className="font-medium text-lg">Day {tr.dayNumber}</h2>
                            <div className="grid md:grid-cols-2 gap-5">
                                {tr?.plan.map((pl, idxs) => {
                                    return (
                                        <div key={idxs}>
                                            <h2 className="font-medium text-sm text-orange-600">Best time to visit - {pl.bestTimeToVisit}</h2>
                                            <PlaceCard place={pl} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Itenarary;