import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import SeactionTitle from '../../Components/SeactionTitle';
import TourismOverview from '../../Components/TourismOverview';
import AllTourGuides from '../../Components/AllTourGuides';
import OurPackages from '../../Components/OurPackages/OurPackages';

// framer motion
import { fadeIn } from '../../hooks/Variant'
import { motion } from "framer-motion"


const TourismAndTravelsGuide = () => {
    return (
       <>
        <div>
            <motion.div
            variants={fadeIn('up', 0.2)}
            initial="hidden"
            whileInView={'show'}
            viewport={{once: false, amount: 0.7}}
            >
                <SeactionTitle title="Explore Our Tourism & Travels Guide" name="Travels Guide"  ></SeactionTitle>

            </motion.div>
            <Tabs>
                <TabList>
                    <Tab>Overview</Tab>
                    <Tab>Our Packages</Tab>
                    <Tab>Meet Our Tour Guides</Tab>
                </TabList>

                <TabPanel>
                    <TourismOverview></TourismOverview>
                </TabPanel>
                <TabPanel>
                    <OurPackages></OurPackages>
                </TabPanel>
                <TabPanel>
                    <AllTourGuides></AllTourGuides>
                </TabPanel>
            </Tabs>
        </div>
       
       </>
    );
};

export default TourismAndTravelsGuide;