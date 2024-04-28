import React from 'react';

const Profile = () => {
  // Retrieve user info from cookie
  const userInfoCookie = document.cookie
    .split('; ')
    .find(cookie => cookie.startsWith('userInfo='));

  // Parse userInfo from cookie
  let userInfo = null;
  if (userInfoCookie) {
    const userInfoString = userInfoCookie.split('=')[1];
    userInfo = JSON.parse(decodeURIComponent(userInfoString));
  }

  return (
    <div className='m-2 md:m-10 mt-24 p-6 bg-white rounded-lg shadow-lg'>
      {userInfo ? (
        <>
          <h1 className="text-3xl font-bold mb-4 text-gray-800">User Profile</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-lg font-semibold text-gray-700">Username:</p>
              <p className="text-lg text-gray-900">{userInfo.username}</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-700">Email:</p>
              <p className="text-lg text-gray-900">{userInfo.email}</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-700">Phone Number:</p>
              <p className="text-lg text-gray-900">{userInfo.phone_no}</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-700">Gender:</p>
              <p className="text-lg text-gray-900">{userInfo.gender}</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-700">Location ID:</p>
              <p className="text-lg text-gray-900">{userInfo.locationid}</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-700">Admin:</p>
              <p className="text-lg text-gray-900">{userInfo.admin ? 'Yes' : 'No'}</p>
            </div>
          </div>
        </>
      ) : (
        <p className="text-red-500">User information not found.</p>
      )}
    </div>
  );
};

export default Profile;
