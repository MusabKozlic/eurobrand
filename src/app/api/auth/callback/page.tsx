"use client";

// /pages/callback.tsx
import React, { useEffect } from 'react';
import auth0Service from '../auth0-service';

const CallbackPage: React.FC = () => {
    useEffect(() => {
        const handleAuth = async () => {
            try {
                const authResult = await auth0Service.handleAuthentication();
                console.log(authResult); // Handle successful authentication
            } catch (error) {
                console.error(error); // Handle authentication error
            }
        };

        handleAuth();
    }, []);

    return <div>Redirecting...</div>;
};

export default CallbackPage;
