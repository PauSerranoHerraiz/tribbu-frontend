import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import EventsSection from "../components/events/EventsSection";

function HomePage() {
  const { user, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) navigate("/login");
  }, [isLoading, user, navigate]);

  if (isLoading || !user) return <p>Cargando...</p>;

  const tribbu = user.tribbuId;

  if (!tribbu) return <p>No tienes una tribbu asignada aún.</p>;

  const { name, _id, members } = tribbu;

  const userMember = members?.find(
    (member) => String(member.userId) === String(user._id)
  );
  const role = userMember?.role || "SABIO";

  console.log("members:", members);
  console.log("userMember:", userMember);
  console.log("role:", role);

  return (
    <div>
      <h1>{name}</h1>
      <p>
        Tu rol: <strong>{role}</strong>
      </p>

      <hr />

      <EventsSection tribbuId={_id} role={role} />

      {role === "GUARDIÁN" && (
        <section>
          <h2>Administración</h2>
          <button>Gestionar miembros</button>
        </section>
      )}
    </div>
  );
}

export default HomePage;