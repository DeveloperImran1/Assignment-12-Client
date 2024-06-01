import React from 'react';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const AllTourGuides = () => {
    const axiosPublic = useAxiosPublic();
    const { data: tourGuids = [] } = useQuery({
        queryKey: ['tourGuides'],
        queryFn: async () => {
            const data = await axiosPublic.get('/tourGuides')
            return data.data;
        }
    })
    console.log(tourGuids)
    return (
        <section className="py-6 dark:bg-gray-100 dark:text-gray-800">
            <div className="container flex flex-col items-center justify-center p-4 mx-auto space-y-8 sm:p-10">
                <h1 className="text-4xl font-bold leading-none text-center sm:text-5xl">Our team</h1>
                <p className="max-w-2xl text-center dark:text-gray-600">At a assumenda quas cum earum ut itaque commodi saepe rem aspernatur quam natus quis nihil quod, hic explicabo doloribus magnam neque, exercitationem eius sunt!</p>
                <div className="flex flex-row flex-wrap-reverse justify-center">
                    {
                        tourGuids?.map(guide => <Link to={`/tourGuide/${guide?._id}`} key={guide._id} className="flex flex-col justify-center m-8 text-center">
                            <img alt="" className="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full dark:bg-gray-500" src="https://source.unsplash.com/100x100/?portrait?0" />
                            <p className="text-xl font-semibold leading-tight">{guide?.name}</p>
                            <p className="dark:text-gray-600">Phone: {guide?.phone_number}</p>
                        </Link>
                        )
                    }
                </div>
            </div>
        </section>
    );
};

export default AllTourGuides;