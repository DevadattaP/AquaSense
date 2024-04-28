import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import mastercard from "../assets/img/mastercard.png";
import visa from "../assets/img/visa.png";
import { BsFileEarmarkPdfFill } from "react-icons/bs";

const mockBillingData = [
  {
    date: '2024-01-01',
    dueDate: '2024-01-15',
    currentReading: 1000,
    previousReading: 500,
    consumption: 500,
    rate: 0.05,
    status: 'Paid',
    amount: 24.00,
  },
  {
    date: '2024-02-01',
    dueDate: '2024-02-15',
    currentReading: 1100,
    previousReading: 600,
    consumption: 500,
    rate: 0.05,
    status: 'Paid',
    amount: 30.00,
  },
  {
    date: '2024-03-01',
    dueDate: '2024-03-15',
    currentReading: 1200,
    previousReading: 700,
    consumption: 500,
    rate: 0.05,
    status: 'Paid',
    amount: 33.00,
  },
  {
    date: '2024-04-01',
    dueDate: '2024-04-15',
    currentReading: 1300,
    previousReading: 800,
    consumption: 500,
    rate: 0.05,
    status: 'Pending',
    amount: 41.00,
  },
  {
    date: '2024-05-01',
    dueDate: '2024-05-15',
    currentReading: 1400,
    previousReading: 900,
    consumption: 500,
    rate: 0.05,
    status: 'Pending',
    amount: 45.00,
  },
  {
    date: '2024-06-01',
    dueDate: '2024-06-15',
    currentReading: 1500,
    previousReading: 1000,
    consumption: 500,
    rate: 0.05,
    status: 'Pending',
    amount: 52.00,
  },
];

const mockUserData = {
  username: 'exampleuser',
  email: 'example@example.com',
  phone: '123-456-7890',
  billingAddress: '123 Main St, City, Country',
  subscription: 'Standard',

};

const Billing = () => {
  const [userData, setUserData] = useState(mockUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [billingData, setBillingData] = useState(mockBillingData);

  useEffect(() => {
    const ctx = document.getElementById('usageAnalysisChart');
    const usageAnalysisChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Usage',
          data: [24, 30, 33, 41, 45, 52],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 0.7)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            labels: {
              color: 'black' 
            }
          },
          tooltip: {
            titleColor: 'black', 
            bodyColor: 'black'
          }
        }
      }
    });
  
    return () => {
      usageAnalysisChart.destroy();
    };
  }, []);
  
  const handleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  
    const handlePaymentMethodChange = (event) => {
      setSelectedPaymentMethod(event.target.value);
    };

  return (
    <div className="container mx-auto py-8 px-4 ">
  <h1 className="text-3xl  mb-8 text-center pt-10 pb-0 pt-4" style={{ fontSize: '45px' }}>Check Your Bills</h1>

  {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">

    <div className="rounded-lg shadow-lg p-6 bg-gray-100">
      <h2 className="text-xl font-semibold mb-4 pb-4 text-center" style={{ fontSize: '32px' }}>User Information</h2>
      {isEditing ? (
        <form className="space-y-4">
          <div className="flex flex-col space-y-2" >
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={userData.username}
              onChange={handleInputChange}
              className="border rounded-md py-2 px-3"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="border rounded-md py-2 px-3"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
              className="border rounded-md py-2 px-3"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="billingAddress">Billing Address:</label>
            <input
              type="text"
              id="billingAddress"
              name="billingAddress"
              value={userData.billingAddress}
              onChange={handleInputChange}
              className="border rounded-md py-2 px-3"
            />
          </div>
          <button
            type="button"
            onClick={handleEditProfile}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>
        </form>
      ) : (
        <>
          <ul className="space-y-2">
            <li style={{ fontSize: '22px' }}><strong>Username:</strong> {userData.username}</li>
            <li style={{ fontSize: '22px' }}><strong>Email:</strong> {userData.email}</li>
            <li style={{ fontSize: '22px' }}><strong>Phone:</strong> {userData.phone}</li>
            <li style={{ fontSize: '22px' }}><strong>Billing Address:</strong> {userData.billingAddress}</li>
            <li style={{ fontSize: '22px' }}><strong>Subscription:</strong> {userData.subscription}</li>
          </ul>
          <div className="flex justify-center">
            <button
            onClick={handleEditProfile}
            className="mt-4 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg"
            >
            Edit Profile
           </button>
          </div>
        </>
      )}
    </div>

    <div className="rounded-xl shadow-lg p-6 bg-gray-100">
      <h2 className="text-xl font-semibold mb-4 text-center" style={{ fontSize: '32px' }}>Usage Analysis</h2>
      <canvas id="usageAnalysisChart" width="400" height="200"></canvas>
    </div>
  </div> */}



  <div className="rounded-lg shadow-lg p-6 mt-8 bg-gray-100">
      <h2 className="text-xl font-semibold mb-4 text-center" style={{ fontSize: '32px' }}>Payment Options</h2>
      <p style={{ fontSize: '22px' }}>Please select a payment method:</p>
      <div className="mt-4">
        <label className="flex items-center px-4 py-2" style={{ fontSize: '22px' }}>
          <input
            type="radio"
            name="paymentMethod"
            value="creditDebitCard"
            className="mr-2"
            onChange={handlePaymentMethodChange}
          />
          <img src={mastercard} alt="Credit/Debit Card" className="w-10 h-10 border border-gray-700" />
          <span className="ml-4">Credit/Debit Card</span>
        </label>
        <label className="flex items-center mt-2 px-4 py-2" style={{ fontSize: '22px' }}>
          <input
            type="radio"
            name="paymentMethod"
            value="visa"
            className="mr-2"
            onChange={handlePaymentMethodChange}
          />
          <img src={visa} alt="Visa" className="w-10 h-10 border border-gray-700" />
          <span className="ml-4">Visa</span>
        </label>
      </div>
      {selectedPaymentMethod && (
        <div className="flex justify-center mt-4">
          <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg">Proceed to Payment</button>
        </div>
      )}
    </div>



    <div className="rounded-lg shadow-lg p-6 mt-8 bg-gray-100">
  <h2 className="text-xl font-semibold mb-4 text-center pb-4" style={{ fontSize: '32px' }}>Billing Details</h2>

  <div className="overflow-x-auto">
    <table className="w-full border-collapse border border-gray-200">
      <thead>
        <tr>
          <th className="border border-gray-600 p-2">Date</th>
          <th className="border border-gray-600 p-2">Due Date</th>
          <th className="border border-gray-600 p-2">Current Reading</th>
          <th className="border border-gray-600 p-2">Previous Reading</th>
          <th className="border border-gray-600 p-2">Consumption</th>
          <th className="border border-gray-600 p-2">Rate</th>
          <th className="border border-gray-600 p-2">Status</th>
          <th className="border border-gray-600 p-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {billingData.map((bill, index) => (
          <tr key={index}>
            <td className="border border-gray-600 p-2 text-center">{bill.date}</td>
            <td className="border border-gray-600 p-2 text-center">{bill.dueDate}</td>
            <td className="border border-gray-600 p-2 text-center">{bill.currentReading}</td>
            <td className="border border-gray-600 p-2 text-center">{bill.previousReading}</td>
            <td className="border border-gray-600 p-2 text-center">{bill.consumption}</td>
            <td className="border border-gray-600 p-2 text-center">{bill.rate}</td>
            <td className="border border-gray-600 p-2 text-center">
              {bill.status === 'Paid' ? (
                <span className="bg-green-500 text-white font-semibold py-1 px-2 rounded-lg inline-block">Paid</span>
              ) : (
                <span className="bg-yellow-500 text-white font-semibold py-1 px-2 rounded-lg inline-block">Pending</span>
              )}
            </td>
            <td className="border border-gray-600 p-2 text-center">
              {bill.status === 'Paid' ? (
                <div className="flex justify-center">
                  <BsFileEarmarkPdfFill size={22}/>
                </div>
              ) : (
                <div className="flex justify-center">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-lg">Pay Now</button>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>




<div className="rounded-lg shadow-lg p-6 mt-8 bg-gray-100">
  <h2 className="text-xl font-semibold mb-4 text-center pb-4" style={{ fontSize: '32px' }}>FAQ</h2>

  <div className="text-left text-justify" style={{fontSize:'20px'}}>
    <ol className="list-decimal pl-6">
      <li style={{ lineHeight: '1.6' }}><strong>How do I check my bills online?</strong></li>
      <p className="pb-4" style={{ lineHeight: '1.6'  }}>You can check your bills online by logging into your account on our website or mobile app. Once logged in, navigate to the billing  section to view your bills.</p>

      <li style={{ lineHeight: '1.6' }}><strong>When are my bills usually generated?</strong></li>
      <p className="pb-4" style={{ lineHeight: '1.6' }}>Bills are typically generated on a monthly basis, around the same time each month. However, this may vary depending on your billing cycle.</p>

      <li style={{ lineHeight: '1.6' }}><strong>How can I know if my bill payment was successful?</strong></li>
      <p className="pb-4" style={{ lineHeight: '1.6' }}>After making a payment, you should receive a confirmation email or notification indicating that your payment was successful. You can also check your payment status in the billing section of your account.</p>

      <li style={{ lineHeight: '1.6' }}><strong>What does "Pending" status mean for my bill payment?</strong></li>
      <p className="pb-4" style={{ lineHeight: '1.6' }}>If your bill payment status is "Pending," it means that the payment transaction is still being processed. This could be due to various factors such as bank processing times or delays in payment gateways. We recommend waiting for 2 to 3 business days for the payment to be reflected in our system.</p>

      <li style={{ lineHeight: '1.6' }}><strong>My bank account shows that the money was deducted, but my bill payment status is still "Pending." What should I do?</strong></li>
      <p className="pb-4" style={{ lineHeight: '1.6' }}>In such cases, we advise waiting for 2 to 3 business days for the payment to be processed fully. Sometimes, there may be delays in payment processing between banks and payment gateways. If the payment status remains "Pending" after this period, please contact our customer support for assistance.</p>
    </ol>
  </div>
</div>





      <div className="rounded-lg shadow-lg p-6 mt-8 bg-gray-100">
        <h2 className="text-xl font-semibold mb-4 pb-4 text-center" style={{fontSize:'32px'}}>Customer Support</h2>
        <p style={{fontSize:'22px'}}>For assistance, please contact:</p>
        <p  style={{fontSize:'22px'}}>Email: support@example.com</p>
        <div className='flex justify-center'>
          <a href ='/dashboard/contact'> 
         <button className="mt-4 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg">
            Contact Us
          </button>
          </a> 
        </div>

      </div>

      

          </div>



 
  );
};

export default Billing;