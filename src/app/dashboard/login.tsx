import { Button, Typography } from '@mui/material'
import Link from 'next/link'
import auth0Service from '../api/auth/auth0-service';

export default function Login() {

  return (
    <div>
        <Typography>
                Welcome to admin dashboard!!!!
            </Typography>

            <Button onClick={auth0Service.login}>
                <Typography>
                    Login
                </Typography>
            </Button>
    </div>
  )
}
