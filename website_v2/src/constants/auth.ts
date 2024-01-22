// LinkedIn Redirect URL
export const linkedInRedirectUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI}&scope=r_liteprofile,r_emailaddress`;

// Google Redirect URL
export const googleRedirectUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email`;

// Regex for google auth code
export const googleAuthCodeRegex = /code=([^&]+)/;

// Regex for auth code
export const linkedInAuthCodeRegex = /code=([a-zA-Z0-9_-]+)/;

// LinkedIn Provider name
export const linkedInProvider = "linkedin";

// Google Provider name
export const googleProvider = "google";
