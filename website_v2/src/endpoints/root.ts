const headerProvider = (token?: string) => {
  return {
    "Content-Type": "application/json;charset=UTF-8",
    accept: "application/json",
    authorization: `Bearer ${token}`,
  };
};

export {headerProvider};
