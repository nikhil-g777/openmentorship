// LinkedIn Redirect URL
export const linkedInRedirectUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI}&scope=r_liteprofile,r_emailaddress`;

// Regex for auth code
export const authCodeRegex = /code=([a-zA-Z0-9_-]+)/;
