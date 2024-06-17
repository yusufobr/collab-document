import React from "react";

const Header = () => {
  return (
    <div className="sticky top-0 bg-white z-20 border-b container max-w-screen-xl mx-auto p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-center">Document Editor</h1>

        <div className="flex justify-center gap-4">
          <button className="p-2 px-4 bg-gray-100 rounded-full">Home</button>
          <button onClick={() => document.location.replace("/new")} className="p-2 px-4 bg-gray-100 rounded-full">New</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
