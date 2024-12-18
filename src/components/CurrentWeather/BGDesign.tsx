import Image from "next/image";

const BGDesign = () => {
  return (
    <>
      <div className="absolute opacity-40 w-[40%] h-1/3 bottom-0 left-[10%] max-lg:hidden">
        <Image src={"/landing/bottom.png"} alt="bottom" fill />
      </div>
      <div className="absolute opacity-40  h-4/5 w-[14%] top-[10%] right-0 max-lg:hidden">
        <Image src={"/landing/right.png"} alt="right" fill />
      </div>
      <div className="absolute opacity-40 bottom-[10%] right-[28%] w-[8vw] h-[8vw] max-lg:hidden">
        <Image src={"/landing/circle.png"} alt="circle" fill />
      </div>
      <div className="absolute opacity-40 bottom-[20%] left-[32%] w-[8vw] h-[8vw] max-lg:hidden">
        <Image src={"/landing/circle2.png"} alt="circle2" fill />
      </div>
      <div className="absolute bottom-0 right-0 w-1/3 h-1/2 max-lg:hidden">
        <Image src={"/landing/fade.png"} alt="fade" fill />
      </div>
    </>
  );
};

export default BGDesign;
