export default function convertDate(unixTime, isShort) {
  // multiplied by 1000 so that the argument is in milliseconds not seconds.
  let date = new Date(unixTime * 1000);

  // Date //
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let year = isShort ? "" : "/" + date.getFullYear();

  // Will display date/time in 10:30 format
  let formattedDate = month + "/" + day + year;

  console.log(`CONVERTING DATE | ${unixTime} to ${formattedDate}`);
  return formattedDate;
}
