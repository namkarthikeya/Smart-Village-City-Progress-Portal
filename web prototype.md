Develop a clean, responsive, and modern single-page web application prototype (SPA) titled "Smart Village & City Progress Portal".

The purpose of this application is to serve local communities (Villages / Towns / Municipalities) by tracking local updates, resolving community problems, filing public grievances, and maintaining transparent budget allocation.

### 1. User Roles & Authentication Architecture
Implement a simulated authentication system with LocalStorage persistence supporting two primary user roles:

A. ADMIN / VILLAGE OFFICIAL ROLE:
- Registration details: Village Email, Village Name, Mandal / Sub-district, District, Pincode, Password.
- Default Admin Credentials for testing: 
  - Email: village@gmail.com
  - Password: admin
  - Village: Rampur | Mandal: Central | District: North | Pincode: 500001
- Permissions: 
  - Full write/edit/delete access on Village Updates (Page 1).
  - Full write/edit/status update access on Village Problems List (Page 2).
  - View access to Complaints (Page 3) with status update permissions.
  - Full write/edit access on Budget Planning (Page 4).
  - Admin Panel to manually register villagers/residents into their specific village system.

B. RESIDENT / USER ROLE:
- Registration details: Full Name, Village Name, Street Name, Mobile Number, Email ID, Pincode, Password.
- Automatic Village Matching Engine:
  - When a Resident registers with a specific Village Name and Pincode, automatically link their dashboard view to the data matching that exact Village Name + Pincode combination.
  - If a resident logs in from Village "Rampur" (Pincode: 500001), they will only see events, problems, complaints, and budget items registered for Rampur (500001).
- Permissions:
  - View Village Updates & Schedule (Page 1 - Read Only).
  - View Village Problems List and ADD SUGGESTIONS to listed problems (Page 2 - Commenting Access).
  - Submit new complaints with category, details, and location (Page 3 - Write Access).
  - View Budget Allocations, Spent Amounts, and Remaining Funds (Page 4 - Read Only).

### 2. Application Layout & Navigation
- Top Header Bar:
  - App Title ("Smart Village & City Progress Portal") with local village badge (showing currently active Village Name & Pincode).
  - Responsive Navigation Tabs: 
    1. Updates & Schedule
    2. Problems & Suggestions
    3. File Complaint
    4. Village Budget Planning
  - Top Right Profile Section: User/Admin Name, Role Badge, and Logout button.

### 3. Detailed Page Breakdown & Functionality

#### PAGE 1: Village Updates & Schedule (Meetings & Openings)
- Functionality: Displays upcoming village meetings, inaugurations, scheme launches, medical camps, and official announcements.
- Admin Features: Add new update modal/form (Title, Category [Meeting/Opening/Announcement/Scheme], Date & Time, Location, Description). Ability to delete or edit announcements.
- Resident Features: Chronological timeline/cards view with filter by category.

#### PAGE 2: Village Problems List & Suggestions Box
- Functionality: Displays active public problems logged in the village (e.g., Water pipeline damage, Street light repair, Road potholes).
- Admin Features: Post new official problems, update problem status (Pending / In Progress / Resolved).
- Resident Features: View active problems and an interactive "Give Suggestion / Idea" box attached to each problem card so residents can offer solutions or insights.

#### PAGE 3: Public Complaint Box
- Functionality: Citizens can log official complaints directly to local authorities.
- Resident Features: Submit a complaint form (Title, Department/Category [Sanitation, Electricity, Water, Roads, Security], Street/Landmark, Detailed Description). View history/status of their submitted complaints.
- Admin Features: Review all citizen complaints, filter by department, and update resolution status (Received, Under Review, Resolved).

#### PAGE 4: Village Budget Planning & Financial Transparency
- Functionality: Financial transparency dashboard showing annual budget, grant details, allocation by sector, and spent vs. remaining funds.
- Admin Features: Add/Edit budget allocations (Project Title, Allocated Sector [Infrastructure, Sanitation, Education, Healthcare], Total Budget Amount, Spent Amount, Status [Planned/Ongoing/Completed]).
- Resident Features: Visual progress bars showing percentage of budget spent, search/filter through budget items, and total summary cards (Total Allocated, Total Spent, Remaining Balance).

### 4. Technical Requirements & Design Guidelines
- Single HTML/CSS/JavaScript structure with Tailwind CSS for clean styling and Lucide/FontAwesome icons for rich visuals.
- Pre-populate LocalStorage with realistic sample data for "Rampur (Pincode: 500001)" for immediate testing.
- UI Design: Professional green/blue earthy tone palette suitable for municipal/rural progress portals. Mobile responsive layout.