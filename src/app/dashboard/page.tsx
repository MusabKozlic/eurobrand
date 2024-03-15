"use client";

import { Typography } from "@mui/material";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Login from "./login";

const Dashboard = () => {

    return (
        <UserProvider>
            <Login />
        </UserProvider>
    );
};

export default Dashboard;
