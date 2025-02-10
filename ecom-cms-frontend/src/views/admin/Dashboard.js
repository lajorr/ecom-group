// components

import CardBarChart from "components/Cards/CardBarChart.js";
import CardLineChart from "components/Cards/CardLineChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";
import { useBrandContext } from "providers/BrandProvider";
import { useEffect } from "react";

export default function Dashboard() {
  const brandContext = useBrandContext();

  useEffect(() => {
    brandContext.getAllBrands();
  }, []);
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
        </div>
      </div>
    </>
  );
}
