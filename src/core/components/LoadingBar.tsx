const LoadingBar = () => {
  return (
    <div className="flex justify-center items-center w-6 h-6 ">
      {[...Array(8)].map((_, index) => (
        <span
          key={index}
          className={`absolute block w-[2%] h-[2%] rounded-full bg-white animate-dotted-spin`}
          style={{
            transform: `rotate(${index * 45}deg) translate(5px)`,
          }}
        ></span>
      ))}
    </div>
  );
};

export default LoadingBar;
