export type InquiryValues = {
  name: string;
  method: string;
  contact: string;
  date: string;
  format: string;
  guests: string;
  comment: string;
};
export type InquiryErrors = Partial<Record<keyof InquiryValues, string>>;

/** Validation only. This module never sends, stores or logs personal data. */
export function validateInquiry(values: InquiryValues): InquiryErrors {
  const errors: InquiryErrors = {};
  if (!values.name.trim()) errors.name = "Укажите ваше имя.";
  else if (values.name.trim().length > 100)
    errors.name = "Имя должно быть короче 100 символов.";
  if (!["email", "phone", "messenger"].includes(values.method))
    errors.method = "Выберите способ связи.";
  const contact = values.contact.trim();
  if (!contact) errors.contact = "Укажите контакт для связи.";
  else if (contact.length > 254)
    errors.contact = "Контакт должен быть короче 254 символов.";
  else if (
    values.method === "email" &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)
  )
    errors.contact = "Проверьте адрес электронной почты.";
  else if (
    values.method === "phone" &&
    (!/^[+\d\s().-]+$/.test(contact) ||
      contact.replace(/\D/g, "").length < 7 ||
      contact.replace(/\D/g, "").length > 15)
  )
    errors.contact = "Укажите телефон с кодом страны.";
  else if (values.method === "messenger" && contact.length < 3)
    errors.contact = "Укажите имя пользователя или контакт в мессенджере.";
  if (
    values.guests &&
    (!/^\d+$/.test(values.guests) ||
      Number(values.guests) < 1 ||
      !Number.isSafeInteger(Number(values.guests)))
  )
    errors.guests = "Укажите целое положительное число гостей.";
  if (values.date) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(values.date);
    if (!match) errors.date = "Укажите корректную дату.";
    else {
      const [, y, m, d] = match.map(Number);
      const parsed = new Date(Date.UTC(y, m - 1, d));
      if (
        parsed.getUTCFullYear() !== y ||
        parsed.getUTCMonth() !== m - 1 ||
        parsed.getUTCDate() !== d
      )
        errors.date = "Укажите корректную дату.";
    }
  }
  if (values.comment.length > 2000)
    errors.comment = "Комментарий должен быть короче 2000 символов.";
  return errors;
}
