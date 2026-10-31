import { Link, Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>

        {" | "}

        <Link to="/users">Users</Link>
      </nav>

      <hr />

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
