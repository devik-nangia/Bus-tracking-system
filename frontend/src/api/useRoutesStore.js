import axios from 'axios';
import { create } from "zustand"
import toast from "react-hot-toast"

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = 'http://localhost:3000/api';

export const useRoutesStore = create((set, get) => ({
    getRoutes: async () => {
        const response = await axios.get(`${API_URL}/routes`);
        return response.data;
    },

    createRoute: async (routeData) => {
        const response = await axios.post(`${API_URL}/routes`, routeData);
        toast.success("Route created successfully!")
        return response.data;
    },

    updateRoute: async (id, routeData) => {
        const response = await axios.put(`${API_URL}/routes/${id}`, routeData);
        const { setRoutes } = get()
        setRoutes()
        return response.data;
    },

    deleteRoute: async (id) => {
        const response = await axios.delete(`${API_URL}/routes/${id}`);
        const { setRoutes } = get()
        toast.success("Route deleted successfully!")
        setRoutes()
        return response.data;
    },
    routes: [],
    setRoutes: async () => {
        try {
            const { getRoutes } = get()
            const res = await getRoutes()
            // console.log(res)
            set({ routes: res })
        } catch (error) {
            console.log("error with setRoutes function", error)
        }
    },
    activeRoute: null,
    setActiveRoute: (route) => {
        set({ activeRoute: route });
        console.log("Updated active route:", route);
    },
    occupiedCapacity: 0,
    getRouteMap: async (route) => {
        try {
            const response = await axios.get(`https://maps.googleapis.com/maps/api/staticmap?size=500x500&key=${API_KEY}&maptype=hybrid&path=${route.startLocation}|${route.endLocation}&markers=${route.startLocation}|${route.endLocation}`, {
                responseType: 'blob'
            });
            return URL.createObjectURL(response.data);
        } catch (error) {
            console.log("error with getRouteMap", error)
        }
    }
}))