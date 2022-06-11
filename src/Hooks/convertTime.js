export default function convertTime(unixTime, format, simple) {
  // multiplied by 1000 so that the argument is in milliseconds not seconds.

  var date = new Date(unixTime * 1000);
  var hours = date.getHours();

  var amPm = "";
  if (format === "12hr") {
    amPm = hours >= 12 ? "pm" : "am";
  }

  var minutes = 0 + date.getMinutes();
  minutes = minutes < 10 ? "0" + minutes.toString() : minutes.toString();
  minutes = simple ? amPm : ":" + minutes + amPm;
  hours = format === "12hr" && hours > 12 ? hours - 12 : hours;
  hours = hours === 0 ? 12 : hours;
  // var seconds = 0 + date.getSeconds();
  // seconds = seconds < 10 ? "0" + seconds.toString() : seconds.toString();

  // Will display time in 10:30 format
  var formattedTime = hours + minutes.substring(-2);
  // + ":" + seconds.substring(-2);
  console.log(`--> Converting ${unixTime} to ${formattedTime}`);
  return formattedTime;
}
