import { Link } from "react-router-dom";
import ImageBackgroundPageContainer from "../components/ImageBackgroundContainer";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";

const AboutPage = () => {
  const { userInfo, setShowAboutPage } = useContext(UserContext);
  const [redirect, setRedirect] = useState("/");

  useEffect(() => {
    setShowAboutPage(true);
    if (!userInfo) {
      setRedirect("/register");
    }
  }, []);

  const message = `This is a fully functional booking site inspired by Airbnb. 
                    You can register as a user, view places, list your place, 
                    book accommodations, and more.`;

  return (
    <ImageBackgroundPageContainer>
      <div className="m-auto my-4 max-w-[400px] text-black">
        <h1 className="mb-6 text-center text-3xl font-bold">About this site</h1>
        <p className="mb-6">{message}</p>
        <p>
          Attention: <span className="font-semibold">DO NOT USE</span> real
          world credentials for this site.
        </p>
        <Link
          to={redirect}
          className="mt-4 block w-full rounded-lg bg-primary p-2 text-center text-white"
        >
          I understand
        </Link>
      </div>
    </ImageBackgroundPageContainer>
  );
};

export default AboutPage;
