"use client";

import { useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { site, publishedReviews } from "@/content/site";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Arrow } from "@/components/ui/Arrow";
import {
  validateInquiry,
  type InquiryValues,
  type InquiryErrors,
} from "@/lib/inquiry";

const subscribe = () => () => {};
const getHydrated = () => true;
const getServerHydrated = () => false;

export function Inquiry() {
  const form = useRef<HTMLFormElement>(null);
  const [method, setMethod] = useState("email");
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [checked, setChecked] = useState(false);
  const hydrated = useSyncExternalStore(
    subscribe,
    getHydrated,
    getServerHydrated,
  );
  function check(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = Object.fromEntries(
      ["name", "method", "contact", "date", "format", "guests", "comment"].map(
        (key) => [key, String(data.get(key) ?? "")],
      ),
    ) as InquiryValues;
    const nextErrors = validateInquiry(values);
    setErrors(nextErrors);
    setChecked(Object.keys(nextErrors).length === 0);
    if (Object.keys(nextErrors).length)
      (
        form.current?.elements.namedItem(
          Object.keys(nextErrors)[0],
        ) as HTMLElement | null
      )?.focus();
  }
  function description(field: keyof InquiryValues) {
    return errors[field] ? `error-${field}` : undefined;
  }
  function error(field: keyof InquiryValues) {
    return errors[field] ? (
      <span className="field-error" id={`error-${field}`}>
        {errors[field]}
      </span>
    ) : null;
  }
  return (
    <section
      id="inquiry"
      className="section shell inquiry"
      aria-labelledby="inquiry-title"
    >
      <div className="inquiry-grid">
        <div className="inquiry-intro" data-reveal>
          <SectionLabel number={publishedReviews.length ? "08" : "07"}>
            Контакты · ваша встреча
          </SectionLabel>
          <h2 id="inquiry-title" className="section-title">
            {site.inquiry.title}
          </h2>
          <p className="section-description">{site.inquiry.description}</p>
          <div className="inquiry-location">
            <span className="eyebrow">Ориентир</span>
            <p>{site.inquiry.address}</p>
            <span className="inquiry-location-note">
              {site.inquiry.locationNote}
            </span>
          </div>
        </div>
        <form
          ref={form}
          className="inquiry-form"
          onSubmit={check}
          noValidate
          aria-label="Демонстрационная заявка на мероприятие"
          onChange={() => setChecked(false)}
        >
          <p className="form-note" id="form-note">
            Обязательные поля отмечены звёздочкой. Проверка выполняется только в
            браузере.
          </p>
          <fieldset disabled={!hydrated} aria-describedby="form-note">
            <legend className="sr-only">Данные о вашей встрече</legend>
            <div className="form-grid">
              <div className="field field-full">
                <label htmlFor="inquiry-name">
                  Ваше имя <span aria-hidden="true">*</span>
                </label>
                <input
                  id="inquiry-name"
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={100}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={description("name")}
                  placeholder="Как к вам обращаться"
                />
                {error("name")}
              </div>
              <div className="field">
                <label htmlFor="inquiry-method">Способ связи</label>
                <select
                  id="inquiry-method"
                  name="method"
                  value={method}
                  onChange={(event) => setMethod(event.target.value)}
                  aria-invalid={Boolean(errors.method)}
                  aria-describedby={description("method")}
                >
                  <option value="email">Электронная почта</option>
                  <option value="phone">Телефон</option>
                  <option value="messenger">Мессенджер</option>
                </select>
                {error("method")}
              </div>
              <div className="field">
                <label htmlFor="inquiry-contact">
                  {method === "email"
                    ? "Электронная почта"
                    : method === "phone"
                      ? "Телефон"
                      : "Контакт в мессенджере"}{" "}
                  <span aria-hidden="true">*</span>
                </label>
                <input
                  id="inquiry-contact"
                  name="contact"
                  type={
                    method === "email"
                      ? "email"
                      : method === "phone"
                        ? "tel"
                        : "text"
                  }
                  autoComplete={
                    method === "email"
                      ? "email"
                      : method === "phone"
                        ? "tel"
                        : "off"
                  }
                  required
                  maxLength={254}
                  aria-invalid={Boolean(errors.contact)}
                  aria-describedby={description("contact")}
                />
                {error("contact")}
              </div>
              <div className="field">
                <label htmlFor="inquiry-date">Предполагаемая дата</label>
                <input
                  id="inquiry-date"
                  name="date"
                  type="date"
                  aria-invalid={Boolean(errors.date)}
                  aria-describedby={description("date")}
                />
                {error("date")}
              </div>
              <div className="field">
                <label htmlFor="inquiry-guests">Количество гостей</label>
                <input
                  id="inquiry-guests"
                  name="guests"
                  type="number"
                  inputMode="numeric"
                  min="1"
                  step="1"
                  aria-invalid={Boolean(errors.guests)}
                  aria-describedby={description("guests")}
                  placeholder="Пока можно примерно"
                />
                {error("guests")}
              </div>
              <div className="field field-full">
                <label htmlFor="inquiry-format">Формат мероприятия</label>
                <select id="inquiry-format" name="format" defaultValue="">
                  <option value="">Выберите формат</option>
                  {site.formats.items.map((format) => (
                    <option value={format.id} key={format.id}>
                      {format.title}
                    </option>
                  ))}
                  <option value="discuss">Хочу обсудить</option>
                </select>
              </div>
              <div className="field field-full">
                <label htmlFor="inquiry-comment">Комментарий</label>
                <textarea
                  id="inquiry-comment"
                  name="comment"
                  rows={3}
                  maxLength={2000}
                  aria-invalid={Boolean(errors.comment)}
                  aria-describedby={description("comment")}
                  placeholder="Что важно учесть для вашей встречи"
                />
                {error("comment")}
              </div>
            </div>
          </fieldset>
          {Object.keys(errors).length > 0 && (
            <p role="alert" className="form-error-summary">
              Проверьте отмеченные поля.
            </p>
          )}
          <div className="form-actions">
            <button
              type="submit"
              className="button button-primary"
              disabled={!hydrated}
            >
              Проверить заявку <Arrow diagonal />
            </button>
            <p className="form-booking-note">
              Дата и число гостей — пожелания,
              <br />а не подтверждение бронирования.
            </p>
          </div>
          <div className="demo-status" role="status" aria-live="polite">
            {checked && (
              <p className="demo-checked">Поля заполнены корректно.</p>
            )}
            <p>{site.inquiry.demoMessage}</p>
          </div>
          <noscript>
            <p>
              Для проверки демонстрационной формы включите JavaScript. Данные не
              отправляются.
            </p>
          </noscript>
        </form>
      </div>
    </section>
  );
}
