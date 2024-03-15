import { Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { useUser } from "@auth0/nextjs-auth0/client";


export default function Login() {
    const { user, error, isLoading } = useUser();

  return (
    <div>
        <Typography>
                Welcome to admin dashboard!!!!
            </Typography>

            <Link href={"/api/auth/login"}>
                <Typography>
                    Login
                </Typography>
            </Link>
    </div>
  )
}
