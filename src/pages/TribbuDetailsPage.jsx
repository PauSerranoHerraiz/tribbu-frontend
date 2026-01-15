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

    useEffect(() => {
        const fetchTribbu = async () => {
            try {
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

        fetchTribbu();
    }, [tribbuId, navigate]);

    if (loading) return <p>Cargando tribu...</p>;
    
    if (error) return <p className="error">{error}</p>;
    
    if (!tribbu) return <p>Tribu no encontrada</p>;

    return (
        <div className="container mx-auto p-4 space-y-6">
            <h1 className="text-2xl font-bold">{tribbu.name}</h1>

            <AddChild
                tribbuId={tribbu._id}
                onChildAdded={(newChild) =>
                    setChildren((prev) => [...prev, newChild])
                }
            />

            <div>
                <h2 className="text-xl font-semibold mb-2">Niños</h2>

                {children.length === 0 ? (
                    <p>No hay niños todavía</p>
                ) : (
                    <ul className="space-y-2">
                        {children.map((child) => (
                            <li
                                key={child._id}
                                className="border rounded p-2 bg-slate-50"
                            >
                                <p className="font-medium">{child.name}</p>
                                <p className="text-sm text-slate-600">
                                    Nacimiento: {child.birthDate?.slice(0, 10)}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default TribbuDetailsPage