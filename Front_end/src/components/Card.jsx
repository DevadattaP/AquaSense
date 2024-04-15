import React from "react";

const Card = ({ image, title, buttonText, style, onClick }) => {
  const cardStyle = {
    ...style
  };

  return (
    <div className="max-w-sm rounded-xl overflow-hidden shadow-lg m-4 bg-indigo-100">
      <div className="p-4 rounded-xl">
        <img
          className="w-full h-auto rounded-xl object-cover object-center shadow-lg"
          src={image}
          alt={title}
          style={cardStyle}
        />
      </div>
      <div className="px-6 py-4 text-center">
        <div className="font-bold text-xl mb-2">{title}</div>
        <button
          onClick={onClick}
          className="bg-gray-300 hover:bg-gray-400 font-bold py-2 px-4 rounded shadow-md"
          style={{ borderRadius: "24px", color: "black" }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Card;