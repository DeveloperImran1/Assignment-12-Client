import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const BlogsDetails = () => {
    const axiosPublic = useAxiosPublic();
    const {id} = useParams();
    const {data: blog, refetch}= useQuery({
        queryKey: ['blog', id], 
        queryFn: async()=> {
            const res = await axiosPublic.get(`/blog/${id}`)
            return res.data;
        }
    })
    console.log(blog)
    return (
        <div>
            details page
        </div>
    );
};

export default BlogsDetails;