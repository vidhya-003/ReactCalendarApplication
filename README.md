# Calendar Application

## Overview
This application is a feature-rich calendar application that allows users to manage their communication schedules effectively. It includes an Admin Module and a User Module for efficient management of tasks and notifications.

---

## Features
### Admin Module
- Manage Companies:
  - Add, update, and delete company details (e.g., name, location, periodicity).
  - Manage additional fields such as LinkedIn profiles, phone numbers, comments, and emails.
- View and manage all communication schedules.
- Access detailed reports and analytics (optional).

### User Module
- View past communications with details on dates and methods.
- Manage upcoming communications:
  - View scheduled communication dates and methods.
  - Receive notifications for due or overdue tasks.
- Interact with a comprehensive calendar interface.

---
## Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/): Ensure Node.js is installed.
### Installation Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
---

## Deployment Instructions
1. Build the project for production:
   ```bash
   npm run build
   ```

2. Deploy the `build` folder to your preferred hosting platform (e.g., Netlify, Vercel, or AWS).
---

## Application Functionality
### Calendar View
- Displays a big calendar with options to switch between Month, Week, Day, and Agenda views.
- Allows users to view event details by clicking on events.

### Admin Module
- Provides a form for adding new companies with fields for company name, location, periodicity, and additional details.
- Features a toggle to show/hide advanced fields for better usability.
- Includes a dashboard to manage all communication schedules effectively.
- used redux concept for state management
- imported material ui-icons

### User Module
- Displays past and upcoming communications in a structured format.
- Notifies users about overdue or due-today tasks.
- Integrates seamlessly with the calendar to show events.

---

## Known Limitations
- The application currently uses mock data for events and companies; 
- Limited customization options for calendar styles.
- Reporting and analytics module is optional and not yet fully implemented.


---

## Future Improvements
- Implement dynamic data fetching from a backend server.
- Enhance styling and responsiveness for a better user experience.
- Add advanced filtering and search options for events and tasks.
- Integrate push notifications for upcoming communications.
