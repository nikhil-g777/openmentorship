const NoScriptGoogleAnalytics = () => {
  const GTM_ID = process.env.GTM_ID;
  // Return null if GTM ID is not defined
  if (!GTM_ID) return null;

  return (
    <noscript
      dangerouslySetInnerHTML={{
        __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display: none; visibility: hidden;"></iframe>`,
      }}
    />
  );
};

export {NoScriptGoogleAnalytics};
