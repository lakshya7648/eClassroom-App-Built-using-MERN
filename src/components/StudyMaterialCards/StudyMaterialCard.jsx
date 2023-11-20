import React from "react";

const StudyMaterialCard = ({ itemSource, itemName }) => {
  return (
    <>
      <div className="w-52 bg-white border border-gray-200 hover:bg-green-50 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer">
        <video className="w-full h-32 rounded-t-md" controls>
          <source src = {itemSource} />
          Your Browser doesn't support this tag
        </video>

        <div className="p-5">
          <h5 className="mb-2 text-xl font-normal font-Young-Serif tracking-tight break-words text-gray-900 dark:text-white hover:text-green-600">
            {itemName}
          </h5>
        </div>
      </div>
    </>
  );
};

export default StudyMaterialCard;
