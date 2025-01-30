import React, { useEffect, useState } from 'react';
import { useRoutesStore } from "../api/useRoutesStore";

const RouteMap = () => {
    const { getRouteMap, activeRoute } = useRoutesStore();
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            const fetchedImage = await getRouteMap(activeRoute); // Fetch the image URL
            setImageUrl(fetchedImage); // Update state with the URL
        };

        fetchImage();
    }, [getRouteMap]);

    return (
        <div className="flex items-center h-[100vh] justify-center w-full bg-slate-50">
            <div className=" w-1/2 border flex flex-col items-center rounded-xl shadow-xl bg-white justify-center pb-4">
                <h1 className='text-3xl font-bold text-gray-800 mt-3'>{activeRoute.name}</h1>
                <p className='text-sm mt-1 mb-3'>Currently: <span
                      className={`px-2 py-1 rounded-full text-xs ${activeRoute.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                        }`}
                    >
                      {activeRoute.status}
                    </span></p>
                {imageUrl ? (
                    <img src={imageUrl} alt="Route Map" /> // Display the image
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div >
    );
};

export default RouteMap;
