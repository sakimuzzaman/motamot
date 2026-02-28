import React from "react";

const DefaultProfile = ({ name }) => {
    // Get the first letter of the name and capitalize it
    const initial = name?.charAt(0).toUpperCase();

    return (
        <div className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white font-bold text-lg rounded-full">
            {initial}
        </div>
    );
};

export default DefaultProfile;
