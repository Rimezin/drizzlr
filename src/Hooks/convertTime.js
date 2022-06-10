export default function convertTime(unixTime, format) {
  // multiplied by 1000 so that the argument is in milliseconds not seconds.

  var date = new Date(unixTime * 1000);
  var hours = date.getHours();
  var minutes = 0 + date.getMinutes();
  minutes = minutes < 10 ? "0" + minutes.toString() : minutes.toString();
  minutes = format === "12hr" && hours > 12 ? minutes + "pm" : minutes;
  minutes = format === "12hr" && hours < 12 ? minutes + "am" : minutes;
  hours = format === "12hr" && hours > 12 ? hours - 12 : hours;
  // var seconds = 0 + date.getSeconds();
  // seconds = seconds < 10 ? "0" + seconds.toString() : seconds.toString();

  // Will display time in 10:30 format
  var formattedTime = hours + ":" + minutes.substring(-2);
  // + ":" + seconds.substring(-2);
  console.log(`--> Converting ${unixTime} to ${formattedTime}`);
  return formattedTime;
}
