# OneSignal Notifications App

This is a React-based web application that allows users to manage their push notification preferences using OneSignal.

## Features

- ✅ OneSignal Web Push Integration
- 🔒 External User ID support
- 🕒 Set user-specific notification time
- 🎨 Tailwind CSS for styling
- 🌐 REST API integration with backend

## Getting Started

### Prerequisites

- Node.js (v16 or newer)
- OneSignal account and App ID

### Installation

```bash
npm install
```

### Running Locally

```bash
npm start
```

The app runs on [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

## Configuration

### Replace Placeholders

Before running the app, make sure to update:

- `YOUR_ONESIGNAL_APP_ID` in `App.js` with your real OneSignal App ID
- `API_BASE_URL` in `App.js`

## API Integration

These endpoints must be available from your backend:

- `POST /api/notifications/enableNotifications`
- `POST /api/notifications/disableNotifications`
- `POST /api/notifications/setNotificationTime`

Each accepts a payload with:

```json
{
  "userId": "some-user-id",
  "timeUtc": "HH:MM:SS" // only for setNotificationTime
}
```

## License

MIT
