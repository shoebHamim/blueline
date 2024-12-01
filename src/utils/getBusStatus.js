const getBusStatus = (arrivalTime, departureTime) => {
  const today = new Date();

  const arrival = new Date(arrivalTime);
  const departure = new Date(departureTime);
  if (today >= departure && today <= arrival) {
    return "On Route";
  } else if (today > arrival) {
    return "Completed";
  } else if (today < departure) {
    return "Upcoming";
  }
};

export { getBusStatus };
