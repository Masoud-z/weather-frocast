interface Props {}

const ForecastDayData = (props: Props) => {
  return (
    <div className="w-64 h-64 grid grid-cols-2 grid-rows-2 gap-1 justify-center items-center rounded-full shadow-[inset_0_35px_60px_-15px_rgba(81,169,255,0.3)] p-6 ">
      <div className="text-6xl font-bold">12°</div>
      <img src="/landing/Sun.png" alt="Weather Icon" className="w-20 h-20" />
      <div className="flex flex-col justify-center items-center">
        <div className=""></div>
        <div className="text-lg font-medium">Monday</div>
      </div>
      <div className="text-sm text-gray-500">Tabriz</div>
    </div>
  );
};

export default ForecastDayData;
