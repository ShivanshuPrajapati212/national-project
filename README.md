# School Network - Project Documentation

## 1. Project Overview
**School Network** is a comprehensive digital platform designed to connect the school community—students, teachers, and parents. It serves as a central hub for academic announcements, resource sharing, event scheduling, doubt solving, and social interaction.

The platform focuses on **role-based experiences**, ensuring that teachers have the tools to manage content while students can access resources and interact safely.

## 2. Technology Stack

### Core Frameworks
-   **Next.js 15 (App Router)**: The React framework for production, handling routing, server-side rendering, and server actions.
-   **React 19**: JavaScript library for building user interfaces.
-   **Node.js**: Runtime environment.

### Database & Authentication
-   **MongoDB**: NoSQL database for flexible data storage.
-   **Mongoose**: ODM library for MongoDB schema modeling.
-   **NextAuth.js (v5)**: Authentication solution handling Google Sign-In and session management.

### Styling & UI
-   **Tailwind CSS**: Utility-first CSS framework.
-   **DaisyUI**: Component library for Tailwind to ensure a modern, consistent aesthetic (Themes: `cmyk`).

### Integrations
-   **ImageKit**: Cloud-based image optimization and storage for profile pictures and post attachments.
-   **Google Gemini AI**: Powered the "AI Helper" / Doubt Solver functionality.

## 3. Key Features

### 3.1 Authentication & Onboarding
-   **Google Login**: Seamless sign-in.
-   **Role-Based Access**:
    -   **Student**: Default role. Can view content, post doubts, upload profile bio.
    -   **Teacher**: Admin privileges. Can create announcements, add events, upload to library.
    -   **Parent**: View-only access (planned).
-   **Onboarding**: New users are redirected to complete their profile (Class/Section) before accessing the app.

### 3.2 Social Feed (`/feed`)
-   **Posts**: Users can share updates with text and images.
-   **Tags**: Posts can be categorized (#Sports, #Academics, etc.).
-   **Filtering**: Sidebar filters to view specific categories.
-   **Interaction**: Hover on user names to View Profile or Message.

### 3.3 Announcements (`/announcements`)
-   **Teacher-Exclusive**: Only teachers can post here.
-   **Auto-Tagging**: Posts are automatically tagged `#Announcement`.
-   **Global Visibility**: All users can view announcements.

### 3.4 Direct Messaging (`/messages`)
-   **Private Chat**: One-on-one messaging between users.
-   **Inbox**: Sidebar listing all active conversations.
-   **Integration**: accessible via Profile pages and the Navbar.

### 3.5 Student Profiles (`/profile/[id]`)
-   **Identity**: Displays Name, Bio, Role, Class, and Section.
-   **Portfolio**: Shows a history of the user's posts.
-   **Editing**: Users can update their own Bio and Class details.

### 3.6 Academic Resources
-   **Library (`/library`)**: Teachers can upload PDFs/Notes. Students can download them.
-   **Events (`/calendar`)**: Teachers can schedule exams/holidays. Displayed in a calendar view.
-   **AI Doubt Solver (`/doubt-solver`)**: A chat interface powered by Gemini AI to answer academic questions instantly.

## 4. Database Schema

### `User`
-   `name`, `email`, `image`: From OAuth.
-   `role`: Enum (`student` (default), `teacher`, `parent`, `new`).
-   `class`, `section`: Academic details.
-   `bio`: Personal description.

### `Post`
-   `content`, `imageUrl`: Post data.
-   `author`: Reference to `User`.
-   `tags`: Array of strings.
-   `createdAt`: Timestamp.

### `Message`
-   `sender`, `recipient`: References to `User`.
-   `content`: Message body.
-   `read`: Read status boolean.
-   `createdAt`: Timestamp.

### `Event`
-   `title`: Event name.
-   `date`: Event date.
-   `createdBy`: Reference to `User` (Teacher).

### `Resource`
-   `title`: File name.
-   `fileUrl`: ImageKit URL.
-   `uploadedBy`: Reference to `User` (Teacher).

## 5. Setup & Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/ShivanshuPrajapati212/national-project.git
    cd national-project
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Variables**:
    Create a `.env` file with the following:
    **We cannot give you credentials so you can see the deployed version on `https://l1746jr2.vercel.app/`**

4.  **Run Development Server**:
    ```bash
    npm run dev
    ```

5.  **Access**: Open `http://localhost:3000`.

## 6. Directory Structure
```
/app
  /actions       # Server Actions (Backend logic)
  /api           # API Routes (ImageKit auth, AI chat)
  /feed          # Feed Page
  /announcements # Announcements Page
  /messages      # Messaging System
  /profile       # Profile Pages
  /library       # Resource Library
  /doubt-solver  # AI Chat
  layout.js      # Root Layout
  page.js        # Landing Page
/components      # Reusable UI Components
/lib             # Utilities (DB connection)
/models          # Mongoose Schemas
```

---

Team: L1746JR2
Team members: Shivanshu Prajapati , Sankalp Mishra, Yatin Vishnu Gupta, Vatsaly Singh