import { useState, useEffect, useContext } from "react";
import tribbusService from "../services/tribbu.service"; 
import AddTribbu from "../components/CreateTribbu"; 
import TribbuCard from "../components/TribbuCard";
import { AuthContext } from "../context/auth.context";

function TribbuListPage() {
    const [tribbus, setTribbus] = useState([]);
    const { user } = useContext(AuthContext);

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
                <TribbuCard 
                    key={tribbu._id} 
                    {...tribbu}
                    userId={user?._id}
                />
            ))}
        </div>
    );
}

export default TribbuListPage;