export function getCurrencySymbol(str) {
  switch (str) {
    case "USD":
      return "$";
    case "GBP":
      return "£";
    case "AUD":
      return "$";
    case "JPY":
      return "¥";
    case "RUB":
      return "₽";
    case "EUR":
      return "€";
    case "UAH":
      return "₴";
    default:
      return "";
  }
}
