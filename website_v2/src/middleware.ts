export {default} from "next-auth/middleware";

export const config = {
  matcher: [
    "/profile",
    "/matches",
    "/chat",
    "/admin/dashboard",
    "/admin/sessions",
  ],
};
