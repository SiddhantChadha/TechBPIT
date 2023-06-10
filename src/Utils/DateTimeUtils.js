export const timestampToAgoFormat = timestamp => {
  const currentTime = Date.now(); // current time in milliseconds
  const timeDiff = currentTime - timestamp; // time difference in milliseconds

  const secondsAgo = Math.floor(timeDiff / 1000); // time difference in seconds
  const minsAgo = Math.floor(secondsAgo / 60); // time difference in minutes
  const hoursAgo = Math.floor(minsAgo / 60); // time difference in hours
  const daysAgo = Math.floor(hoursAgo / 24); // time difference in days
  if (daysAgo > 10) {
    const date = new Date(parseInt(timestamp));
    return date.toDateString();
  }
  if (daysAgo > 0) {
    return `${daysAgo} day${daysAgo === 1 ? '' : 's'} ago`;
  } else if (hoursAgo > 0) {
    return `${hoursAgo} hour${hoursAgo === 1 ? '' : 's'} ago`;
  } else if (minsAgo > 0) {
    return `${minsAgo} min${minsAgo === 1 ? '' : 's'} ago`;
  } else {
    return 'Just now';
  }
};
export const dateStringToDDMMM = dateString => {
  const date = new Date(dateString);

  const options = {day: 'numeric', month: 'short'};
  const formattedDate = date.toLocaleDateString('en-IN', options);

  return formattedDate;
};

export const dateStringToWeekDayDDMMM = dateString =>{
  const date = new Date(dateString);

  const options = { weekday:'short',day: 'numeric', month: 'short'};
  const formattedDate = date.toLocaleDateString('en-IN', options);

  return formattedDate;
}

export const dateStringToTime = dateString => {
  const date = new Date(dateString);

  const options = {
  
  hour:'2-digit',
  minute:'2-digit', 
  hour12: true};
  const formattedDate = date.toLocaleTimeString('en-IN', options);

  return formattedDate;
}

export const convertToLocalTime = timestamp => {
  const d = new Date(Number(timestamp));
  let result = '';

  if (d.getHours() / 12 > 0) {
    result +=
      (d.getHours() < 10 ? '0' : '') +
      (d.getHours() % 12) +
      ':' +
      (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()) +
      ' pm';
  } else {
    result +=
      d.getHours() +
      ':' +
      (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()) +
      ' am';
  }

  return result;
};

export const checkIfDateStringUpcoming = dateString => {
  const date = new Date(dateString);
  const currentDate = new Date();

  if (date > currentDate) {
    return true;
  }
};

export const getCurrentTimestamp = () => {
  return Date.now();
};
