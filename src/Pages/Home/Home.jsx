import Banner from "./Banner";
import TourType from "./TourType";
import TourismAndTravelsGuide from "./TourismAndTravelsGuide";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <TourismAndTravelsGuide></TourismAndTravelsGuide>
            <TourType></TourType>
        </div>
    );
};

export default Home;