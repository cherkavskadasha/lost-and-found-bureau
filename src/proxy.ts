import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: [
    "/profile", "/profile/:path*", 
    "/create", "/create/:path*", 
    "/settings", "/settings/:path*"
  ],
};