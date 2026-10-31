import { useState } from "react";
import { useRoles } from "../hooks/useRole";

function UserForm({ formData, onCreate, onUpdate, onCancel }) {
  const [username, setUsername] = useState(formData?.username || "");
  const [email, setEmail] = useState(formData?.email || "");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState(
    formData?.roleId == null ? "" : String(formData.roleId),
  );
  const { roles, loading: rolesLoading, error: rolesError } = useRoles();

  async function handleSubmit(event) {
    event.preventDefault();

    const user = {
      username,
      email,
      password,
      roleId: Number(roleId),
    };

    if (!username || !email || !roleId) {
      alert("Please fill in all required fields");
      return;
    }

    if (!formData && !password) {
      alert("Password is required");
      return;
    }

    try {
      if (formData) {
        await onUpdate(formData.id, user);
      } else {
        await onCreate(user);
      }

      setUsername("");
      setEmail("");
      setPassword("");
      setRoleId("");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          required
        />
      </div>

      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          required
        />
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={
            formData
              ? "Leave blank to keep current password"
              : "Enter password"
          }
          required={!formData}
        />
      </div>

      <div>
        <label htmlFor="user-role">Role</label>
        <select
          id="user-role"
          value={roleId}
          onChange={(e) => setRoleId(e.target.value)}
          required
          disabled={rolesLoading || roles.length === 0}
        >
          <option value="">
            {rolesLoading
              ? "Loading roles..."
              : roles.length === 0
                ? "No roles available"
                : "Select a role"}
          </option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
        {rolesError && <p role="alert">Unable to load roles: {rolesError}</p>}
      </div>

      <button type="submit">
        {formData ? "Update User" : "Create User"}
      </button>

      {formData && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default UserForm;
