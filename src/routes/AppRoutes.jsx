import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import Users from "../pages/user/Users";
import UserDetail from "../pages/user/UserDetail";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />

        <Route path="/users" element={<Users />} />

        <Route path="/users/:id" element={<UserDetail />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
