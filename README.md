# Recoverly  

Recoverly is a Lost and Found Website, a platform designed to connect individuals who have lost personal belongings with those who may have found them. Users can report lost items, browse found items, and interact to recover their belongings. Developing this website provides practical experience in building full-stack applications, user authentication, file uploads, database management, and API integration.  

---

## Key Features  

1. **User Authentication System**:  
   The website allows users to register, log in, and manage their profile with email/password authentication, along with Google or GitHub login options. User-specific routes ensure privacy and data security.  

2. **Lost & Found Item Management**:  
   Users can report lost or found items by filling out a form with details such as title, description, location, and category. Items can be updated, deleted, and tracked through the "Manage My Items" page.  

3. **Post Recovery Feature**:  
   Users can mark a found item as "recovered" and provide details like recovery location and date. Once an item is marked as recovered, its status is updated in the database.  

4. **Responsive Design**:  
   The website is fully responsive, ensuring an optimized user experience across mobile, tablet, and desktop devices.  

5. **Search and Sorting Functionality**:  
   Users can search for lost or found items by title or location, and items are displayed with the most recent posts first. A "See All" button redirects users to a dedicated Lost & Found Items page.  

---

## Live Links  

- 🌐 [Recoverly Live Site 1](https://recoverly-e17ce.web.app/)  
- 🌐 [Recoverly Live Site 2](https://recoverly-e17ce.firebaseapp.com/)  

---

## Tech Stack  

- **Frontend**: React, React Router DOM, Tailwind CSS, DaisyUI  
- **Backend**: Firebase for authentication and hosting  
- **Database**: Firebase Firestore  
- **Hosting**: Firebase  

---

## Dependencies  

### **Core Dependencies**  
- `react` `^18.3.1`: A JavaScript library for building user interfaces.  
- `react-dom` `^18.3.1`: React package for working with the DOM.  
- `react-router-dom` `^7.1.0`: Declarative routing for React.  
- `axios` `^1.7.9`: HTTP client for making API requests.  
- `tailwindcss` `^3.4.17`: A utility-first CSS framework for styling.  

### **Additional Dependencies**  
- `react-icons` `^5.4.0`: Popular icons for React.  
- `react-toastify` `^11.0.2`: Notification system for React.  
- `react-datepicker` `^7.5.0`: Date picker for React forms.  
- `swiper` `^11.1.15`: Carousel/slider functionality.  
- `react-tooltip` `^5.28.0`: Tooltips for React elements.  
- `sweetalert2` `^11.15.3`: Customizable alerts.  

### **Development Dependencies**  
- `vite` `^6.0.3`: Fast development server and build tool.  
- `eslint` `^9.17.0`: Linting for JavaScript and React code.  
- `postcss` `^8.4.49`: CSS transformations and processing.  
- `daisyui` `^4.12.22`: Tailwind CSS plugin for UI components.  

For a complete list of dependencies, refer to the `package.json` file.  

---

## Installation  

Follow these steps to set up Recoverly locally:  

1. Clone the repository:  
   ```bash
   git clone https://github.com/yourusername/recoverly.git
   ```  

2. Navigate to the project directory:  
   ```bash
   cd recoverly
   ```  

3. Install dependencies:  
   ```bash
   npm install
   ```  

4. Start the development server:  
   ```bash
   npm run dev
   ```  

---

## Usage  

Once the project is set up, you can:  

1. **Start the Development Server**:  
   Run the following command and access the project at `http://localhost:5173/`:  
   ```bash
   npm run dev
   ```  

2. **Build for Production**:  
   Create a production-ready build using:  
   ```bash
   npm run build
   ```  

3. **Preview the Production Build**:  
   After building, preview the app with:  
   ```bash
   npm run preview
   ```  

4. **Deploy**:  
   Use Firebase CLI to deploy the app:  
   ```bash
   firebase deploy
   ```  
