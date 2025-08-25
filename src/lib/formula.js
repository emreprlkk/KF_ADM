// Yardımcı: güvenli sayı çevirici
const toNum = (v) => {
  const n = parseFloat(String(v ?? "").replace(",", "."));
  return Number.isFinite(n) ? n : null;
};
export function avg(...args) {
  // Tüm parametreleri sayıya çevir
  const nums = args.map(toNum);
console.log("args ",...args)
  // Herhangi biri null ise ortalama yok
  if (nums.some(v => v == null)) return null;

  // Terim sayısına göre ortalama
  const toplam = nums.reduce((acc, v) => acc + v, 0);
  console.log("ort return " , toplam / nums.length)
  return toplam / nums.length;
}


// 2025 için örnek formül: ort = avg(SAİDİ 2024, 2023, 2022)
// TSIO = (ort - SAİDİ 2025) / ort
export function KFPUAN_SAİDİ(t_1, t_2, t_3,t_4,t_5) {
 
  const ort = avg(t_2, t_3, t_4);
  //const s2025 = toNum(saidi_2025);
  let saidi_puan;
   console.log("girdi")
 
 if (ort == null || ort === 0  /*s2025 == null*/) return null;

  const TSİOSURE = (ort - t_1) / ort;

 console.log("tsiosaİDİ",TSİOSURE, " ort ", ort)
 
if (
  TSİOSURE > 0 &&
  [t_1, t_2, t_3, t_4, t_5].every(v => v !== null && v !== undefined && v !== "")
){
    const ort_t_1=(avg(t_3, t_4, t_5) ) 

    const tsioSure_t__1=   (ort_t_1 -t_2 )/ort_t_1;
      console.log("tsioSure_t__1",tsioSure_t__1)
  ///SABİT TANIMLAMALARI 
    
  const A=20*100/t_1
  const A2=20*100/t_2
  const B=Math.pow(100/t_1,1/3)
  const B2=Math.pow(100/t_2,1/3)
  const C=(( 20-A )* TSİOSURE *B*25 )
  const C2=(( 20-A2 )* tsioSure_t__1 *B2*25 )

  const OYPFP_SURE=  Math.max ( ( (A2+ C2- 20 ) )*0.5 ,0 )
 console.log("OYPFP_SIKLIK ",OYPFP_SURE)
  saidi_puan=Math.min(  A + ( C )+  OYPFP_SURE ,20 )
     
   
        console.log("saidi_puan",saidi_puan)
    //2000/saidi_2023+(20-(2000/saidi_2023)*tsioSure*25*Math.pow(100/saidi_2023,1/3))
return saidi_puan 
  }
  else if (TSİOSURE <= 0 && TSİOSURE >= -0.05){
      
    return 0;
  }
  else if (TSİOSURE < -0.05 && TSİOSURE >= -0.07){
    return -2;
  }
  else if (TSİOSURE < -0.07 && TSİOSURE >= -0.09){
    return -4;
  }
  else if (TSİOSURE < -0.09 && TSİOSURE >= -0.11){
    return -6;
  }
  else if  (TSİOSURE < -0.11 && TSİOSURE >= -0.13){
    return -8;
  }
  else if (TSİOSURE < -0.13){
     
    return -10;
  }
  
}

export function KFPUAN_SAİFİ(t_1, t_2, t_3,t_4,t_5) {

  
  const ort = avg(t_2, t_3, t_4);
  //const s2025 = toNum(saidi_2025);
  let saifi_puan;
   
 
  if (ort == null || ort === 0  /*s2025 == null*/) return "";

  const TSİOSIKLIK = (ort - t_1) / ort;

 console.log("tsiosaifi",TSİOSIKLIK, " ort ", ort)
 
if (
  TSİOSIKLIK > 0 &&
  [t_1, t_2, t_3, t_4, t_5].every(v => v !== null && v !== undefined && v !== "")
){
    const ort_t_1=(avg(t_3, t_4, t_5) ) 

    const tsioSıklık_t__1=   (ort_t_1 -t_2 )/ort_t_1;
      console.log("tsioSıklık_t__1",tsioSıklık_t__1)
  ///SABİT TANIMLAMALARI 
    
  const A=20/t_1
  const A2=20/t_2
  const B=Math.pow(1/t_1,1/3)
  const B2=Math.pow(1/t_2,1/3)
  const C=(( 20-A )* TSİOSIKLIK *B*25 )
  const C2=(( 20-A2 )* tsioSıklık_t__1 *B2*25 )

  const OYPFP_SIKLIK=  Math.max ( ( (A2+ C2- 20 ) )*0.5 ,0 )
 console.log("OYPFP_SIKLIK ",OYPFP_SIKLIK)
  saifi_puan=Math.min(  A + ( C )+  OYPFP_SIKLIK ,20 )
     
   
        console.log("saifi_puan",saifi_puan)
    //2000/saidi_2023+(20-(2000/saidi_2023)*tsioSure*25*Math.pow(100/saidi_2023,1/3))
return saifi_puan 
  }
  else if (TSİOSIKLIK <= 0 && TSİOSIKLIK >= -0.05){
      
    return 0;
  }
  else if (TSİOSIKLIK < -0.05 && TSİOSIKLIK >= -0.07){
    return -2;
  }
  else if (TSİOSIKLIK < -0.07 && TSİOSIKLIK >= -0.09){
    return -4;
  }
  else if (TSİOSIKLIK < -0.09 && TSİOSIKLIK >= -0.11){
    return -6;
  }
  else if  (TSİOSIKLIK < -0.11 && TSİOSIKLIK >= -0.13){
    return -8;
  }
  else if (TSİOSIKLIK < -0.13){
     
    return -10;
  }
  
}

export function KFPUAN_SAİDİ_2023(t_1, t_2, t_3,t_4 ) {
 
  const ort = avg(t_2, t_3, t_4);
  //const s2025 = toNum(saidi_2025);
  let saidi_puan;
 
 
 if (ort == null || ort === 0  /*s2025 == null*/) return null;

  const TSİOSURE = (ort - t_1) / ort;

 console.log("tsiosaİDİ",TSİOSURE, " ort ", ort)
 
if (
  TSİOSURE > 0 &&
  [t_1, t_2, t_3, t_4].every(v => v !== null && v !== undefined && v !== "")
){
    const ort_t_1=(avg(t_3, t_4 ) ) 

    const tsioSure_t__1=   (ort_t_1 -t_2 )/ort_t_1;
      console.log("tsioSure_t__1",tsioSure_t__1)
  ///SABİT TANIMLAMALARI 
    
  const A=20*100/t_1
  const A2=20*100/t_2
  const B=Math.pow(100/t_1,1/3)
  const B2=Math.pow(100/t_2,1/3)
  const C=(( 20-A )* TSİOSURE *B*25 )
  const C2=(( 20-A2 )* tsioSure_t__1 *B2*25 )

  const OYPFP_SURE=  Math.max ( ( (A2+ C2- 20 ) )*0.5 ,0 )
 console.log("OYPFP_SIKLIK ",OYPFP_SURE)
  saidi_puan=Math.min(  A + ( C )+  OYPFP_SURE ,20 )
     
   
        console.log("saidi_puan",saidi_puan)
    //2000/saidi_2023+(20-(2000/saidi_2023)*tsioSure*25*Math.pow(100/saidi_2023,1/3))
return saidi_puan 
  }
  else if (TSİOSURE <= 0 && TSİOSURE >= -0.05){
      
    return 0;
  }
  else if (TSİOSURE < -0.05 && TSİOSURE >= -0.07){
    return -2;
  }
  else if (TSİOSURE < -0.07 && TSİOSURE >= -0.09){
    return -4;
  }
  else if (TSİOSURE < -0.09 && TSİOSURE >= -0.11){
    return -6;
  }
  else if  (TSİOSURE < -0.11 && TSİOSURE >= -0.13){
    return -8;
  }
  else if (TSİOSURE < -0.13){
     
    return -10;
  }
  
}
export function KFPUAN_SAİFİ_2023(t_1, t_2, t_3,t_4) {

  
  const ort = avg(t_2, t_3, t_4);
  //const s2025 = toNum(saidi_2025);
  let saifi_puan;
   
 
  if (ort == null || ort === 0  /*s2025 == null*/) return "";

  const TSİOSIKLIK = (ort - t_1) / ort;

 console.log("tsiosaifi",TSİOSIKLIK, " ort ", ort)
 
if (
  TSİOSIKLIK > 0 &&
  [t_1, t_2, t_3, t_4].every(v => v !== null && v !== undefined && v !== "")
){
    const ort_t_1=(avg(t_3, t_4) ) 

    const tsioSıklık_t__1=   (ort_t_1 -t_2 )/ort_t_1;
      console.log("tsioSıklık_t__1",tsioSıklık_t__1)
  ///SABİT TANIMLAMALARI 
    
  const A=20/t_1
  const A2=20/t_2
  const B=Math.pow(1/t_1,1/3)
  const B2=Math.pow(1/t_2,1/3)
  const C=(( 20-A )* TSİOSIKLIK *B*25 )
  const C2=(( 20-A2 )* tsioSıklık_t__1 *B2*25 )

  const OYPFP_SIKLIK=  Math.max ( ( (A2+ C2- 20 ) )*0.5 ,0 )
 console.log("OYPFP_SIKLIK ",OYPFP_SIKLIK)
  saifi_puan=Math.min(  A + ( C )+  OYPFP_SIKLIK ,20 )
     
   
        console.log("saifi_puan",saifi_puan)
    //2000/saidi_2023+(20-(2000/saidi_2023)*tsioSure*25*Math.pow(100/saidi_2023,1/3))
return saifi_puan 
  }
  else if (TSİOSIKLIK <= 0 && TSİOSIKLIK >= -0.05){
      
    return 0;
  }
  else if (TSİOSIKLIK < -0.05 && TSİOSIKLIK >= -0.07){
    return -2;
  }
  else if (TSİOSIKLIK < -0.07 && TSİOSIKLIK >= -0.09){
    return -4;
  }
  else if (TSİOSIKLIK < -0.09 && TSİOSIKLIK >= -0.11){
    return -6;
  }
  else if  (TSİOSIKLIK < -0.11 && TSİOSIKLIK >= -0.13){
    return -8;
  }
  else if (TSİOSIKLIK < -0.13){
     
    return -10;
  }
  
}
 

export function KFPUAN_SAİDİ_2022(t_1, t_2, t_3 ) {
 
  const ort = avg(t_2, t_3);
  //const s2025 = toNum(saidi_2025);
  let saidi_puan;
   
 
  if (ort == null || ort === 0  /*s2025 == null*/) return 88;

  const TSİOSURE = (ort - t_1) / ort;

// console.log("tsiosaİDİ",TSİOSURE, " ort ", ort)
 
if (
  TSİOSURE > 0 &&
  [t_1, t_2, t_3].every(v => v !== null && v !== undefined && v !== "")
){
    const ort_t_1=(avg(t_3 ) ) 

    const tsioSure_t__1=   (ort_t_1 -t_2 )/ort_t_1;
     // console.log("tsioSure_t__1",tsioSure_t__1)
  ///SABİT TANIMLAMALARI 
    
  const A=20*100/t_1
  const A2=20*100/t_2
  const B=Math.pow(100/t_1,1/3)
  const B2=Math.pow(100/t_2,1/3)
  const C=(( 20-A )* TSİOSURE *B*25 )
  const C2=(( 20-A2 )* tsioSure_t__1 *B2*25 )

  const OYPFP_SURE=  Math.max ( ( (A2+ C2- 20 ) )*0.5 ,0 )
 //console.log("OYPFP_SIKLIK ",OYPFP_SURE)
  saidi_puan=Math.min(  A + ( C )+  OYPFP_SURE ,20 )
     
   
    //    console.log("saidi_puan",saidi_puan)
    //2000/saidi_2023+(20-(2000/saidi_2023)*tsioSure*25*Math.pow(100/saidi_2023,1/3))
return saidi_puan 
  }
  else if (TSİOSURE <= 0 && TSİOSURE >= -0.05){
      
    return 0;
  }
  else if (TSİOSURE < -0.05 && TSİOSURE >= -0.07){
    return -2;
  }
  else if (TSİOSURE < -0.07 && TSİOSURE >= -0.09){
    return -4;
  }
  else if (TSİOSURE < -0.09 && TSİOSURE >= -0.11){
    return -6;
  }
  else if  (TSİOSURE < -0.11 && TSİOSURE >= -0.13){
    return -8;
  }
  else if (TSİOSURE < -0.13){
     
    return -10;
  }
  
}

export function KFPUAN_SAİFİ_2022(t_1, t_2, t_3 ) {

  
  const ort = avg(t_2, t_3);
  //const s2025 = toNum(saidi_2025);
  let saifi_puan;
   
 
  if (ort == null || ort === 0  /*s2025 == null*/) return null;

  const TSİOSIKLIK = (ort - t_1) / ort;

 //console.log("tsiosaifi",TSİOSIKLIK, " ort ", ort)
 
if (
  TSİOSIKLIK > 0 &&
  [t_1, t_2, t_3].every(v => v !== null && v !== undefined && v !== "")
){
    const ort_t_1=(avg(t_3) ) 

    const tsioSıklık_t__1=   (ort_t_1 -t_2 )/ort_t_1;
    //  console.log("tsioSıklık_t__1",tsioSıklık_t__1)
  ///SABİT TANIMLAMALARI 
    
  const A=20/t_1
  const A2=20/t_2
  const B=Math.pow(1/t_1,1/3)
  const B2=Math.pow(1/t_2,1/3)
  const C=(( 20-A )* TSİOSIKLIK *B*25 )
  const C2=(( 20-A2 )* tsioSıklık_t__1 *B2*25 )

  const OYPFP_SIKLIK=  Math.max ( ( (A2+ C2- 20 ) )*0.5 ,0 )
 //console.log("OYPFP_SIKLIK ",OYPFP_SIKLIK)
  saifi_puan=Math.min(  A + ( C )+  OYPFP_SIKLIK ,20 )
     
   
       // console.log("saifi_puan",saifi_puan)
    //2000/saidi_2023+(20-(2000/saidi_2023)*tsioSure*25*Math.pow(100/saidi_2023,1/3))
return saifi_puan 
  }
  else if (TSİOSIKLIK <= 0 && TSİOSIKLIK >= -0.05){
      
    return 0;
  }
  else if (TSİOSIKLIK < -0.05 && TSİOSIKLIK >= -0.07){
    return -2;
  }
  else if (TSİOSIKLIK < -0.07 && TSİOSIKLIK >= -0.09){
    return -4;
  }
  else if (TSİOSIKLIK < -0.09 && TSİOSIKLIK >= -0.11){
    return -6;
  }
  else if  (TSİOSIKLIK < -0.11 && TSİOSIKLIK >= -0.13){
    return -8;
  }
  else if (TSİOSIKLIK < -0.13){
     
    return -10;
  }
  
}
export function KFODE(ode_t_1, ode_t_2, gkko_t_1,gkko_t_2) {
console.log(ode_t_1, ode_t_2, gkko_t_1,gkko_t_2)
const ODEİOt=( (ode_t_2-ode_t_1 )/ode_t_2 )+ (gkko_t_2-gkko_t_1)
console.log("ODEİOt ",ODEİOt)
if(ODEİOt>=0.11){
return 5;

}
else if(0.09<= ODEİOt && ODEİOt<0.11){
return 4;
}
else if(0.07<= ODEİOt && ODEİOt<0.09){
return 3;
}
else if(0.05<= ODEİOt && ODEİOt<0.07){
return 2;
}
else if(0.03<= ODEİOt && ODEİOt<0.05){
return 1;
}
else if(0.03> ODEİOt && ODEİOt>=-0.05){
return 0;
}
else if(-0.05> ODEİOt && ODEİOt>=-0.07){
return -0.5
}
else if(-0.07> ODEİOt && ODEİOt>=-0.09){
return -1;
}
else if(-0.09> ODEİOt && ODEİOt>=-0.11){
return -1.5;
}
else if(-0.11> ODEİOt && ODEİOt>=-0.13){
return -2;
}
else if( -0.13>ODEİOt){
return -2.5;
}
}