import { useState, useEffect } from "react";
import axios from "axios";
import tribbusService from "../services/tribbu.service"; 
import AddTribbu from "../components/CreateTribbu"; 
import TribbuCard from "../components/TribbuCard";

const API_URL = "http://localhost:5005";

function TribbuListPage() {
    const [tribbus, setTribbus] = useState([]);

    const getAllTribbus = () => {

        tribbusService
            .getAllTribbus()
            .then((response) => setTribbus(response.data))
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getAllTribbus();
    }, []);
    
        return (

            <div className="TribbuListPage">
                <AddTribbu refreshTribbus={getAllTribbus} />

                {tribbus.map((tribbu) => (
                    <TribbuCard key={tribbu._id} {...tribbu} />
                ))}
            </div>
        );
}

export default TribbuListPage;
