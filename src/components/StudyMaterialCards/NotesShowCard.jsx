import React from "react";

const NotesShowCard = ({ itemSource, itemName, thumbnail }) => {
  return (
    <div className="w-52 bg-white border border-gray-200 hover:bg-green-50 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href={itemSource} target="_blank" className="w-full h-20 rounded-t-md">
        <img src={thumbnail} className="w-32 h-32 mx-auto" />
      </a>
      <div className="p-5">
        <h5 className="mb-2 text-xl font-normal font-Young-Serif tracking-tight break-words text-gray-900 dark:text-white hover:text-green-600">
          {itemName}
        </h5>
      </div>
    </div>
  );
};

export default NotesShowCard;
