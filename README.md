# SkyEstate - Real Estate Website

SkyEstate is a fully-featured real estate website that offers an intuitive platform for users to explore, filter and save property listings. The website integrates robust user authentication and password reset mechanisms using OTP verification. It also includes rich text support for property and blog descriptions, an interactive admin panel for management, and more.

## Features

- **User Authentication**: Secure OTP-based user sign-up, login and password reset.
- **Property Listings**: Display properties with images and detailed information like address, area, city, and more.
- **Blogs**: Blogs and insights on real estate market, trends and more topics so that users can have the best real estate experience and infomation.
- **Filtering & Saving Properties**: Users can filter properties based on various criteria and save their favorite listings.
- **Rich Text Support**: Property and blog descriptions utilize rich text formatting, implemented with React Quill.
- **Admin Panel**: Admins can manage properties, blogs, contact messages and users with a dedicated panel.
- **Contact Form**: Users can reach out to the company using the integrated contact form.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Tech Stack

### Frontend

- **React** with **TypeScript**
- **Shadcn UI components** for a modern and accessible UI
- **React Quill** for rich text editing in properties and blogs
- **Tailwind CSS** for responsive styling

### Backend

- **Node.js** and **Express** for API development
- **MongoDB** for data storage
- **JWT** and **OTP** verification for user authentication and security

## Usage

### Install Dependencies

Download the project and first install all of the dependencies.
<br>For frontend

```
cd client
npm install
```

For backend

```
cd server
npm install
```

### Environment Variables

Replace all of the environment variables listed below with your own.
<br>For server or backend

```
MONGODB_URI
CLIENT_URL
PORT
SENDER_EMAIL
SENDER_EMAIL_PASSWORD
SENDER_EMAIL_SERVICE
SENDER_EMAIL_HOST
SECRET
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
```

For client or frontend

```
VITE_SERVER_URL
```
