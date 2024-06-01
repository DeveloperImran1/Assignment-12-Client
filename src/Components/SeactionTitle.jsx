
const SeactionTitle = ({title, description}) => {
    return (
        <div className="flex flex-col justify-center items-center gap-4 my-7" >
            <h2 className="text-3xl font-bold" >{title}</h2>
            <p className="text-xl text-center w-[80%] " >{description}</p>
        </div>
    );
};

export default SeactionTitle;