import React, { createContext, useContext, useMemo, useState } from "react";

// 👇 Tek yerde şema (basit): Yıllar ve metrik sayısı
export const YEARS = [  2025, 2024, 2023, 2022, 2021,2020,2019,2018];
export const METRICS = ["SAIDI", "SAIFI","ODE","KKO" ]; // 3 alan / yıl

// Form label'ları otomatik üretelim (ör: "SAİDİ 2025", "SAİFİ 2025", "ODE 2025", ...)
export const FIELDS = YEARS.flatMap((y) => METRICS.map((m) => `${m} ${y}`));

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  // Kullanıcı girdileri (FIELDS.length adet)
  const [values, setValues] = useState(Array(FIELDS.length).fill(""));
  const [errors, setErrors] = useState(Array(FIELDS.length).fill(""));

  const ctx = useMemo(() => ({ values, setValues, errors, setErrors }), [values, errors]);
  return <DataContext.Provider value={ctx}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within <DataProvider>");
  return ctx;
};
