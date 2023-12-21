import loginBackgroundImage from "../assets/login-background.jpg";

const ImageBackgroundPageContainer = ({ children }) => {
  return (
    <div className="m-auto flex max-w-[500px] flex-col rounded-lg bg-white-blur p-10 shadow-around">
      <img
        className="absolute left-0 top-0 -z-10 h-screen w-screen"
        src={loginBackgroundImage}
      />
      {children}
    </div>
  );
};

export default ImageBackgroundPageContainer;
