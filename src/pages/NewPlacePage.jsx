import NewPlaceForm from "../components/NewPlaceForm";
import ProfilePageContainer from "../components/ProfilePageContainer";

const NewPlacePage = () => {
  return (
    <ProfilePageContainer>
      <div className="flex max-w-3xl flex-col">
        <NewPlaceForm />
      </div>
    </ProfilePageContainer>
  );
};

export default NewPlacePage;
