import React, { useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { fetchDocuments, deleteDocument } from "../redux/docs/docsSlice";
import Header from "../components/Header";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { docs, isLoading } = useSelector((state) => state.docs);

  useEffect(() => {
    dispatch(fetchDocuments());
  }, []);

const handleDelete = async (id) => {
  dispatch(deleteDocument(id));
}

  return (
    <>
    <Header />
    <div className="container max-w-screen-xl mx-auto p-4 pb-8">
      <div className="grid grid-cols-4 gap-4 p-2">
        <div className="col-span-1 flex flex-col gap-8 bg-gray-100 px-4 py-8 pb-16 shadow-md rounded-md border">
          <h2 className="px-2">Create New :</h2>
          <div
            onClick={() => document.location.replace("/new")}
            className="flex flex-col justify-between items-center p-3 rounded-md border border-gray-300 text-gray-300 cursor-pointer hover:text-gray-400"
          >
            <HiOutlineDocumentAdd size={120} />
          </div>
        </div>
        <div className="col-span-3 flex flex-col gap-4 bg-gray-100 px-4 py-8 pb-16 shadow-md rounded-md border">
          <h2 className="px-2">Last Documents :</h2>
          <div className="p-3 rounded-md border border-gray-300">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    Document
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Created At
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {docs.length === 0 && !isLoading && (
                  <tr className="border-b border-gray-200 cursor-pointer">
                    <td
                      colSpan="3"
                      className="whitespace-nowrap px-6 py-4 text-lg hover:font-bold hover:text-gray-500"
                    >
                      No documents found
                    </td>
                  </tr>
                )}
                {isLoading ? (
                  <tr className="loading border-b border-gray-200 cursor-pointe">
                    <td
                      colSpan="3"
                      className="whitespace-nowrap px-6 py-4 text-lg hover:font-bold hover:text-gray-500"
                    >
                      Loading ...
                    </td>
                  </tr>
                ) : (
                  docs.map((document, i) => (
                    <tr
                      key={i}
                      className="hover:bg-white border-b border-gray-200 cursor-pointer"
                    >
                      <td
                        onClick={() => navigate(`/document/${document._id}`)}
                        className="whitespace-nowrap px-6 py-4 text-lg hover:font-bold hover:text-gray-500"
                      >
                        {document.title}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {new Date(document.createdAt).toLocaleDateString()}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 flex gap-2 text-gray-600">
                        <button
                          title="delete document"
                          className="p-2 rounded-full border border-gray-300"
                          onClick={() => handleDelete(document._id)}
                        >
                          <AiFillDelete size={20} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;
