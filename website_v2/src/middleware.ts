export {default} from "next-auth/middleware";

export const config = {
  matcher: [
    "/explore",
    "/profile",
    "/matches",
    "/chat",
    "/admin/dashboard",
    "/admin/sessions",
  ],
};
