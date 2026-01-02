# 🗺️ Local Guide Platform

## Complete Rate ((270-266)+8)/270 * 100 = 4.4%

<!-- ## 1. Project Overview

Local Guide Platform connects travelers with passionate local experts who can offer authentic, personalized experiences. Unlike generic tour agencies, this platform empowers individuals to share their city’s hidden gems, culture and stories. Travelers can find guides who match their interests whether for a food crawl, a photography walk or a historical tour and explore a destination like a local.

This project democratizes travel guiding, allowing locals to monetize their knowledge and travelers to access unique, off-the-beaten-path experiences. 

commented out so that it does not count towards the completed rate.
-->

## 2. Objectives

- Build a platform connecting travelers with local guides.
- Enable guides to list services/tours and travelers to book them.
- Provide detailed profiles with reviews and verification to ensure trust.
- Implement a secure booking workflow.
- Create an engaging, friendly UI/UX for discovering experiences.

## 3. Core Features Breakdown

### 3.1 User Authentication & Roles

- **Register / Login**:
  - Email & Password
- **Roles**:
  - **Tourist**: Can search tours and book guides.
  - **Guide**: Can create tour listings and accept bookings.
  - **Admin**: Can manage users, tour listings and bookings.
- **Security**: JWT-based Auth, secure password hashing.

### 3.2 User Profile Management (CRUD)

- **Common Fields**: Name, Profile Pic, Bio, Languages Spoken.
- **Guide Specifics**:
  - Expertise (e.g., History, Nightlife, Shopping).
  - Daily Rate (how much they charge per day).
- **Tourist Specifics**: Travel preferences.

### 3.3 Tour Listing Management (CRUD)

- **Create Listing**:
  - Title (e.g., "Hidden Jazz Bars of New Orleans").
  - Description & Itinerary.
  - Tour fee.
  - Duration (max duration tourist can stay).
  - Meeting Point.
  - Max Group Size.
  - Images (Cloudinary/ImgBB).
- **Manage**: Guides can edit or deactivate their listings.

### 3.4 Search & Matching System

- **Search Filters**:
  - Destination / City.
  - Language (e.g., "English", "Spanish").
  - Category (Food, Art, Adventure).
  - Price Range.

### 3.5 Booking System

- **Booking Workflow**:
  - Traveler requests a date/time.
  - Guide accepts or declines.
  - Status updates: Pending, Confirmed, Completed, Cancelled.

### 3.6 Review & Rating System

- **Post-Tour**:
  - **Tourist**: Can rate and review guides after the tour.

### 3.7 Payment Integration

- **Booking Payments**:
  - Tourist can pay for the tour.
  - Guide can receive payment after the tour.
  - Secure payment processing for tour bookings.
  - Integration with Stripe / SSLCommerz / any other payment gateway.

## 4. Pages & Functional Requirements

> **Note:** The pages listed below are examples to guide implementation. You must add additional pages and features as needed to meet all project requirements and create a complete, functional platform.

### 4.1 Navbar

- **When Logged In (Tourist)**:
  - Logo (links to Home)
  - Explore Tours
  - My Bookings
  - Profile
  - Logout
- **When Logged In (Guide)**:
  - Logo (links to Home)
  - Explore Tours
  - Dashboard (My Listings, Bookings)
  - Profile
  - Logout
- **When Logged In (Admin)**:
  - Logo (links to Home)
  - Admin Dashboard
  - Manage Users
  - Manage Listings
  - Profile
  - Logout

> **Note:** Feel free to add other navigation options as needed.

### 4.2 Authentication Pages

- **`/register`**: Sign up with role selection (Tourist/Guide). Admin accounts are created separately.
- **`/login`**: Standard secure login.

### 4.3 Home / Landing Page (`/`)

- Hero search bar: "Where are you going?"
- Featured cities and top-rated guides.
- "Become a Guide" CTA.
  
> **Note:** Must have a minimum of 6 sections on the home page. Add other necessary sections as needed (e.g., How It Works, Popular Destinations, Top-Rated Guides, Testimonials/Reviews, Why Choose Us, Categories/Tour Types).

### 4.4 Profile Page (`/profile/[id]`)

- **Guide View**: Bio, Languages, Stats (Tours given, Rating), Active Listings, Reviews.
- **Tourist View**: Basic info, Reviews written.

### 4.5 Dashboard (`/dashboard`)

- **For Guides**: Upcoming bookings, Pending requests, My Listings.
- **For Tourists**: My Trips (Upcoming/Past), Wishlist.
- **For Admin**: User Management, Listing Management, Booking Management.

### 4.6 Listing Management (`/dashboard/listings`)

- List of created tours.
- **Add/Edit Page**: Form to input tour details, upload photos, set tour price.

### 4.7 Search / Explore Page (`/explore`)

- Sidebar with filters (Date, Price, Category).
- Main area showing results.
- **Map View** (Optional): Show guide locations on a map.

### 4.8 Listing Details Page (`/tours/[id]`)

- Full tour description, photos, host info.
- **Booking Widget**: Select Date/Time -> "Request to Book".
- **Reviews Section**: Read past traveler experiences.

## 5. Optional Features

| Feature                | Description                                         |

| 📅Availability Calendar | Guides set specific available dates/times           |
| 🗺️Interactive Map       | View tour routes or meeting points on Google/Mapbox |
| 🏅Badges                | "Super Guide", "Newcomer", "Foodie Expert"          |
| 🌐Multi-language        | UI translation for international users              |

## 6. Folder & API Structure

### 🗂 Folder Structure

```bash
frontend/
 ├── app/
 │   ├── (auth)/...
 │   ├── (public)/explore, tours/[id]
 │   ├── (dashboard)/guide, tourist, admin
 │   ├── components/
 │   └── ...
```

### 🌐 API Endpoints

| Method | Endpoint                | Description                   |
| :----- | :---------------------- | :---------------------------- |
| POST   | `/api/auth/register`    | Register user (Tourist/Guide) |
| POST   | `/api/auth/login`       | Login user                    |
| GET    | `/api/users/:id`        | Get public profile            |
| PATCH  | `/api/users/:id`        | Update user profile           |
| GET    | `/api/listings`         | Search/Filter tours           |
| PATCH  | `/api/listings/:id`     | Update tour listing           |
| DELETE | `/api/listings/:id`     | Delete tour listing           |
| POST   | `/api/bookings`         | Request a booking             |
| PATCH  | `/api/bookings/:id`     | Accept/Reject booking         |
| POST   | `/api/reviews`          | Submit a review               |
| POST   | `/api/payments/booking` | Pay for booking               |

## Assignment 8 - Batch 5

## Mandatory Requirements (Critical)

**Failure to meet the following requirements will result in ZERO marks.**

### 1. Home Page Structure

- The Home Page must contain a **minimum of 6 distinct sections**.

### 2. Error Handling

- Proper error handling must be implemented throughout the application.
- Users should see friendly error messages (e.g., toasts, alerts) instead of app crashes or silent failures.
- Backend errors should be gracefully caught and communicated to the frontend.

---

## 🛠️ Technology Stack

| Category       | Technologies                                    |
| :------------- | :---------------------------------------------- |
| **Frontend**   | Next.js, Tailwind CSS                           |
| **Payment**    | SSLCommerz / Stripe / Any other payment gateway |
| **Deployment** | Vercel, Render, Railway                         |

---

## 📤 Submission Guidelines

### 1. Codebase & Documentation

**README.md**: Must be professional and include:

- Project Name & Live URL.
- Features & Technology Stack.
- Setup & Usage Instructions.

### 2. Video Walkthrough

- **Duration**: 10-15 minutes.
- **Language**: English (recommended) or Bengali.
- **Platform**: Google Drive (ensure public access).
- **Content**: Demonstrate key features and workflow.

### 3. What You Need to Provide

- GitHub Repository Link
- Live Deployment Link
- Video Explanation (Public Link)
- Admin or other necessary credentials (If you don't provide, you will get zero marks)

#### 📝 Example Submission Format

```bash
GitHub Client Repo: Your GitHub Client Repo Link
GitHub Server Repo: Your GitHub Server Repo Link

Client Live Deployment: Your Client Live Deployment Link
Server Live Deployment: Your Server Live Deployment Link

Video Explanation: Your Video Explanation Link

Admin Credentials:
Email: Your Admin Email
Password: Your Admin Password
```

---

### ⏰ Deadline

- Jan 5, 2025, at 11:59 PM

### 🚫 Important Note

**Plagiarism will not be tolerated.** Ensure that the code you submit is your own work. Any instances of plagiarism will result in **0 Marks**
