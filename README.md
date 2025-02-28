# CRUD Application using Next.js, TailwindCSS, and DaisyUI

## Overview
This project is a full-fledged CRUD (Create, Read, Update, Delete) application built using **Next.js**, styled with **TailwindCSS** and **DaisyUI**, and interacts with the **JSONPlaceholder API** for data management. It demonstrates best practices in frontend development, API integration, form validation, and state management.

## Features
- **Create**: Users can add new posts.
- **Read**: Displays a list of posts with a search feature.
- **Update**: Allows editing of existing posts.
- **Delete**: Enables users to delete posts with a confirmation dialog.
- **Form Validation**: Uses React Hook Form with Zod.
- **State Management**: Uses React Query for efficient data handling.
- **Error Handling**: Graceful error messages for API failures.
- **Responsive Design**: Mobile-friendly UI built with DaisyUI and TailwindCSS.
- **Toast Notifications**: Success and error alerts for user actions.

## Technologies Used
- **Next.js**: Framework for server-side rendering and static site generation.
- **TailwindCSS**: Utility-first CSS framework for styling.
- **DaisyUI**: Component library for UI elements.
- **JSONPlaceholder API**: Fake REST API for testing CRUD operations.
- **React Query**: Manages API calls and caching.
- **React Hook Form & Zod**: Form handling and validation.
- **Lucide React**: Icon library for UI enhancement.

## Setup and Installation

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Git](https://git-scm.com/)

### Steps to Run the Project Locally
1. **Clone the Repository:**
   ```sh
   git clone https://github.com/KUSHx123/CRUD-App.git
   cd CRUD-App
   ```

2. **Install Dependencies:**
   ```sh
   npm install  # or yarn install
   ```

3. **Start the Development Server:**
   ```sh
   npm run dev  # or yarn dev
   ```
   The app should be running at `http://localhost:3000`.

4. **Build and Run Production Mode:**
   ```sh
   npm run build
   npm start
   ```

## Project Structure
```
CRUD-App/
├── components/        # Reusable UI components
├── pages/             # Next.js pages (Home, Posts, Edit, Create)
├── public/            # Static assets
├── styles/            # Global and component-specific styles
├── utils/             # API functions and helpers
├── README.md          # Project documentation
├── next.config.js     # Next.js configuration
├── tailwind.config.js # TailwindCSS configuration
└── package.json       # Project dependencies
```

## Challenges Faced & Solutions
### 1. **Next.js Static Export Issue**
- **Issue:** Error while generating static pages (`generateStaticParams` missing params).
- **Solution:** Used `generateStaticParams` to pre-render a fixed number of posts.

### 2. **Handling Asynchronous Data Fetching**
- **Issue:** Managing API calls and state updates efficiently.
- **Solution:** Implemented **React Query** for caching, background fetching, and handling loading states.

### 3. **Form Validation Issues**
- **Issue:** Ensuring proper validation while keeping UX smooth.
- **Solution:** Integrated **React Hook Form** with **Zod** for schema-based validation and better error handling.

## Deployment
This project is deployed on **Vercel**.
- Live Demo: 

## Contributing
Contributions are welcome! Feel free to fork the repo, open an issue, or submit a pull request.

## License
This project is open-source and available under the [MIT License](LICENSE).

---
### **Author:** Kush Sinha

