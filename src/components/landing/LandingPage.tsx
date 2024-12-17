import Image from "next/image";

interface IProps {}

const LandingPage = ({}: IProps) => {
  return (
    <main className="w-full min-h-screen flex justify-center items-center relative">
      <div className="absolute w-[40%] h-1/3 bottom-0 left-[10%] max-lg:hidden">
        <Image src={"/landing/bottom.png"} alt="bottom" fill />
      </div>
      <div className="absolute  h-4/5 w-[14%] top-[10%] right-0 max-lg:hidden">
        <Image src={"/landing/right.png"} alt="right" fill />
      </div>
      <div className="absolute bottom-[10%] right-[35%] w-[8vw] h-[8vw] max-lg:hidden">
        <Image src={"/landing/circle.png"} alt="circle" fill />
      </div>
      <div className="absolute bottom-0 right-0 w-1/3 h-1/2 max-lg:hidden">
        <Image src={"/landing/fade.png"} alt="fade" fill />
      </div>
    </main>
  );
};

export default LandingPage;
