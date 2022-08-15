import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { userAdded } from "./usersSlice";

export function AddUser() {
  const dispatch = useDispatch();
  const history = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState(null);

  const handleTitle = (e) => setTitle(e.target.value);
  const handleBody = (e) => setBody(e.target.value);

  const usersAmount = useSelector((state) => state.users.entities.length);

  const handleClick = () => {
    if (title && body) {
      dispatch(
        userAdded({
          id: usersAmount + 1,
          title,
          body,
        })
      );

      setError(null);
      history.push("/");
    } else {
      setError("Fill in all fields");
    }

    setTitle("");
    setBody("");
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Add user</h1>
      </div>
      <div className="row">
        <div className="three columns">
          <label htmlFor="titleInput">Title</label>
          <input
            className="u-full-width"
            type="text"
            id="titleInput"
            onChange={handleTitle}
            value={title}
          />
          <label htmlFor="bodyInput">Description</label>
          <input
            className="u-full-width"
            type="text"
            id="bodyInput"
            onChange={handleBody}
            value={body}
          />
          {error && error}
          <button onClick={handleClick} className="button-primary">
            Add user
          </button>
        </div>
      </div>
    </div>
  );
}