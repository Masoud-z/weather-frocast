"use client";
import { AppRouteKey } from "@/core/constants/routes";
import { Units } from "@/core/enums/units";
import useStore from "@/core/store/useStore";
import Link from "next/link";

const Header = () => {
  const unit = useStore((state) => state.unit);
  const setUnit = useStore((state) => state.setUnit);
  return (
    <div className=" bg-black flex px-5 justify-between items-center h-16 text-white ">
      <Link
        href={AppRouteKey.home}
        className=" text-2xl text-center p-4 hover:opacity-60 transition-all ease-linear duration-300"
      >
        Awesome Weather Forecast
      </Link>
      <div className="flex items-center gap-4">
        <span
          onClick={() => setUnit(Units.Metric)}
          className={`${
            unit !== Units.Metric && "opacity-50"
          } hover:cursor-pointer hover:scale-110  hover:text-main transition-all ease-linear duration-300`}
        >
          C
        </span>
        <span className="font-bold text-2xl">|</span>
        <span
          onClick={() => setUnit(Units.Fahrenheit)}
          className={` ${
            unit !== Units.Fahrenheit && "opacity-50"
          } hover:cursor-pointer hover:scale-125 hover:text-main transition-all ease-linear duration-300`}
        >
          F
        </span>
      </div>
    </div>
  );
};

export default Header;
