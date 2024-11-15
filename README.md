# Shopping Application Test Task

This is a React-based shopping cart application designed to manage products, apply discounts via coupons, and facilitate checkout. It integrates react-toastify for user notifications and uses Redux for state management.

## Features
Add/Remove Items to Cart:

Increment or decrement product quantities.
Remove items from the cart.
Coupon Application:

Coupons can only be applied on the third order.
Displays appropriate notifications for valid or invalid coupon usage.
Dynamic Price Calculation:

Automatically calculates subtotals, discounts, and total prices.
Applies discounts based on coupon details (fixed amount or percentage).
Checkout:

Clears the cart after a successful checkout.
Automatically increments the order count for tracking coupon eligibility.
User Notifications:

Uses react-toastify for real-time feedback.
Tech Stack
React: Frontend framework.
React Router: For navigation between pages.
Redux: For state management.
React Toastify: For notifications.
Tailwind CSS: For styling.
JavaScript (ES6+): Core logic and components.
Installation and Setup
Prerequisites
Node.js and npm/yarn installed.
Steps to Install
Clone the repository:

```
npm install
```
Start the development server:

```
npm start
```
Open the application in your browser:

http://localhost:3000

## Project Structure
/components: Contains reusable UI components like Cart, Header, Coupon, etc.

/pages: Includes the main pages like Home, Order.

/redux: Manages Redux-related files:

actions: Actions for cart and coupon management.

reducers: Reducers for state updates.

store.js: Configures the Redux store.

/constants: Includes constant values for discount types, coupon information, etc.

App.js: Root component, defines routes for the app.

index.js: Entry point of the application.

## Key Files and Their Roles

Cart.jsx: Manages the shopping cart functionality.
Displays cart items, totals, and coupons.

Coupon.jsx:Modal for selecting and applying coupons.

Header.jsx: Navigation bar for accessing different pages.

App.js: Handles route configuration using React Router.