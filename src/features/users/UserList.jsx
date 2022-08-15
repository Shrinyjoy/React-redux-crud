import { fetchUsers, userDeleted } from "./usersSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from '@mui/material/Button';


import { Link } from "react-router-dom";

export function UserList() {
  const dispatch = useDispatch();

  const { entities } = useSelector((state) => state.users);
  const loading = useSelector((state) => state.loading);

  const handleDelete = (id) => {
    dispatch(userDeleted({ id }));
  };

  return (
    <div className="container">
      <div className="row">
        <h1>React-Redux CRUD app</h1>
      </div>
      <div className="row">
        <div className="two columns">
          <button
            onClick={() => dispatch(fetchUsers())}
            className="button-primary"
          >
            Load users
          </button>
        </div>
        <div className="two columns">
          <Link to="/add-user">
            <button className="button-primary">Add user</button>
          </Link>
        </div>
      </div>
      <div className="row">
        {loading ? (
          "Loading..."
        ) : (
          <table className="u-full-width">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {entities.length &&
                entities.map(({ id, title, body }, i) => (
                  <tr key={i}>
                    <td>{id}</td>
                    <td>{title}</td>
                    <td>{body}</td>
                    <td>
                      <Button variant="contained" onClick={() => handleDelete(id)} style={{background: "red"}}>Delete</Button>
                
                      <Link to={`/edit-user/${id}`}>
                        <Button variant="contained" style={{background: "green"}}>Edit</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}