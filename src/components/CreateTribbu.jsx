import { useState } from "react";
import tribbusService from "../services/tribbu.service";

function CreateTribbu(props) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { name };

    tribbusService.createTribbu(requestBody)
      .then((response) => {
        setName("");
       props.refreshTribbus();
      })
      .catch((error) => console.log(error));
  };


  return (
    <div className="AddTribbu">
      <h3>Add Tribbu</h3>

      <form onSubmit={handleSubmit}>
        <label>Tribbu Name:</label>
        <input
          type="text"
          name="name"
          placeholder="Tribbu Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateTribbu;