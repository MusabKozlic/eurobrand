"use client";

import { Typography } from "@mui/material";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import Login from "./login";

const Dashboard = () => {

    return (
        <UserProvider>
            <Login></Login>
        </UserProvider>
    );
};

export default Dashboard;
