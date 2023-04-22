export const timestampToAgoFormat = (timestamp) => {
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
      return (`${daysAgo} day${daysAgo === 1 ? '' : 's'} ago`);
    } else if (hoursAgo > 0) {
        return (`${hoursAgo} hour${hoursAgo === 1 ? '' : 's'} ago`);
    } else if (minsAgo > 0) {
        return (`${minsAgo} min${minsAgo === 1 ? '' : 's'} ago`);
    } else {
        return ('Just now');
    }
}