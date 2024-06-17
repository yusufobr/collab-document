import React from "react";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router";

const UserList = ({
  docTitle,
  setDocTitle,
  onlineUsers,
  socket,
  exportAsPDF,
}) => {

  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <button title="Back" onClick={() => navigate("/home")} className="p-2 rounded-full bg-gray-100">
          <FaArrowLeft size={22} />
        </button>
        <button title="Download Pdf" className="p-2 rounded-full bg-gray-100 " onClick={exportAsPDF}>
          <HiOutlineDocumentDownload size={24} />
        </button>
        <input
          className="text-2xl p-1 px-4 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400"
          value={docTitle}
          maxLength={50}
          onChange={(e) => setDocTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap gap-2 flex-end items-center">
        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
        <span className="font-bold">Live Users:</span>
        {onlineUsers.map((user, index) => {
          return (
            <span
              key={index}
              title={user}
              className="px-3 bg-gray-200 bg-opacity-60 rounded-full"
            >
              {user === socket.id ? "Me" : user.slice(0, 4) + "..."}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default UserList;
