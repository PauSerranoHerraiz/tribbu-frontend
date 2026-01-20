import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function TribbuGatePage() {
  const { user, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      navigate("/login");
    } else if (!user.tribbuId) {
      navigate("/create-tribbu");
    } else {
      navigate(`/tribbus/${user.tribbuId._id}`);
    }
  }, [user, isLoading, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-50">
      <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200 text-center">
        {isLoading ? (
          <p className="text-slate-600 text-lg">Cargando Tribbu...</p>
        ) : (
          <p className="text-slate-600 text-lg">Redirigiendo...</p>
        )}
      </div>
    </div>
  );
}

export default TribbuGatePage;
