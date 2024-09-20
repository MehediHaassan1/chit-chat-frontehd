import loading from "../../assets/jumping-ball-loading.gif";

const CustomLoading = () => {
    return (
        <div className="bg-gray-800 w-full h-screen fixed inset-0 backdrop-blur-md flex items-center justify-center">
            <img src={loading} alt="Loading..." />
        </div>
    );
};

export default CustomLoading;
