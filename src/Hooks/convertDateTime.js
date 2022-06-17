export default function convertDateTime(unixTime, format) {
  // multiplied by 1000 so that the argument is in milliseconds not seconds.
  let date = new Date(unixTime * 1000);

  // Date //
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let year = date.getFullYear();

  // Time //
  let hours = date.getHours();
  let minutes = 0 + date.getMinutes();
  minutes = minutes < 10 ? "0" + minutes.toString() : minutes.toString();
  minutes = format === "12hr" && hours > 12 ? minutes + "pm" : minutes;
  minutes = format === "12hr" && hours < 12 ? minutes + "am" : minutes;
  hours = format === "12hr" && hours > 12 ? hours - 12 : hours;
  // let seconds = 0 + date.getSeconds();
  // seconds = seconds < 10 ? "0" + seconds.toString() : seconds.toString();

  // Will display date/time in 10:30 format
  let formattedDate = month + "/" + day + "/" + year;
  let formattedTime = hours + ":" + minutes.substring(-2);
  // + ":" + seconds.substring(-2);

  // Final result //
  let formatted = formattedDate + " " + formattedTime;
  console.log(
    `%c>> Converting day/time from ${unixTime} to ${formatted}`,
    "color: lime;"
  );
  return formatted;
}
