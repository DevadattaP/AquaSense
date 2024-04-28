import React from 'react';

const Alerts = ({ type, heading, message }) => {
    // Determine the background color based on the type prop
    let bgColor = '';
    let borderColor = '';
    let textColor = '';

    if (type === 'danger') {
        bgColor = 'red';
        borderColor = '#F87171';
        textColor = 'white';
    } else if (type === 'success') {
        bgColor = 'green';
        borderColor = '#6EE7B7';
        textColor = 'white';
    }

    return (
        <div className="w-full justify-center" style={{ zIndex:'1100px' ,marginTop: '50px', width: '250px', marginLeft: 'auto', marginRight: 'auto' }}>
            <div className={`mr-3 flex items-center justify-center rounded-lg w-full`}>
                <div role="alert" className="w-full">
                    <div className={`bg-${bgColor}-500 text-white font-bold rounded px-4 py-2`}>
                        {heading || (type === 'danger' ? 'Danger' : 'Success')}
                    </div>
                    {/* <div className={`border flex-1 border-t-0 border-${bgColor}-400 rounded-b bg-${bgColor} px-4 py-3`}>
                            <h5 className={`mb-1 font-semibold text-${textColor} text-sm`}>
                                {message}
                            </h5>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default Alerts;
