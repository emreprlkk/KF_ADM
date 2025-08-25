// src/components/inputfield/inputfield.jsx
import React, { useEffect, useRef, useState } from "react";
import { useData, FIELDS } from "../../context/DataContext.jsx";

const DEBOUNCE_MS = 500; // gecikme (ms)

// 🔒 Hangi label'lar disabled olacak?
const DISABLED_LABELS = new Set([
  "SAIDI 2021",
  "SAIFI 2021",
  "SAIDI 2020",
  "SAIFI 2020",
  "SAIDI 2019",
  "SAIFI 2019",

  "SAIDI 2018",
  "SAIFI 2018",

  "ODE 2021",
  "ODE 2020",
  "ODE 2019",
  "ODE 2018",

   
  "KKO 2021",
  "KKO 2020",
  "KKO 2019",
  "KKO 2018",
  // "SAİFİ 2025",
  // "ODE 2025",
]);

// 🔢 Disabled alanların default değeri
const defaultFor = (label) => {
  switch (label) {
      case "SAIDI 2021":
      return "681.75394901629";

      case "SAIDI 2020":
      return "786.151449878332";

      case "SAIDI 2019":
      return "952.082741767469";


      case "SAIFI 2021":
      return "13.8293012448252";

       case "SAIFI 2020":
      return "14.6503626892417";

       case "SAIFI 2019":
      return "17.0088953043398";

      case "SAIDI 2018":
      return "735.004962047231";

       case "SAIFI 2018":
      return "15.5367009409016";

        case "ODE 2021":
      return "4.5811371370409";

      case "ODE 2020":
      return "0";

      case "ODE 2019":
      return "0";

       case "ODE 2018":
      return "0";

       

      case "KKO 2021":
      return "0";

      case "KKO 2020":
      return "0";

      case "KKO 2019":
      return "0";

       case "KKO 2018":
      return "0";
    // case "SAİFİ 2025": return "50";
    // case "ODE 2025":   return "10";
      default:
      return "";
  }
};

export default function NumberInputs() {
  const { values, setValues, errors, setErrors } = useData();

  // Kullanıcı yazarken anında göster, Context'e gecikmeli yaz
  const [localValues, setLocalValues] = useState(values);
  const timersRef = useRef([]);

  // Mount'ta: disabled alanların defaultlarını Context'e YAZ (boşsa)
  useEffect(() => {
    const nv = [...values];
    let changed = false;
    FIELDS.forEach((label, i) => {
      if (DISABLED_LABELS.has(label)) {
        const d = defaultFor(label);
        if (nv[i] !== d) {
          nv[i] = d;
          changed = true;
        }
      }
    });
    if (changed) setValues(nv);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // sadece ilk yüklemede

  // Dışarıdan güncelleme olursa local'i senkronla
  useEffect(() => {
    setLocalValues(values);
  }, [values]);

  // Unmount'ta tüm zamanlayıcıları temizle
  useEffect(() => {
    return () => timersRef.current.forEach((t) => clearTimeout(t));
  }, []);

  const validate = (val) => {
    if (val !== "" && !/^\d+([.,]\d+)?$/.test(val)) {
      return "Sadece sayı veya ondalık sayı giriniz!";
    }
    const num = parseFloat(String(val).replace(",", "."));
    if (val !== "" && !Number.isFinite(num)) {
      return "Geçersiz sayı!";
    }
    if (!isNaN(num) && (num < 0 || num > 2000)) {
      return "Değer 0 ile 2000 arasında olmalı!";
    }
    return "";
  };

  const commit = (index, val) => {
    const nv = [...values];
    nv[index] = val;
    setValues(nv);

    const ne = [...errors];
    ne[index] = validate(val);
    setErrors(ne);
  };

  const handleChange = (index, e, isDisabled) => {
    if (isDisabled) return;
    const val = e.target.value;

    setLocalValues((prev) => {
      const copy = [...prev];
      copy[index] = val;
      return copy;
    });

    clearTimeout(timersRef.current[index]);
    timersRef.current[index] = setTimeout(() => commit(index, val), DEBOUNCE_MS);
  };

  const handleBlur = (index, isDisabled) => {
    if (isDisabled) return;
    const val = localValues[index] ?? "";
    clearTimeout(timersRef.current[index]);
    commit(index, val);
  };

  return (
    <div className="space-y-6 ">
      <p className="text-sm   opacity-70">
        Kalite Puanının Hesaplanabilmesi İçin Aşağıdaki Verileri Girin.
      </p>
<p className="text-sm text-purple-400   ">
       
        Ondalık ayraç olarak nokta kullanınız !
      </p>
      <div className="  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {FIELDS.map((label, i) => {
  const isDisabled = DISABLED_LABELS.has(label);
  const defaultVal = isDisabled ? defaultFor(label) : "";
  const value = isDisabled ? defaultVal : (localValues[i] ?? "");
  
  return (
    <div key={label} className="form-control">
      <label className="label mb-1">
        <span className="label-text text-sm">{label}</span>
      </label>

      <input
        type="text"
        name={label}
        value={value}
        onChange={(e) => !isDisabled && handleChange(i, e)}
        onBlur={() => !isDisabled && handleBlur(i)}
        disabled={isDisabled}
        placeholder={isDisabled ? "Otomatik atanmış" : `${label} Değerini Girin`}
        className={`text-base placeholder: sm:text-xs xl:sm input input-bordered w-40   ${
          isDisabled ? "bg-base-200 text-base-content/70 cursor-not-allowed" : "text-red-600"
        } ${errors[i] && !isDisabled ? "input-error" : ""}`}
      />

      {!isDisabled && errors[i] && (
        <span className="text-error text-xs mt-1">{errors[i]}</span>
      )}
    </div>
  );
})}

      </div>
    </div>
  );
}
