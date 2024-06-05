
const SeactionTitle = ({name, title}) => {
    return (
        <div className="flex flex-col justify-center items-center gap-4 my-7" >
            <p className="text-[18px] text-center sriracha px-2 rounded-md text-white  -rotate-6 bg-[#076aa5] " >{name}</p>
            <h2 className="text-3xl font-bold " >{title}</h2>
        </div>
    );
};

export default SeactionTitle;