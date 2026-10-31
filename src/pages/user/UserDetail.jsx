import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useUsers } from "../../hooks/useUsers";

function UserDetail() {
  const { id } = useParams();

  const { loadUserById, loading } = useUsers();

  const [user, setUser] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await loadUserById(id);

        setUser(data);
      } catch (error) {
        console.error(error);
      }
    }

    load();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return (
      <div>
        <h1>User not found</h1>

        <Link to="/users">Back to Users</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>User Detail</h1>

      <p>
        <strong>ID:</strong> {user.id}
      </p>

      <p>
        <strong>Username:</strong> {user.username}
      </p>

      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <Link to="/users">Back to Users</Link>
    </div>
  );
}

export default UserDetail;
