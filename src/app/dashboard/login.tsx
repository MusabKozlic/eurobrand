import { useUser } from '@auth0/nextjs-auth0/client';


export default function Login() {
  const { user, error, isLoading } = useUser();


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <div>
        Welcome {user.name}! <a href="/dashboard/api/auth/logout">Logout</a>
      </div>
    );
  }

  return <a href="/dashboard/api/auth/login">Login</a>;
}
