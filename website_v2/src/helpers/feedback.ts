const getFeedbackUrl = (userId: string, email: string) => {
  return `https://docs.google.com/forms/d/e/1FAIpQLScelLxv-qdR7ZwkhjkluCootZkuk1HcRblcC92qM_Ab6Z_Pgg/viewform?usp=pp_url&entry.1801284720=${userId}&entry.688180669=${email}`;
};

export {getFeedbackUrl};
