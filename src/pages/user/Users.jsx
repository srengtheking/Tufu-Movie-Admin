import { useState } from "react";
import { Link } from "react-router-dom";

import UserForm from "../../components/UserForm";
import { useUsers } from "../../hooks/useUsers";

function Users() {
  const { users, loading, addUser, editUser, removeUser } = useUsers();

  const [selectedUser, setSelectedUser] = useState(null);

  function handleEdit(user) {
    setSelectedUser(user);
  }

  async function handleUpdate(id, user) {
    await editUser(id, user);

    setSelectedUser(null);
  }

  function handleCancel() {
    setSelectedUser(null);
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this user?")) {
      return;
    }

    await removeUser(id);
  }

  return (
    <div>
      <h1>Users</h1>

      <UserForm
        key={selectedUser?.id ?? "new-user"}
        formData={selectedUser}
        onCreate={addUser}
        onUpdate={handleUpdate}
        onCancel={handleCancel}
      />

      <hr />

      {loading && <p>Loading...</p>}

      {!loading && users.length === 0 && <p>No users found.</p>}

      {users.map((user) => (
        <div key={user.id}>
          <h3>{user.username}</h3>
          <p>{user.email}</p>
          <Link to={`/users/${user.id}`}>View</Link>{" "}
          <button onClick={() => handleEdit(user)}>Edit</button>{" "}
          <button onClick={() => handleDelete(user.id)}>Delete</button>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Users;
