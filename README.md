# Project Capstone - Delicaté

## Introduction

**Delicaté** is a family-owned business based in the Dominican Republic, dedicated to crafting handmade organic soaps with care and love. As the business grows, having an online presence has become essential to showcase our unique products and connect more deeply with our customers.

To address this need, I developed a dynamic web application that introduces visitors to who we are and what we do, while providing a seamless experience for exploring and ordering our products. With a focus on interactivity, the platform allows users to engage with the brand, browse our collection, and make purchases effortlessly.

This application strengthens Delicaté's online presence, making it easier for customers to discover our products and communicate with us directly. It combines functionality, responsiveness, and user-friendly design to reflect the essence of our business.

---
## Functionalities

### User Features

#### **Secure Registration and Login**
- Users can create an account and log in with strong validation and error handling.
- One-click **Google authentication** simplifies the login process.

#### **Product Pages**
Each product has a dedicated page displaying:
- Photos, detailed description, price, availability, and usage instructions.
- A review section for users to leave comments and ratings.
- A **"Quick View"** feature that shows an overview (photo, price, and description) in a convenient modal.

#### **Shopping Cart**
- Add products to the cart seamlessly.
- Automatic calculation of product quantities and total cost.
- Dynamic controls to adjust product quantities.
- Option to remove items from the cart.

#### **Checkout via WhatsApp**
- Users can place orders directly through WhatsApp.
- A modal explains the process and redirects users to WhatsApp with a pre-filled message including cart details.

#### **Newsletter Subscription**
- Users can subscribe to updates by entering their email address.

#### **Contact Form**
- Allows users to submit their email and comments, which are stored in the database for follow-up.

#### **User Profile Management**
- Users can update their profile details, including name, email, and password.

#### **Dark/Light Mode Toggle**
- A professional **Dark/Light mode toggle button** is available across the entire website.
- Users can seamlessly switch between themes based on their preference.
- The current mode is saved in **local storage**, ensuring the website remembers user preferences even after closing the browser.
- Provides an improved visual experience suitable for different lighting conditions.

---

### Administrator Features

#### **Product Management**
- Admins can dynamically add and delete products through an admin interface.

#### **Contact Management**
- Admins can view and manage messages submitted via the contact form.

---

## Content and Interaction

### **Shop Page with Pagination**
- The shop page includes pagination for efficient navigation through the product catalog.

### **About Us and Blog Pages**
- The **"About Us"** page highlights the company’s story and values.
- The blog features articles about products, their ingredients, and related topics.

### **Testimonials and Instagram Gallery**
- A testimonials section showcases feedback from satisfied customers.
- An Instagram gallery displays photos linked directly to the company’s account, encouraging social media engagement.

### **Frequently Asked Questions (FAQs)**
- A dedicated FAQ section provides answers to common customer queries, enhancing the user experience.

---

## Design and Responsiveness

### **Responsive and Intuitive Design**
- Fully optimized for desktop and mobile devices to ensure an enjoyable experience across platforms.

### **Interactive and Engaging UI**
- A visually appealing design that reflects the essence of Delicaté, emphasizing simplicity, elegance, and interactivity.
- Interactive elements enhance usability, making navigation effortless.

---

## Sumary
This web application represents Delicaté’s commitment to innovation and quality. By blending modern technology with thoughtful design, it provides a seamless and enjoyable shopping experience while reflecting the brand's values and mission.


## **Distinctiveness**

This project represents a significant leap forward compared to previous developments, standing out in scope, purpose, and technology. Unlike earlier projects like *Commerce*, which relied exclusively on Django as a monolithic framework, this project integrates **React** for the frontend and **Django REST Framework (DRF)** for the backend. This decoupled approach enables a modern and scalable architecture designed to deliver a dynamic and highly interactive user experience. 

Key technologies include:
- **react-query** for data management
- **react-slick** for dynamic carousels
- **styled-components** for modular styling

This project serves as the digital core of a company with specific operational needs, far exceeding the academic scope of earlier projects. It is optimized for enterprise environments, capable of handling large volumes of users and products while ensuring high standards of design, performance, and usability.

---

## **Complexity**

The project's technical architecture is highly advanced, featuring a robust system built with modern tools and practices.

### Backend:
- **Django REST Framework** with customized serializers, advanced validations, and optimized views for complex CRUD operations.
- Decoupled REST APIs with **JWT token authentication** and automatic refresh strategies for secure sessions.
- **Content Security Policies (CSP)** to protect against XSS attacks.
- Password validation aligned with **OWASP standards**.
- Middleware for secure handling of sensitive operations.

### Frontend:
- Developed with **React** and bundled using **Vite**, leveraging modern features like Hot Module Replacement (HMR).
- Advanced configurations, including environment variable management and proxy handling, to prevent CORS issues.
- **axios** for HTTP client interactions and **jwt-decode** for efficient token management.

---

## **Distinctive Features**

This project offers features that set it apart from previous developments, including:

1. **Dynamic Shopping Cart**:
   - Real-time synchronization between client and server.
   - Automatic inventory validation and price calculation.

2. **OAuth2 Google Login**:
   - A seamless, modern sign-in experience.

3. **Enhanced User Experience (UX)**:
   - Libraries like **React Bootstrap** and **MDB React UI Kit** for a professional interface.
   - Interactive features such as quick view modals, dynamic carousels, and search filters.
   - A rating and review system for fostering user interaction and trust.

4. **Administrative Panel**:
   - An intuitive panel for managing users, products, and orders.
   - Real-time notifications powered by **WebSockets** for critical updates.

---

## **Scalability and Performance**

The project is designed to accommodate growth and maintain high performance:

- **Frontend**:
  - Techniques like lazy loading, code splitting, and **react-intersection-observer** for optimal rendering.
  
- **Backend**:
  - Optimized queries using **prefetch_related** and **select_related** for efficient database access.

- **Development Tools**:
  - **ESLint** and **Prettier** for clean, standardized code.
  - Modular component structure using the **Atomic Design** pattern for maintainability.
  - Advanced **Vite** configurations for streamlined development workflows.

---

## **Technological Innovation**

This project leverages cutting-edge technologies to enhance functionality and user experience:
- **react-medium-image-zoom** for improved image viewing.
- **react-custom-scrollbars-2** for smooth scrolling.
- **django-extensions** for backend diagnostics.
- Custom validations and middleware for robust, tailored security.

---

## **Summary**

This project is a testament to the integration of modern technologies, including **React**, **Django REST Framework**, and advanced development tools. It represents a qualitative and quantitative leap in design, functionality, and purpose, setting a new standard for future developments.



# Backend Project File Definitions

---

## File: settings.py (Backend)

**Purpose:**  
Configure and manage all essential aspects of the Django project, including the database, security, middleware, email configuration, CORS, and static files.

**Features:**
- **Database:** Configuration for database connection, type (SQLite), and credentials.
- **Middleware:** A set of classes that manage HTTP requests and responses.
- **Security:** Define secret keys, CSRF settings, and authentication mechanisms (JWT, sessions).
- **Static and Media Files:** Configuration for static and media file directories, and file upload management.
- **CORS:** Set up to allow or restrict API access from different domains.

---

## File: urls.py (Backend)

**Purpose:**  
Define the URL routes for the project, mapping requests to the corresponding views.

**Features:**
- **Main Routes:** Includes routes for applications like `accounts`, `shop`, and `contact`.
- **Static and Media Routes:** Configuration to serve static and media files during development.
- **API Routes:** Routing for API endpoints such as authentication, products, carts, contact messages, etc.

---

## File: .env (Project Root)

**Purpose:**  
Store environment variables and sensitive configurations that should not be in the source code, such as secret keys, database settings, and API credentials.

**Features:**
- **Security:** Protect sensitive keys and credentials like `SECRET_KEY`, database credentials, API keys.
- **Environment Configuration:** Defines whether the project is in development or production mode using variables like `DEBUG`.
- **Modularity:** Allows configuration changes without modifying the code.

---

## File: debug.log (Project Root)

**Purpose:**  
Log errors and debugging messages during the project's development.

**Features:**
- **Error Messages:** Logs details about exceptions, server failures, and errors in views.
- **Debugging:** Helps developers debug code by identifying possible errors and their source.

---

## Folder: media (Project Root)

**Purpose:**  
Store files uploaded by users or generated by the system, such as product images, profile files, and other documents.

**Features:**
- **Static Files:** Stores publicly accessible content, such as images.

---

## App: Accounts

### File: admin.py

**Purpose:**  
Configure the Django admin panel to manage users and custom profiles.

**Features:**
- **CustomUserAdmin:** Customize user administration.
- **UserProfileInline:** Display and edit the user's profile directly within the user administration view.

### File: apps.py

**Purpose:**  
Configure the `accounts` app within the project.

**Features:**
- **App Declaration:** Defines the app name and configuration.

### File: models.py

**Purpose:**  
Define the data models, such as `CustomUser` and `UserProfile`.

**Features:**
- **CustomUser:** A user model that uses email instead of a username.
- **UserProfile:** Stores additional user information such as address, phone number, etc.

### File: serializers.py

**Purpose:**  
Define serializers to convert model data into JSON format.

**Features:**
- **UserSerializer:** Serializes `CustomUser`, allowing user creation and validation.
- **UserProfileSerializer:** Serializes the user profile.

### File: views.py

**Purpose:**  
Manage views related to authentication and profile management.

**Features:**
- **UserProfileView:** View to display and update the user profile.
- **MyTokenObtainPairView:** View for JWT-based authentication.

---

## App: Contact

### File: models.py

**Purpose:**  
Define the data models for contact messages and newsletter subscriptions.

**Features:**
- **ContactMessage:** Stores messages sent through the contact form.
- **NewsletterSubscription:** Stores information about users who subscribe to the newsletter.

### File: serializers.py

**Purpose:**  
Convert model data to JSON format for the API.

**Features:**
- **NewsletterSubscriptionSerializer:** Serializes newsletter subscription data.

### File: views.py

**Purpose:**  
Implement views for managing contact messages and subscriptions.

**Features:**
- **contact_api:** View to receive and store contact messages.
- **newsletter_subscription_api:** View to manage newsletter subscriptions.

---

## App: Shop

### File: models.py

**Purpose:**  
Define models for products, carts, and reviews in the store.

**Features:**
- **Product:** Model that stores product information (name, description, price, etc.).
- **Cart:** Model that stores the shopping cart for each user.
- **Review:** Model that allows users to leave reviews for products.

### File: serializers.py

**Purpose:**  
Serialize the shop models for conversion to JSON format.

**Features:**
- **ProductSerializer:** Serializes product data for the API.
- **CartSerializer:** Serializes shopping cart data.
- **ReviewSerializer:** Serializes product reviews.

### File: views.py

**Purpose:**  
Implement the logic for managing the store, products, and shopping carts.

**Features:**
- **product_list:** View to display the list of available products.
- **add_to_cart:** View to add products to the shopping cart.
- **update_cart_item:** View to update the quantity of a product in the cart.

# Frontend Project Overview


---

## Configuration Files

### `vite.config.js`
**Purpose**: Configures the build and development server for the Vite project.

**Features**:
- **React Integration**: Uses `reactRefresh()` for fast React component reloading during development.
- **Development Server**: Sets up the server with `host: 127.0.0.1` and `port: 5173`.
- **Proxy**: Redirects API requests (`/api`) to the backend server at `127.0.0.1:8000`.
- **Path Aliases**: Configures `@` as an alias for the `src` directory, simplifying imports.

---

### `eslint.config.js`
**Purpose**: Enforces consistent code quality and standards across the project.

**Features**:
- Configures ESLint for React with plugins like `eslint-plugin-react` and `react-hooks`.
- Custom rules:
  - Disables `react/react-in-jsx-scope` for React 17+.
  - Flags unused variables.
  - Enforces best practices for React hooks.
- Excludes directories like `dist` from linting.

---

### `index.html`
**Purpose**: Serves as the main entry point for the React application.

**Features**:
- Basic HTML structure with a responsive viewport setup.
- A `div` with `id="root"` acts as the React app's mounting point.
- Includes a favicon for the application.

---

### `main.jsx`
**Purpose**: Initializes the React application and integrates context providers.

**Features**:
- Imports Bootstrap for styling and responsiveness.
- Wraps the app in `React.StrictMode` for development debugging.
- Provides authentication state globally using `AuthProvider`.

---

### `axiosInstance.js`
**Purpose**: Configures a reusable Axios instance for API requests.

**Features**:
- **Base URL**: Centralizes the API endpoint configuration.
- **Token Management**: Automatically attaches and refreshes JWT tokens.
- **Interceptors**:
  - **Request**: Adds an Authorization header with the JWT token.
  - **Response**: Refreshes tokens if expired and retries the request.

---

## Utility Files

### `auth.jsx`
**Purpose**: Handles authentication logic and unauthorized access scenarios.

**Features**:
- Refreshes JWT tokens automatically when nearing expiration.
- Clears tokens and redirects to the login page upon unauthorized access.

---

### `cart.js`
**Purpose**: Manages the shopping cart in local storage and syncs it with the server.

**Features**:
- Retrieves, saves, and updates cart items locally.
- Interacts with the API to sync changes with the server.

---

### `cookies.jsx`
**Purpose**: Provides helper functions for managing cookies.

**Features**:
- Retrieve, set, and delete cookies with expiration and path support.

---

### `syncCart.js`
**Purpose**: Synchronizes the local cart with the server.

**Features**:
- Retries failed sync attempts using a queue.
- Differentiates between server errors and network issues.

---

## Context Files

### `authcontext.js`
**Purpose**: Manages user authentication state.

**Features**:
- Stores user data, admin status, and loading states.
- Provides methods for login, Google login, and logout.
- Uses cookies to store access and refresh tokens.

---

### `themecontext.js`
**Purpose**: Manages the app's theme (light or dark).

**Features**:
- Persists the theme in local storage.
- Provides a `toggleTheme` method to switch between themes.

---

## Core Components

### `App.jsx`
**Purpose**: Serves as the central file for routes and theme management.

**Features**:
- Defines public and private routes using `React Router`.
- Wraps the app in `AuthContext` and `ThemeContext`.
- Uses `Suspense` for lazy loading components.

---

### Additional Components
- **`Navbar.jsx`**: Main navigation bar.
- **`Loader.jsx`**: Displays a loading spinner during data fetching.
- **`ErrorBoundary.jsx`**: Captures and displays errors in child components.
- **`PrivateRoute.jsx`: Protects routes requiring authentication.**

---

## Page Descriptions

### `About.jsx`
**Purpose**: Displays company information.

**Features**:
- Includes sections like Features, Services, FAQs, Testimonials, and more.
- Uses `React.memo` for optimized rendering.
- Lazy loads Instagram and Footer sections for performance.

---

### `Blog.jsx`
**Purpose**: Lists blog posts with pagination.

**Features**:
- Lazy loads images for performance.
- "Read More" buttons navigate to detailed posts.

---

### `BlogDetail.jsx`
**Purpose**: Displays a detailed view of a blog post.

**Features**:
- Uses `styled-components` for dynamic styling.
- Validates post existence and shows an error message if not found.

---

### `Contact.jsx`
**Purpose**: Provides a contact form for user inquiries.

**Features**:
- Divides the page into contact information and a form.
- Styled dynamically based on the current theme.

---

### `ProductDetail.jsx`
**Purpose**: Shows details of a selected product.

**Features**:
- Displays product attributes like price, description, ingredients, and reviews.
- Allows users to add products to the cart or write reviews.
- Uses tabs to separate product details and reviews.

---

### `ProductManagement.jsx`
**Purpose**: Enables admins to add new products.

**Features**:
- Validates form inputs before submission.
- Displays success or error messages upon submission.

---

## API Services

- **`fetchProducts`**: Retrieves all products.
- **`addToCart`**: Adds a product to the user's cart.
- **`addProductAPI`**: Creates a new product in the system.
- **`fetchUserProfile`**: Gets user profile details.
- **`updateUserProfile`**: Updates user profile information.
- **`changePassword`**: Allows users to change their passwords.

---

## Context Usage
- **`AuthContext`**: Manages authentication state and provides methods for login/logout.
- **`ThemeContext`**: Handles theme toggling and applies styles dynamically.

---

## Navigation
- **Authenticated Users**: Redirected to private routes upon successful login.
- **Unauthenticated Users**: Redirected to login for protected routes.
- **Invalid Product IDs**: Redirected to the main shop page.

# **ShoppingCart Component**

The **`ShoppingCart`** component in React provides a user-friendly shopping cart experience for an online store.

---

## **Features**

### **1. Cart Management**
- **Load Cart Items**:
  - If the user is authenticated, cart items are fetched from the server via API.
  - If the user is not logged in, items are loaded from `localStorage`.
- **Update Quantity**:
  - Allows users to adjust the quantity of products in the cart.
  - Includes validations to prevent setting quantities below 1 or exceeding stock availability.
- **Remove Products**:
  - Users can remove unwanted products from their cart.

### **2. Price Calculation**
- **Subtotal**:
  - Automatically calculates the subtotal based on product price and quantity.
- **Shipping**:
  - Shipping cost is currently set to **Free**.
- **Total**:
  - Displays the final total amount (subtotal + shipping).

### **3. Checkout Process**
- Includes a **"CHECK OUT"** button that opens a modal for completing the purchase.
- Uses the `CheckoutModal` component to manage the checkout process.

### **4. User Feedback**
- Displays error messages for issues during cart operations (e.g., failed API calls or invalid input).
- Provides a friendly message when the cart is empty, along with a button to return to the shop.

### **5. Responsive Design**
- Built with responsiveness in mind to ensure a great user experience across devices.
- Supports light and dark themes using the `ThemeContext`.

---

## **How It Works**

### **State Management**
The component uses React’s `useState` hook to manage the following:
- **`cartItems`**: The list of items currently in the cart.
- **`loading`**: Indicates whether the cart data is still loading.
- **`error`**: Stores error messages to display to the user.
- **`showModal`**: Controls the visibility of the checkout modal.

### **Effect Hook**
- **`useEffect`**: Loads cart items when the component mounts. It fetches data from the API if the user is logged in, or from `localStorage` otherwise.

### **Core Functions**
1. **`handleUpdateQuantity`**:
   - Updates the quantity of a product in the cart.
   - Performs validations to ensure the quantity is within valid limits.
2. **`handleRemoveItem`**:
   - Removes an item from the cart.
   - Handles both server-side and local cart removal depending on the user’s authentication status.

---

## **UI Components**

### **Table Layout**
- Displays cart items with columns for:
  - **Product Name** and Image.
  - **Price**: Unit price of the product.
  - **Quantity**: Editable using increment and decrement buttons.
  - **Subtotal**: Calculated as `price * quantity`.
  - **Remove Button**: Deletes the item from the cart.

### **Checkout Section**
- **Subtotal, Shipping, and Total**: Summarized in a card for quick review.
- **Checkout Button**: Prominently displayed for better visibility, opens the `CheckoutModal`.

### **Empty Cart View**
- If no items are in the cart:
  - Displays a cart icon and a message indicating the cart is empty.
  - Provides a button to return to the shop.

---

# Components Documentation

## `ThemeToggleButton`

A React component that provides a button to toggle between light and dark themes.

### Purpose
- Allows users to switch the application's theme dynamically.

### Features
- Floating button styled with `styled-components`.
- Icons change dynamically based on the current theme:
  - `faSun` for dark mode.
  - `faMoon` for light mode.
- Retrieves theme state and toggle functionality from a custom `ThemeContext`.

---

## `QuickViewModal`

A modal component designed to show a quick overview of a product.

### Purpose
- Displays product details without leaving the current page.

### Features
- Shows product image, price, stock status, and description.
- Zoom functionality on the product image using `react-medium-image-zoom`.
- Styled for both light and dark themes with `styled-components`.
- Provides options to:
  - Add the product to the cart.
  - Close the modal.


## `ProductsShop`

A React component to display a list of products in a grid layout.

### Purpose
- Acts as the main product listing page, where users can browse, view, or add products to their cart.

### Features
- Fetches product data from an API.
- Displays products in a responsive grid layout.
- Includes:
  - Quick view functionality using `QuickViewModal`.
  - Admin-specific controls (e.g., delete button).
  - Feedback modals (`CartModal`) for user actions.

### State Management
- **Products**: Maintains a list of products fetched from the API.
- **Modals**: Manages state for cart and quick view modals.
- **Authentication**: Uses `AuthContext` to check user privileges and login status.

---

## `PrivateRoute`

A component that protects specific routes by restricting access to authenticated users.

### Purpose
- Ensures that only logged-in users can access certain routes.

### Features
- Integrates with `AuthContext` to verify authentication.
- Displays a loader while verifying the user's login status.
- Redirects unauthenticated users to the login page.

### Error Handling
- Uses `ErrorBoundary` to handle errors gracefully.

### Implementation
- If authenticated, renders child components via `Outlet`.
- Redirects unauthenticated users to `/login`.


# Components Documentation

## `Navbar`

A dynamic and responsive navigation bar component that adapts to different user roles and devices.

### Purpose
- Provides navigation for the application, with links to key pages such as Home, Shop, About, and Blog.
- Customizes the interface for authenticated users, including admin-specific options.

### Features
- **Responsive Design**:
  - Collapsible navbar for mobile devices.
  - Dynamic behavior based on the current route.
- **User-specific Functionality**:
  - Displays dropdown options for authenticated users (Order History, Settings, Admin Panel, etc.).
  - Allows users to log in or log out.
- **Dynamic Styling**:
  - Changes appearance when scrolled.
  - Adapts background color for specific pages.

### Advantages
- Enhances user experience with a clean and responsive UI.
- Ensures seamless navigation across various devices.
- Integrates user authentication and admin role checks for tailored functionality.

---

## `Loader`

A visually appealing loading animation displayed while content is being fetched or rendered.

### Purpose
- Provides a user-friendly visual cue to indicate that the application is loading.

### Features
- **Animated Circles**:
  - Four circles with alternating bounce animations.
  - Configurable colors and delays for smooth visual effects.
- **Customizable Loading Time**:
  - Accepts a `minLoadTime` prop to control the minimum duration of the loading state.

### Advantages
- Improves user engagement by giving immediate feedback during load times.
- Fully customizable, allowing for seamless integration into different themes and layouts.

---

## `Footer`

A footer component that enhances the website's structure with additional links and newsletter subscription functionality.

### Purpose
- Provides users with supplementary navigation and branding.
- Encourages user engagement through newsletter subscription.

### Features
- **Links Section**:
  - Contains quick links to key pages (Home, About Us, Shop, Contact, Privacy Policy).
- **Newsletter Subscription**:
  - Allows users to subscribe to a newsletter by entering their email.
  - Submits email data to the backend API for processing.
  - Displays success or error messages based on API response.
- **Branding**:
  - Displays the website's name/logo prominently.
- **Footer Bottom**:
  - Displays copyright information.

### Advantages
- Encourages user retention through newsletter subscriptions.
- Strengthens branding and navigation accessibility.
- Provides legal and informational links for user trust.

---



# How to Start the App (Django + React)

This guide explains step by step how to start the application, including both the **backend** (Django) and the **frontend** (React). Even if you're new to these technologies, this tutorial will guide you clearly.

---

## Prerequisites
Make sure you have the following installed on your system:
- Python (version 3.8 or above)
- Node.js and npm
- A virtual environment setup (e.g., `venv`)

---

## Step 1: Activate the Virtual Environment
1. Open your terminal and navigate to the project folder: cd Capstone

2. Activate the virtual environment with the following command:.env/scripts/activate

- If successful, you’ll see the environment name in your terminal prompt (e.g., `(env)`).

---

## Step 2: Start the Frontend (React)
1. Navigate to the `frontend` folder: cd frontend

2. Start the development server with: npm run dev

3. The frontend should now be running! Open your browser and go to: http://127.0.0.1:5173/


## Step 3: Start the Backend (Django)
1. Open a **new terminal** or split the current one into two panes.

2. In the new terminal, navigate back to the main project folder if you’re not already there: cd Capstone

3. Reactivate the virtual environment: .env/scripts/activate

4. Navigate to the `backend` folder: cd backend

5. Start the Django development server: python manage.py runserver

6. The backend should now be running! By default, it will be available at: http://127.0.0.1:8000/

## Notes
- Ensure that both the **frontend** and **backend** are running simultaneously for the application to work properly.
- Use two separate terminal windows or tabs to manage the frontend and backend processes.
- If you encounter any issues, make sure you’ve installed all dependencies:
- Backend dependencies: Install from `requirements.txt` using:
 ```
 pip install -r requirements.txt
 ```
- Frontend dependencies: Run this in the `frontend` folder:
 ```
 npm install