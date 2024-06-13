import Banner from "./Banner";
import Countdown from "./Countdown";
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
            <Countdown></Countdown>
        </div>
    );
};

export default Home;