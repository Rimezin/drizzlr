export default function convertDay(unixTime, isShort) {
  const date = new Date(unixTime * 1000);
  let day = date.getDay();

  switch (day) {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
      break;
    default:
      day = "Error";
      break;
  }

  if (isShort) {
    day = day.substring(0, 3);
  }

  console.log(`CONVERTING DAY OF WEEK || ${day}`);
  return day;
}
