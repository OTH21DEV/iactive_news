
export const formatTime = (dateString) => {
  const date = new Date(dateString);
  const options = {
    hour: "2-digit",
    minute: "2-digit",
  };

  let timeFormatted = `${date.toLocaleDateString("ru-RU", options)}`;
  const time = timeFormatted.split(",").slice(1);
  return time;
};
