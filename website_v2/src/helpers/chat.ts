// Get Time in AM/PM format
const getTime = (date: Date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
};

// Get Date in DD Month YYYY Format
const getDate = (date: Date) => {
  const day = date.getDate();
  const month = date.toLocaleString("default", {month: "long"});
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

export {getTime, getDate};
