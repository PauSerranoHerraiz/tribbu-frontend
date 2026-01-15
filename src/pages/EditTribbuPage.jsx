import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import tribbusService from "../services/tribbu.service";
import AddMember from "../components/AddMember";

function EditTribbusPage(props) {
    const [name, setName] = useState("");
    const [members, setMembers] = useState([]);

    const navigate = useNavigate();
    const { tribbuId } = useParams();

    useEffect(() => {
        tribbusService.getTribbu(tribbuId)
            .then((response) => {
                const oneTribbu = response.data;
                setName(oneTribbu.name);
                setMembers(oneTribbu.members);
            })
            .catch((error) => console.log(error));
    }, [tribbuId]);

    const refreshMembers = () => {
        tribbusService.getTribbu(tribbuId)
            .then((response) => setMembers(response.data.members || []))
            .catch((error) => console.log(error));
    };

    const handleMemberChange = (index, field, value) => {
        const updatedMembers = [...members];
        if (field === "role") {
            updatedMembers[index].role = value;
        }
        setMembers(updatedMembers);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const requestBody = { name, members };

        tribbusService.updateTribbu(tribbuId, requestBody)
            .then((response) => {
                navigate(`/tribbus`)
            });
    };

    const deleteTribbu = () => {
        tribbusService.deleteTribbu(tribbuId)
            .then(() => navigate("/tribbus"))
            .catch((err) => console.log(err));
    };

    return (
        <div className="EditTribbuPage">
            <h3>Edit the Tribbu</h3>

            <AddMember tribbuId={tribbuId} onMemberAdded={refreshMembers} /> 

            <form onSubmit={handleFormSubmit}>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label>Members:</label>
                {members && members.length > 0 ? (
                    members.map((member, index) => (
                        <div key={member.userId._id} className="member-edit">
                            <p><strong>{member.userId.name}</strong></p>
                            <select
                                value={member.role}
                                onChange={(e) => handleMemberChange(index, "role", e.target.value)}
                            >
                                <option value="GUARDIÁN">GUARDIÁN</option>
                                <option value="PROTECTOR">PROTECTOR</option>
                                <option value="SABIO">SABIO</option>
                                <option value="CACHORRO">CACHORRO</option>
                            </select>
                        </div>
                    ))
                ) : (
                    <p><em>No members yet</em></p>
                )}

                <button type="submit">Update Tribbu</button>
            </form>

            <button onClick={deleteTribbu}>Delete Tribbu</button>
        </div>
    );
}

export default EditTribbusPage;