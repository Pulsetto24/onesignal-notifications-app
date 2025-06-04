import { useState, useEffect } from "react";
import OneSignal from "react-onesignal";

const API_BASE_URL = "http://localhost:5001"; // Adjust this to your API base URL

const API_ENDPOINTS = {
  enableNotifications: `${API_BASE_URL}/api/notifications/enableNotifications`,
  disableNotifications: `${API_BASE_URL}/api/notifications/disableNotifications`,
  setNotificationTime: `${API_BASE_URL}/api/notifications/setNotificationTime`,
};

const ONE_SIGNAL_APP_KEY = "YOUR_ONESIGNAL_APP_ID"; // Replace with your OneSignal App ID

const callApi = async (endpoint, payload) => {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("API Error:", error);
  }
};

export default function App() {
  const [userId, setUserId] = useState("");
  const [time, setTime] = useState("");
  const [isInitialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      OneSignal.init({
        appId: ONE_SIGNAL_APP_KEY,
        allowLocalhostAsSecureOrigin: true,
        autoResubscribe: true,
      }).then(() => {
        OneSignal.Slidedown.promptPush();
        setInitialized(true);
      });
    }
  }, []);

  const handleLoginToOneSignal = async () => {
    await OneSignal.login(userId);
  };

  const handleEnable = () => {
    callApi(API_ENDPOINTS.enableNotifications, { userId });
  };

  const handleDisable = () => {
    callApi(API_ENDPOINTS.disableNotifications, { userId });
  };

  const handleSetTime = () => {
    callApi(API_ENDPOINTS.setNotificationTime, {
      userId,
      timeUtc: time,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">
          Notification Settings
        </h1>
        <p className="text-gray-500 mb-6">
          Manage your OneSignal notifications
        </p>
        <input
          type="text"
          placeholder="Enter External User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-lg text-gray-700"
        />
        <div className="flex justify-center gap-4 mb-4">
          <button
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
            onClick={handleLoginToOneSignal}
          >
            Login to OneSignal
          </button>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 items-center justify-center">
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="px-4 py-2 border rounded-lg w-full sm:w-auto"
          />
          <button
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
            onClick={handleSetTime}
          >
            Set Time
          </button>
          <button
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
            onClick={handleEnable}
          >
            Enable
          </button>
          <button
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
            onClick={handleDisable}
          >
            Disable
          </button>
        </div>
      </div>
    </div>
  );
}
