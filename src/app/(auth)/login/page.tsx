import type { Metadata } from "next";
import { LoginPageView } from "pages-sections/sessions/page-view";
import { useUser } from "@auth0/nextjs-auth0/client";

export const metadata: Metadata = {
  title: "Login - Bazaar Next.js E-commerce Template",
  description: `Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};

export default function Login() {
  const {user, error, isLoading} = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    console.log(user);
    return (
      <div>
        Welcome {user.name}! <a href="/api/auth/logout">Logout</a>
        <br></br>
        Your nickname is {user.nickname}.
      </div>
    );
  }

  return <a href="/api/auth/login">Login</a>;
}
