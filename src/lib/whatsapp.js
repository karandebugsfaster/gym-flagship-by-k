export function openWhatsApp(phone, message) {
  if (!phone) return;

  const cleaned = phone.replace(/\D/g, ""); // remove spaces, +, -
  const encodedMessage = encodeURIComponent(message);

  const url = `https://wa.me/91${cleaned}?text=${encodedMessage}`;
  window.open(url, "_blank");
}
