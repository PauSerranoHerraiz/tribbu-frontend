import { Link } from "react-router-dom";

function TribbuCard({ _id, name, ownerId, members = [], userId }) {
    return (
        <div className="tribbu-card">
            <h3>{name}</h3>
            {ownerId && <p><strong>Owner:</strong> {ownerId.name || ownerId}</p>}

            {members && members.length > 0 && (
                <div className="members">
                    <h4>Members:</h4>
                    <ul>
                        {members.map((member) => (
                            <li key={member.userId._id}>
                                {member.userId.name} - <strong>{member.role}</strong>
                            </li>
                        ))}
                        <Link to={`/tribbus/edit/${_id}`}>
                            <button>Edit Tribbu</button>
                        </Link>
                    </ul>

                </div>
            )}

            {(!members || members.length === 0) && (
                <p><em>No members yet</em></p>
            )}
        </div>
    );


}

export default TribbuCard;