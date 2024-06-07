import Banner from "./Banner";
import StoryContainer from "./StorieSection/StoryContainer";
import TourType from "./TourType";
import TourismAndTravelsGuide from "./TourismAndTravelsGuide";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <TourismAndTravelsGuide></TourismAndTravelsGuide>
            <TourType></TourType>
            <StoryContainer></StoryContainer>
        </div>
    );
};

export default Home;