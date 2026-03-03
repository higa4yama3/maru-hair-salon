import { memo, useCallback } from "react";
import { CustomerInfo, CustomerErrors } from "../types";
import { useInView } from "../hooks/useInView";

interface CustomerFormProps {
  readonly info: CustomerInfo;
  readonly errors: CustomerErrors;
  readonly onChange: (info: CustomerInfo) => void;
}

export const CustomerForm = memo(function CustomerForm({
  info,
  errors,
  onChange,
}: CustomerFormProps) {
  const { ref, isInView } = useInView();

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      onChange({ ...info, name: e.target.value }),
    [info, onChange]
  );

  const handlePhoneChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      onChange({ ...info, phone: e.target.value }),
    [info, onChange]
  );

  const handleNoteChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      onChange({ ...info, note: e.target.value }),
    [info, onChange]
  );

  return (
    <section
      ref={ref}
      id="customer"
      className={`section-pad section-alt-bg ${isInView ? "reveal visible" : "reveal"}`}
      style={{
        maxWidth: 600,
        position: "relative",
        overflow: "hidden",
      }}
      aria-labelledby="customer-heading"
    >
      <div className="section-bg-number" aria-hidden="true">03</div>

      <div
        className="mono"
        style={{ fontSize: 11, letterSpacing: "0.3em", color: "var(--gold)" }}
        aria-hidden="true"
      >
        03
      </div>
      <h2
        id="customer-heading"
        className="serif"
        style={{
          fontSize: 36,
          fontWeight: 300,
          color: "var(--wood-dark)",
          marginTop: 8,
          letterSpacing: "0.08em",
        }}
      >
        Info
      </h2>
      <div className="section-accent-line" aria-hidden="true" />
      <p style={{ fontSize: 14, color: "var(--wood-light)", marginTop: 16 }}>
        お名前と連絡先だけでOK
      </p>

      <div
        style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 32 }}
      >
        <div>
          <label className="input-label" htmlFor="customer-name">
            お名前
          </label>
          <input
            id="customer-name"
            className={`input-field ${errors.name ? "has-error" : ""}`}
            placeholder="山田 太郎…"
            value={info.name}
            onChange={handleNameChange}
            autoComplete="name"
            maxLength={50}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          <div id="name-error" className="input-error" role="alert">
            {errors.name ?? ""}
          </div>
        </div>
        <div>
          <label className="input-label" htmlFor="customer-phone">
            電話番号
          </label>
          <input
            id="customer-phone"
            className={`input-field ${errors.phone ? "has-error" : ""}`}
            type="tel"
            placeholder="090-1234-5678…"
            value={info.phone}
            onChange={handlePhoneChange}
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          <div id="phone-error" className="input-error" role="alert">
            {errors.phone ?? ""}
          </div>
        </div>
        <div>
          <label className="input-label" htmlFor="customer-note">
            備考（任意）
          </label>
          <input
            id="customer-note"
            className="input-field"
            placeholder="初めてです / 前回と同じ感じで etc."
            value={info.note}
            onChange={handleNoteChange}
            autoComplete="off"
            maxLength={500}
          />
        </div>
      </div>
    </section>
  );
});
