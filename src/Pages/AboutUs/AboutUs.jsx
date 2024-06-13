import TourGuideRevew from "../../Components/TourGuideRevew";

const About = () => {

const guideInfo = 
    {
      "_id": "665dce55534040abe9bed571",
      "userName": "hahaa",
      "userEmail": "hocigi5400@jahsec.com",
      "userPhoto": "https://i.ibb.co/W2zvQHn/179945-stranger.jpg",
      "userRole": "Admin",
      "userStatus": "Verified",
      "age": "543",
      "education": "hsc",
      "experience": "4",
      "phoneNumber": "01311710894",
      "skills": "nai",
      "timestamp": 1717596611220,
      "reviews": [
        {
          "message": "Amazing tour, highly recommended!",
          "rating": 5,
          "touristEmail": "tourist1@example.com",
          "photoURL": "https://i.ibb.co/W2zvQHn/179945-stranger.jpg",
          "date": "2024-06-03T20:01:45.274Z",
          "userName": "JohnDoe"
        },
        {
          "message": "The guide was very knowledgeable and friendly.",
          "rating": 4,
          "touristEmail": "tourist2@example.com",
          "photoURL": "https://livedemo00.template-help.com/wt_prod-28463/images/agents-04-540x460.jpg",
          "date": "2024-06-03T20:02:30.729Z",
          "userName": "JaneSmith"
        },
        {
          "message": "Great experience, would love to join again.",
          "rating": 5,
          "touristEmail": "tourist3@example.com",
          "photoURL": "https://www.marketingdonut.co.uk/sites/default/files/measuring-customer-satisfaction-408402166.jpg",
          "date": "2024-06-03T20:03:27.790Z",
          "userName": "MikeJohnson"
        },
        {
          "message": "Good but could be better organized.",
          "rating": 3,
          "touristEmail": "tourist4@example.com",
          "photoURL": "https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/blogs/26216/images/5muGBJNHRyyOg8d9RpnU_Abby33.jpg",
          "date": "2024-06-03T20:04:15.322Z",
          "userName": "EmilyDavis"
        },
        {
          "message": "Not satisfied with the service.",
          "rating": 2,
          "touristEmail": "tourist5@example.com",
          "photoURL": "https://tse1.mm.bing.net/th?id=OIP.0yU5ipTyhVnH7We80PQeIgHaJQ&pid=Api&P=0&h=220",
          "date": "2024-06-03T20:05:27.326Z",
          "userName": "ChrisBrown"
        },
        {
          "message": "Excellent tour, worth every penny!",
          "rating": 5,
          "touristEmail": "tourist6@example.com",
          "photoURL": "https://c.pxhere.com/photos/08/7a/male_portrait_profile_social_media_cv_young_elegant_suit-459413.jpg!d",
          "date": "2024-06-03T20:17:01.163Z",
          "userName": "SarahWilson"
        }
      ]
    };
  
  


    return (
        <div>
            <section className="h-[500px] w-full relative bg-no-repeat bg-cover bg-center text-white " style={{ backgroundImage: "url('https://i.ibb.co/XVyfN30/1660332489082.jpg')" }} >
                <div className="h-[170px] w-full bg-gradient-to-b from-black to-[#d1d8db] opacity-60 absolute" >
                </div>
                <div className="absolute top-16 left-[45%] flex flex-col items-center justify-center" >
                    <h3 className="text-center   px-4 md:px-6 py-1 md:text-base text-[25px]   text-white flex justify-center"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 256 256" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M244,128v56a12,12,0,0,1-12,12H128a12,12,0,0,1-12-12V84H36v44a12,12,0,0,1-24,0V72A12,12,0,0,1,24,60H128a12,12,0,0,1,12,12V172h80V128a12,12,0,0,1,24,0Z"></path></svg><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 256 256" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M244,128v56a12,12,0,0,1-12,12H128a12,12,0,0,1-12-12V84H36v44a12,12,0,0,1-24,0V72A12,12,0,0,1,24,60H128a12,12,0,0,1,12,12V172h80V128a12,12,0,0,1,24,0Z"></path></svg><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 256 256" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M244,128v56a12,12,0,0,1-12,12H128a12,12,0,0,1-12-12V84H36v44a12,12,0,0,1-24,0V72A12,12,0,0,1,24,60H128a12,12,0,0,1,12,12V172h80V128a12,12,0,0,1,24,0Z"></path></svg></h3>
                    <p className="text-5xl font-bold  text-white text-center" >About Us</p>

                </div>
            </section>
            <TourGuideRevew guideInfo={guideInfo} ></TourGuideRevew>

            <div className="flex justify-between" >
                <section className="dark:bg-gray-100 dark:text-gray-800">
                    <div className="container flex flex-col justify-center px-4 py-8 mx-auto md:p-8">
                        <h2 className="text-2xl font-semibold sm:text-4xl">Frequently Asked Questions</h2>
                        <p className="mt-4 mb-8 dark:text-gray-600">Sagittis tempor donec id vestibulum viverra. Neque condimentum primis orci at lacus amet bibendum.</p>
                        <div className="space-y-4">
                            <details className="w-full border rounded-lg">
                                <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">What is the best time to book a tour?</summary>
                                <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">The best time to book a tour depends on your destination and the type of experience you want. Generally, booking a few months in advance can help you secure the best prices and availability.  </p>
                            </details>
                            <details className="w-full border rounded-lg">
                                <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">How can I customize my tour package?</summary>
                                <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">To customize your tour package, you can contact our customer service team directly. They will assist you in tailoring the itinerary to suit your preferences.</p>
                            </details>
                            <details className="w-full border rounded-lg">
                                <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">What should I pack for my trip?</summary>
                                <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">Packing essentials vary based on your destination and the activities planned. Generally, we recommend packing comfortable clothing, suitable footwear, a hat, sunscreen, a reusable water bottle, and any personal medications.  </p>
                            </details>
                        </div>
                    </div>
                </section>
                <div>
                    <img className="w-[100%] h-[500px]" src="https://i.ibb.co/thkp6CF/faq-frequently-asked-questions-concept-people-ask-questions-and-receive-answers-support-center-illus.jpg" alt="" />
                </div>
            </div>
        </div>
    );
};

export default About;