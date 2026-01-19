import { Link } from "react-router-dom";
import Card from "./ui/Card";
import Button from "./ui/Button";
import RoleBadge from "./ui/RoleBadge";

function TribbuCard({ _id, name, ownerId, members = [] }) {
    return (
        <Card>
            <Link to={`/tribbus/${_id}`}>
                <h3 className="text-lg font-semibold text-slate-800 hover:underline">
                    {name}
                </h3>
            </Link>

            {ownerId && (
                <p className="text-sm text-slate-600">
                    <span className="font-medium">Owner:</span>{" "}
                    {ownerId.name || ownerId}
                </p>
            )}

            <div>
                <h4 className="font-medium text-sm text-slate-700 mb-1">
                    Members
                </h4>

                {members.length === 0 ? (
                    <p className="text-sm italic text-slate-500">
                        No members yet
                    </p>
                ) : (
                    <ul className="text-sm space-y-1">
                        {members.map((member) => (
                            <li
                                key={member.userId._id}
                                className="flex items-center gap-2"
                            >
                                <span className="text-slate-700">
                                    {member.userId.name}
                                </span>
                                <RoleBadge role={member.role} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="flex justify-end gap-2 pt-2">
                <Link to={`/tribbus/edit/${_id}`}>
                    <Button variant="ghost">
                        Edit
                    </Button>
                </Link>

                <Link to={`/tribbus/${_id}`}>
                    <Button>
                        Open
                    </Button>
                </Link>
            </div>
        </Card>
    );
}

export default TribbuCard;
