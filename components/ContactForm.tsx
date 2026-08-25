"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { FORMSPREE_ID, type Locale } from "@/lib/constants";
import { waLink } from "@/lib/utils";

const reachOptions: Record<Locale, { value: string; label: string; placeholder: string }[]> = {
  az: [
    { value: "whatsapp", label: "WhatsApp", placeholder: "Nömrənizi yazın" },
    { value: "telegram", label: "Telegram", placeholder: "@istifadəçi_adı" },
    { value: "instagram", label: "İnstaqram", placeholder: "@istifadəçi_adı" },
    { value: "telefon", label: "Telefon zəngi", placeholder: "Nömrənizi yazın" },
    { value: "email", label: "E-poçt", placeholder: "E-poçt ünvanınız" },
    { value: "other", label: "Digər", placeholder: "Necə əlaqə saxlayaq?" },
  ],
  ru: [
    { value: "whatsapp", label: "WhatsApp", placeholder: "Ваш номер" },
    { value: "telegram", label: "Telegram", placeholder: "@имя_пользователя" },
    { value: "instagram", label: "Instagram", placeholder: "@имя_пользователя" },
    { value: "telefon", label: "Телефонный звонок", placeholder: "Ваш номер" },
    { value: "email", label: "Эл. почта", placeholder: "Ваш email" },
    { value: "other", label: "Другое", placeholder: "Как с вами связаться?" },
  ],
  en: [
    { value: "whatsapp", label: "WhatsApp", placeholder: "Your number" },
    { value: "telegram", label: "Telegram", placeholder: "@username" },
    { value: "instagram", label: "Instagram", placeholder: "@username" },
    { value: "telefon", label: "Phone call", placeholder: "Your number" },
    { value: "email", label: "Email", placeholder: "Your email" },
    { value: "other", label: "Other", placeholder: "How should we reach you?" },
  ],
};

export function ContactForm({ locale, dict }: { locale: Locale; dict: Record<string, string> }) {
  const router = useRouter();
  const [values, setValues] = useState({ name: "", business: "", need: "" });
  const [reachMethod, setReachMethod] = useState("");
  const [reachDetail, setReachDetail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setValues((p) => ({ ...p, [name]: value }));
    setErrors((p) => { const n = { ...p }; delete n[name]; return n; });
  }

  function handleMethodSelect(value: string) {
    setReachMethod(value);
    setReachDetail("");
    setErrors((p) => { const n = { ...p }; delete n["reach"]; return n; });
  }

  const options = reachOptions[locale];
  const selectedOption = options.find((o) => o.value === reachMethod);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError("");
    const newErrors: Record<string, string> = {};
    if (!values.name.trim()) newErrors.name = dict["contact.form.error.name"];
    if (!values.need.trim()) newErrors.need = dict["contact.form.error.need"];
    if (!reachMethod || !reachDetail.trim()) newErrors.reach = dict["contact.form.error.reach"];
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    const reachLabel = selectedOption?.label || reachMethod;

    setSubmitting(true);
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: values.name, business: values.business, need: values.need, reachMethod: reachLabel, reachDetail }),
      });
      if (res.ok) router.push(`/${locale}/thank-you`);
      else setSubmitError(dict["contact.form.error.send"]);
    } catch { setSubmitError(dict["contact.form.error.send"]); }
    finally { setSubmitting(false); }
  }

  const inputClass = "w-full h-[44px] bg-surface border border-border rounded-[8px] px-[14px] py-[10px] text-[16px] focus:border-accent focus:shadow-[0_0_0_3px_var(--accent-bg)] focus:outline-none transition-all duration-200";

  return (
    <form onSubmit={handleSubmit} className="max-w-[480px] space-y-[20px]">
      <div>
        <label className="block text-[14px] font-medium mb-[6px]">{dict["contact.form.name"]}</label>
        <input type="text" name="name" value={values.name} onChange={handleChange} className={inputClass} />
        {errors.name && <p className="text-[13px] text-danger mt-[4px]">{errors.name}</p>}
      </div>
      <div>
        <label className="block text-[14px] font-medium mb-[6px]">{dict["contact.form.business"]}</label>
        <input type="text" name="business" value={values.business} onChange={handleChange} className={inputClass} />
      </div>
      <div>
        <label className="block text-[14px] font-medium mb-[6px]">{dict["contact.form.need"]}</label>
        <textarea name="need" value={values.need} onChange={handleChange} rows={4} className={`${inputClass} h-auto`} />
        {errors.need && <p className="text-[13px] text-danger mt-[4px]">{errors.need}</p>}
      </div>
      <div>
        <label className="block text-[14px] font-medium mb-[6px]">{dict["contact.form.reach"]}</label>
        <div className="flex flex-wrap gap-[8px]">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleMethodSelect(opt.value)}
              className={`px-[14px] py-[8px] rounded-[8px] text-[14px] border transition-colors duration-200 ${
                reachMethod === opt.value
                  ? "bg-accent text-white border-accent"
                  : "bg-surface text-text border-border hover:border-accent"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {reachMethod && selectedOption && (
          <input
            type="text"
            value={reachDetail}
            onChange={(e) => { setReachDetail(e.target.value); setErrors((p) => { const n = { ...p }; delete n["reach"]; return n; }); }}
            placeholder={selectedOption.placeholder}
            className={`${inputClass} mt-[12px]`}
          />
        )}
        {errors.reach && <p className="text-[13px] text-danger mt-[4px]">{errors.reach}</p>}
      </div>
      {submitError && <p className="text-[13px] text-danger">{submitError} <a href={waLink(locale)} target="_blank" rel="noopener noreferrer" className="underline">WhatsApp</a></p>}
      <Button type="submit" variant="primary" className="w-full justify-center mt-[24px]" disabled={submitting}>{dict["contact.form.submit"]}</Button>
    </form>
  );
}
