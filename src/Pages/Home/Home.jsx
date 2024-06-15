import Banner from "./Banner";
import Countdown from "./Countdown";
import StoryContainer from "./StorieSection/StoryContainer";
import TourType from "./TourType";
import TourismAndTravelsGuide from "./TourismAndTravelsGuide";
import { Helmet } from "react-helmet";



const Home = () => {
    return (
        <div>
            <Helmet>
                <title>TouristBook || Home</title>
            </Helmet>
            <Banner></Banner>
            <TourismAndTravelsGuide></TourismAndTravelsGuide>
            <TourType></TourType>
            <StoryContainer></StoryContainer>
            <Countdown></Countdown>
        </div>
    );
};

export default Home;