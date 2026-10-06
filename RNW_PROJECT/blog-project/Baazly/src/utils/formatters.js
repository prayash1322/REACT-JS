export function money(num) {
  if (num === null || num === undefined || isNaN(num)) {
    return "Rs. 0";
  }
  return "Rs. " + Number(num).toLocaleString("en-IN");
}
