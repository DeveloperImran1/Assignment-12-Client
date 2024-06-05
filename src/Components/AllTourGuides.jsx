import React from 'react';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import TourGuideCard from './TourGuideCard';
import SeactionTitle from './SeactionTitle';

const AllTourGuides = () => {
    const axiosPublic = useAxiosPublic();
    const { data: tourGuides = [] } = useQuery({
        queryKey: ['tourGuides'],
        queryFn: async () => {
            const data = await axiosPublic.get('/tourGuides')
            return data.data;
        }
    })
    console.log('all tour guides', tourGuides)
    return (
        <section className="py-6 dark:bg-gray-100 dark:text-gray-800">
            <div className="container flex flex-col items-center justify-center p-4 mx-auto space-y-8 sm:p-10">
          
             <SeactionTitle name="Tour Guides" title='Explore Our All Tour Guides' ></SeactionTitle>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center">
                    {
                        tourGuides?.map(guide => <TourGuideCard key={guide?._id} guide={guide} ></TourGuideCard>)
                    }
                </div>
            </div>
        </section>
    );
};

export default AllTourGuides;