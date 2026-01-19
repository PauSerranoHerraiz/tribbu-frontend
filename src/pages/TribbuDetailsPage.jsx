import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AddChild from "../components/AddChild";

function TribbuDetailsPage() {
    const { tribbuId } = useParams();
    const navigate = useNavigate();
    const [tribbu, setTribbu] = useState(null);
    const [children, setChildren] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTribbu = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("authToken");
            
            if (!token) {
                navigate("/login");
                return;
            }

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/tribbus/${tribbuId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Tribbu data:", response.data); // Debug
            console.log("Children:", response.data.children); // Debug
            
            setTribbu(response.data);
            setChildren(response.data.children || []);
            setError(null);
        } catch (err) {
            console.error("Error fetching tribbu:", err);
            setError("No se pudo cargar la tribu");
            setTribbu(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTribbu();
    }, [tribbuId]);

    const handleChildAdded = async (newChild) => {
        console.log("Child added, refetching..."); 
        await fetchTribbu(); 
    };

    if (loading) return <p>Cargando tribu...</p>;
    
    if (error) return <p className="error">{error}</p>;
    
    if (!tribbu) return <p>Tribu no encontrada</p>;

    return (
        <div className="container mx-auto p-4 space-y-6">
            <h1 className="text-2xl font-bold">{tribbu.name}</h1>

            <AddChild
                tribbuId={tribbu._id}
                onChildAdded={handleChildAdded}
            />

            <div>
                <h2>Niños ({children.length})</h2>

                {children.length === 0 ? (
                    <p>No hay niños todavía</p>
                ) : (
                    <ul>
                        {children.map((child) => (
                            <li key={child._id}>
                                <p><strong>{child.name}</strong></p>
                                <p>Nacimiento: {child.birthDate ? new Date(child.birthDate).toLocaleDateString() : 'N/A'}</p>
                                <p>Notas: {child.notes || 'Sin notas'}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default TribbuDetailsPage;