import React from "react";

const Card = ({ image, title, buttonText, style, onClick }) => {
  const cardStyle = {
    ...style
  };

  return (
    <div className="max-w-sm rounded-xl overflow-hidden shadow-lg m-4 bg-indigo-100 border border-indigo-200">
      <div className="p-4 rounded-xl">
        <img
          className="w-full h-auto rounded-xl object-cover object-center shadow-lg"
          src={image}
          alt={title}
          style={cardStyle}
        />
      </div>
      <div className="px-6 py-2 text-center">
        <div className="font-bold text-xl mb-3">{title}</div>
      </div>
    </div>
  );
};

export default Card;
