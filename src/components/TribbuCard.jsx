import { Link } from "react-router-dom";
import Card from "./ui/Card";
import RoleBadge from "./ui/RoleBadge";
import Button from "./ui/Button";

function TribbuCard({ name, role, onClick }) {
  return (
    <Card>
      <h2 className="text-xl font-semibold text-slate-800 mb-2">{name}</h2>
      <RoleBadge role={role} />
      <div className="mt-4">
        <Button onClick={onClick}>Entrar</Button>
      </div>
    </Card>
  );
}

export default TribbuCard;