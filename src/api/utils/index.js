import axios from "axios";

export const imageUpload = async photo => {
       // image upload korar binary code a convert korte hobe image k maybe.
       const formData = new FormData();
       formData.append('image', photo)

       // image upload korbo
       const {data} = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData)
       console.log(data.data.display_url)
       return data?.data?.display_url;
}