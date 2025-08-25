import React,{useState ,useMemo,useEffect } from 'react'
 import NumberInputs from './components/inputfield/inputfield'
 import DynamicTable from './components/table';
import './App.css'
import { KFPUAN_SAİDİ,KFPUAN_SAİFİ,KFPUAN_SAİDİ_2023,KFPUAN_SAİFİ_2023,KFPUAN_SAİDİ_2022,KFPUAN_SAİFİ_2022,KFODE } from './lib/formula';
import { DataProvider } from "./context/DataContext.jsx";
import { useData,FIELDS } from './context/DataContext.jsx';
const fmt = new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 2 });
const f = (x) => (x == null || Number.isNaN(x) ? "—" : fmt.format(x));
const safeNum = (x) => (typeof x === "number" && !isNaN(x) ? x : 0);
// Tek yerden güvenli okuma (etiketlerindeki İ harfine dikkat!)
const get = (values, label) => values[FIELDS.indexOf(label)];
function App() {
  const [visible, setVisible] = useState(false);
  const { values  } = useData();
 // console.log(values)
 
 
/*const saidi_2025=values[FIELDS.indexOf("SAİDİ 2025")] ; 
const saidi_2024=values[FIELDS.indexOf("SAİDİ 2024")] ; 
const saidi_2023=values[FIELDS.indexOf("SAİDİ 2023")] ; 
const saidi_2022=values[FIELDS.indexOf("SAİDİ 2022")] ; 
const saidi_2021=values[FIELDS.indexOf("SAİDİ 2021")] ; 
const saidi_2020=values[FIELDS.indexOf("SAİDİ 2020")] ; 

const saifi_2025=values[FIELDS.indexOf("SAİFİ 2025")] ; 

const saifi_2024=values[FIELDS.indexOf("SAİFİ 2024")] ; 
const saifi_2023=values[FIELDS.indexOf("SAİFİ 2023")] ; 
const saifi_2022=values[FIELDS.indexOf("SAİFİ 2022")] ; 
const saifi_2021=values[FIELDS.indexOf("SAİFİ 2021")] ; 
const saifi_2020=values[FIELDS.indexOf("SAİFİ 2020")] ; 

const ode_2025=values[FIELDS.indexOf("ODE 2025")] ; 
const ode_2024=values[FIELDS.indexOf("ODE 2024")] ; 
const ode_2023=values[FIELDS.indexOf("ODE 2023")] ; 
const ode_2022=values[FIELDS.indexOf("ODE 2022")] ; 
const ode_2021=values[FIELDS.indexOf("ODE 2021")] ; 
const ode_2020=values[FIELDS.indexOf("ODE 2020")] ; */

// 1) Tüm KF sonuçlarını values'a bağlı tek bir useMemo'da hesapla
  const kf = useMemo(() => {
    // ÖRNEK: 2025 için SAİDİ / SAİFİ puanları
    const saidi2025 = KFPUAN_SAİDİ(
      get(values, "SAIDI 2024"),
      get(values, "SAIDI 2023"),
      get(values, "SAIDI 2022"),
      get(values, "SAIDI 2021"),
     get(values, "SAIDI 2020")
    );

    const saifi2025 = KFPUAN_SAİFİ(
     get(values, "SAIFI 2024"),
      get(values, "SAIFI 2023"),
      get(values, "SAIFI 2022"),
      get(values, "SAIFI 2021"),
     get(values, "SAIFI 2020")
    );

    const saidi2024 = KFPUAN_SAİDİ(
     get(values, "SAIDI 2023"),
      get(values, "SAIDI 2022"),
      get(values, "SAIDI 2021"),
      get(values, "SAIDI 2020"),
     get(values, "SAIDI 2019")
    );

    const saifi2024 = KFPUAN_SAİFİ(
      get(values, "SAIFI 2023"),
      get(values, "SAIFI 2022"),
      get(values, "SAIFI 2021"),
      get(values, "SAIFI 2020"),
     get(values, "SAIFI 2019")
    );

    const saidi2023 = KFPUAN_SAİDİ_2023(
      get(values, "SAIDI 2022"),
      get(values, "SAIDI 2021"),
      get(values, "SAIDI 2020"),
      get(values, "SAIDI 2019"),
      
    );

    const saifi2023 = KFPUAN_SAİFİ_2023(
      get(values, "SAIFI 2022"),
      get(values, "SAIFI 2021"),
      get(values, "SAIFI 2020"),
      get(values, "SAIFI 2019")
    );

    const saidi2022 = KFPUAN_SAİDİ_2022(
      get(values, "SAIDI 2021"),
      get(values, "SAIDI 2020"),
      get(values, "SAIDI 2019")
    );

    const saifi2022 = KFPUAN_SAİFİ_2022(
      get(values, "SAIFI 2021"),
      get(values, "SAIFI 2020"),
      get(values, "SAIFI 2019")
    );

        const ode_2025 = KFODE(
      get(values, "ODE 2024"),
      get(values, "ODE 2023"),
      get(values, "KKO 2024"),
      get(values, "KKO 2023"),

    );

    // İleride 2025/2024 hesaplarını da aynı şekilde ekle
    return {
      "2025": { saidi: saidi2025, saifi: saifi2025 ,ode :ode_2025 },
      "2024": { saidi: saidi2024, saifi: saifi2024 , ode :0 },
      "2023": { saidi: saidi2023, saifi: saifi2023 , ode :0 },
      "2022": { saidi: saidi2022, saifi: saifi2022, ode : 0},
      "2021": { saidi: null, saifi: null }
    };
  }, [values]);


 
 
   
 // ⛳️ YER TUTUCU: İleride burası useComputedMetrics() gibi bir hook olacak.
  // Şimdilik tasarımı göstermek için örnek 5x5 veri üretiyoruz.
  const columns = useMemo(
    () => [
      { key: "metric", header: "Yıl", align: "left" },
      { key: "saidi", header: "SAİDİ PUANI", align: "center" ,colorize: true },
      { key: "saifi", header: "SAİFİ PUANI", align: "center" ,colorize: true },
     // { key: "y2022", header: "ODE PUANI", align: "right" ,colorize: true },
    /*  { key: "trend", header: "ÖNCEKİ SENE PUANI", align: "center",
        
        render: (row) => (
          <span className={`px-2 py-1 rounded-full text-xs ${
            row.trend === "↑" ? "bg-green-100 text-green-700" :
            row.trend === "↓" ? "bg-red-100 text-red-700" :
            "bg-neutral-100 text-neutral-700"
          }`}>
            {row.trend}
          </span>
        )
      }*/
      { key: "ode", header: "ODE PUANI", align: "center"},
           { key: "toplam", header: "TOPLAM KALİTE PUANI", align: "center"},
    ],
    []
  );
  // 3) Satırlar — sadece kf'ye bağlı (values değil!)
  const rows = useMemo(
    () => [
      { metric: "2025", saidi: f(kf["2025"].saidi), saifi: f(kf["2025"].saifi), ode: f(kf["2025"].ode), 
        toplam: f(
        safeNum(kf["2025"].saidi) +
        safeNum(kf["2025"].saifi) +
        safeNum(kf["2025"].ode)
      ), },
      { metric: "2024", saidi: f(kf["2024"].saidi), saifi: f(kf["2024"].saifi), ode: 0, toplam: f(
        safeNum(kf["2024"].saidi) +
        safeNum(kf["2024"].saifi) +
        safeNum(kf["2024"].ode)
      ) },
      { metric: "2023", saidi: f(kf["2023"].saidi), saifi: f(kf["2023"].saifi), ode: 0,  toplam: f(
        safeNum(kf["2023"].saidi) +
        safeNum(kf["2023"].saifi) +
        safeNum(kf["2023"].ode)
      )},
      { metric: "2022", saidi: f(kf["2022"].saidi), saifi: f(kf["2022"].saifi), ode: 0,  toplam: f(
        safeNum(kf["2022"].saidi) +
        safeNum(kf["2022"].saifi) +
        safeNum(kf["2022"].ode)
      ) },
      { metric: "2021", saidi: f(kf["2021"].saidi), saifi: f(kf["2021"].saifi), ode: 0,  toplam: f(
        safeNum(kf["2021"].saidi) +
        safeNum(kf["2021"].saifi) +
        safeNum(kf["2021"].ode)
      ) }
    ],
    [kf]
  );
return (
    
  <div className="container mx-auto p-4">
    
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 ">
      
      {/* Sol: Veri Girişi (toggle'lı) */}
      <div className="lg:col-span-7">
        {visible ? (
          <div className="card bg-info-content text-primary-content shadow-md ">
            <div className="card-body ">
              <div className="flex items-center justify-between">
                <h1 className="card-title ">Veri Girişi</h1>
                <button
                  onClick={() => setVisible(false)}
                  className="btn btn-secondary btn-outline"
                >
                  Gizle
                </button>
              </div>
              <NumberInputs />
              
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-full">
            <button
              onClick={() => setVisible(true)}
              className="btn btn-secondary"
            >
              Veri Gir
            </button>
          </div>
        )}
      </div>

      {/* Sağ: Dinamik Tablo (her zaman görünür) */}
      <div className="lg:col-span-5">
        <DynamicTable
          title="KALİTE FAKTÖRÜ PUANLARI"
          columns={columns}
          rows={rows}
          isLoading={false} // hesaplama yapılırken true yap
        />
      </div>

    </div>
    
  </div>
);

  
 
}

export default App
