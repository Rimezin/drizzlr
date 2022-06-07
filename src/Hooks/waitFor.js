export default function waitFor(variable, func) {
  if (typeof variable !== "undefined" && variable !== null && variable !== "") {
    func();
  } else {
    setTimeout(waitFor(variable, func), 100);
  }
}
