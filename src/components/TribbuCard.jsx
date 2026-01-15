import { Link } from "react-router-dom";

function TribbuCard({ _id, name, ownerId, members = [] }) {
    return (
        <div className="border rounded p-4 bg-white space-y-3">
            <Link to={`/tribbus/${_id}`}>
                <h3 className="text-lg font-semibold hover:underline">
                    {name}
                </h3>
            </Link>

            {ownerId && (
                <p className="text-sm">
                    <strong>Owner:</strong> {ownerId.name || ownerId}
                </p>
            )}

            <div>
                <h4 className="font-medium text-sm">Members:</h4>

                {members.length === 0 ? (
                    <p className="text-sm italic text-slate-500">
                        No members yet
                    </p>
                ) : (
                    <ul className="text-sm space-y-1">
                        {members.map((member) => (
                            <li key={member.userId._id}>
                                {member.userId.name} —{" "}
                                <strong>{member.role}</strong>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <Link to={`/tribbus/edit/${_id}`}>
                <button className="text-sm bg-slate-200 px-3 py-1 rounded hover:bg-slate-300">
                    Edit Tribbu
                </button>
            </Link>
        </div>
    );
}

export default TribbuCard;