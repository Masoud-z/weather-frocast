"use client";
import { useRouter } from "next/navigation";
import { AppRouteKey } from "@/core/constants/routes";
import { Units } from "@/core/enums/units";
import useStore from "@/core/store/useStore";
import Link from "next/link";
import { useEffect, useRef } from "react";

const Header = () => {
  const unit = useStore((state) => state.unit);
  const setUnit = useStore((state) => state.setUnit);
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => console.log("scope is: ", registration.scope));
    }
  }, []);

  function submitSearch() {
    if (input.current === null || input.current.value === "") {
      return;
    }
    const search = input.current.value;
    router.push(AppRouteKey.search(search));
  }
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submitSearch();
    }
  };
  return (
    <div className=" bg-black flex px-5 justify-between items-center h-16 text-white ">
      <Link
        href={AppRouteKey.home}
        className=" text-2xl text-center p-4 hover:text-main hoverTransition "
      >
        <span className="max-lg:hidden">Awesome Weather Forecast</span>
        <span className="lg:hidden">AWF</span>
      </Link>
      <div className="flex justify-center items-center  border border-solid border-white rounded-lg p-2 max-lg:w-5/12 max-lg:p-0">
        <input
          ref={input}
          type="text"
          name="search"
          id="search"
          placeholder=""
          onKeyDown={handleKeyPress}
          className="border-none p-1 w-full focus:border-none outline-none bg-[rgba(0,0,0,0)] text-white"
        />
        <button className="hover:cursor-pointer" onClick={() => submitSearch()}>
          &#x1f50d;
        </button>
      </div>
      <div className="flex items-center gap-4">
        <span
          onClick={() => setUnit(Units.Metric)}
          className={`${
            unit !== Units.Metric && "opacity-50"
          } hover:cursor-pointer hover:scale-110  hover:text-main hoverTransition`}
        >
          C
        </span>
        <span className="font-bold text-2xl">|</span>
        <span
          onClick={() => setUnit(Units.Fahrenheit)}
          className={` ${
            unit !== Units.Fahrenheit && "opacity-50"
          } hover:cursor-pointer hover:scale-125 hover:text-main hoverTransition`}
        >
          F
        </span>
      </div>
    </div>
  );
};

export default Header;
