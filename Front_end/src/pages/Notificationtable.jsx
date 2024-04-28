import React, { useEffect, useState } from "react";
import axios from 'axios';
import { HiPencilAlt, HiCheck, HiTrash } from 'react-icons/hi';
import { useContext } from "react";
import { useStateContext } from '../contexts/ContextProvider';
import { useAuth } from '../components/AuthContext'; // Import useAuth hook from your AuthProvider

const Notificationtable = () => {
  const [data, setData] = useState([]);
  const { isAdmin, userInfo } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [issuer_u, setIssuer] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    notificationdate: '',
    status: 'Live', // Default status
    issuer: 'Sumit'
  });

  const [formErrors, setFormErrors] = useState({
    title: '',
    description: '',
    notificationdate: ''
  });

  const handleOpenModal = () => {
    setFormData({
      title: '',
      description: '',
      notificationdate: '',
      status: 'Live',
      // issuer: `${issuer_u}`
      issuer: `Sumit`
    });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' }); // Clear error when input changes
  };

  const handleSubmit = async () => {
    const { title, description, notificationdate } = formData;
    let errors = {};

    if (!title.trim()) {
      errors.title = 'Please enter a title';
    }

    if (!description.trim()) {
      errors.description = 'Please enter a description';
    }

    if (!notificationdate.trim()) {
      errors.notificationdate = 'Please select a notification date';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return; // Exit if there are errors
    }

    try {
      const newNotice = { ...formData, notification_date: notificationdate };
      const response = await axios.post('http://127.0.0.1:5000/notification', newNotice);
      console.log(response.data);

      fetchData(); // Refresh data after creating a new notice
      setModalOpen(false); // Close the modal after submission
    } catch (error) {
      console.error('Error occurred while creating notice:', error);
    }
  };

  // useEffect(() => {
  const fetchData = async () => {
    try {
      let url;
      // if (isAdmin) {
      //   url = 'http://127.0.0.1:5000/notifications/ALL';
      // } else {
      url = 'http://127.0.0.1:5000/notifications/LIVE';
      // }
      const response = await axios.get(url);
      setData(response.data.response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData()
    const userInfoCookie = document.cookie
    .split('; ')
    .find(cookie => cookie.startsWith('userInfo='));
    setIssuer(userInfoCookie.username);
  }, []);

  const isFormValid = () => {
    return formData.title.trim() !== '' &&
      formData.description.trim() !== '' &&
      formData.notificationdate.trim() !== '';
  };

  const handleSave = async (notificationID, updatedData) => {
    try {
      // const { issuer } = updatedData;
      const url = `http://127.0.0.1:5000/notification/${issuer_u}/DEACTIVATE/${notificationID}`;

      const res = await axios.put(url, updatedData);
      console.log(res.data);

      fetchData(); // Refresh data after saving changes
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  // const handleDelete = async (notificationID, issuer) => {
  //   try {
  //     const url = `http://127.0.0.1:5000/notification/${issuer}/${notificationID}`;
  //     const res = await axios.delete(url);
  //     console.log(res.data);

  //     const updatedData = data.filter(item => item.notificationid !== notificationID);
  //     setData(updatedData);
  //   } catch (error) {
  //     console.error('Error occurred:', error);
  //   }
  // };

  const handleStatusChange = (notificationID, newStatus) => {
    setData(prevData =>
      prevData.map(item =>
        item.notificationid === notificationID ? { ...item, status: newStatus } : item
      )
    );
  };

  return (
    <div className="m-2 md:m-10 lg:w-1000 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <div className="p-2 text-xl flex justify-between items-center">
        <h1>Notices</h1>

        {isAdmin && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
            onClick={handleOpenModal}
          >
            Create
          </button>
        )}

      </div>
      <div className="overflow-x-auto flex justify-center"> {/* Add flex and justify-center here */}
        <table className="bg-white border-gray-200 border overflow-x-auto">
          <thead className="bg-gray-100">
            <tr className="text-gray-600 uppercase text-sm">
              <th className="p-3 text-left w-16 md:w-24 lg:w-32">ID</th>
              <th className="p-3 text-left w-32 md:w-40 lg:w-56">Title</th>
              <th className="p-3 text-left w-40 md:w-60 lg:w-72">Description</th>
              <th className="p-3 text-left w-24 md:w-32 lg:w-44">Date Published</th>
              {isAdmin && <th className="p-3 text-center w-24 md:w-32 lg:w-44">Action</th>}
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {data.map((item) => (
              <tr key={item.notificationid} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-3 text-left w-16 md:w-24 lg:w-32">{item.notificationid}</td>
                <td className="p-3 text-left w-32 md:w-40 lg:w-56">{item.title}</td>
                <td className="p-3 text-left w-40 md:w-60 lg:w-72">{item.description}</td>
                <td className="p-3 text-left w-24 md:w-32 lg:w-44">{item.notificationdate ? new Date(item.notificationdate).toLocaleDateString() : '-'}</td>

                {isAdmin && (
                  <td className="p-3 justify-center text-center w-24 md:w-32 lg:w-44">
                    <div className="flex items-center justify-center"> {/* Add this div */}
                      <button
                        className="text-red-600 hover:text-red-900 flex"
                        onClick={() => handleSave(item.notificationid, item)}
                      >
                        <HiTrash size={20} />Remove
                      </button>
                      {/* <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(item.notificationid, item.issuer)}
                  >
                    <HiTrash size={20} />
                  </button> */}
                    </div>
                  </td>
                )}

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Creating/Editing Notices */}
      {modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-full sm:w-96">
            <h2 className="text-lg font-bold mb-4">Create/Edit Notice</h2>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
              {formErrors.title && <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className="mt-1 p-2 w-full border rounded-md"
                required
              ></textarea>
              {formErrors.description && <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="notificationdate" className="block text-sm font-medium text-gray-700">
                Notification Date
              </label>
              <input
                type="date"
                id="notificationdate"
                name="notificationdate"
                value={formData.notificationdate}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
              {formErrors.notificationdate && <p className="text-red-500 text-sm mt-1">{formErrors.notificationdate}</p>}
            </div>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={handleSubmit}
              >
                Save
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notificationtable;
