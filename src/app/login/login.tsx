import { useUser } from '@auth0/nextjs-auth0/client';
import { PropsWithChildren } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';


export default function Login() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    Cookies.set('user', JSON.stringify(user), { expires: 7 });
    router.push("/admin/products");
  }else {
    router.push("/login/api/auth/login");
  }

  return <></>;
}
