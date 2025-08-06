# 🎉 Event Management App

A full-stack event management application with **ASP.NET Core 8** backend and **Next.js 15** frontend.

## 🚀 Quick Setup

### Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js 18+](https://nodejs.org/)

### Backend Setup

```bash
cd backend
dotnet restore
dotnet run
```

Backend runs at: **http://localhost:5000**

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: **http://localhost:3000**

## ✨ Features

- **User Authentication** - Simple username-based login
- **Event Creation & Management** - Create, edit, and delete events
- **RSVP System** - Join events with capacity limits
- **Event Discovery** - Browse all public events
- **Real-time Updates** - React Query for data synchronization

## 🛠 Tech Stack

- **Backend**: ASP.NET Core 8, Entity Framework, SQLite
- **Frontend**: Next.js 15, React 19, TailwindCSS, TypeScript
- **API**: Swagger documentation at `/swagger`

## 🎯 How to Use

1. **Login**: Enter username at `http://localhost:3000`
2. **Create Events**: Go to "My Events" → "Create Event"
3. **Join Events**: Browse "Public Events" → Click "RSVP"
4. **Manage**: View your events and RSVPs in "My Events"

## 🏗️ Architectural Decisions

### **Database Choice: SQLite**

- Chose SQLite for its simplicity and zero-configuration setup, perfect for take-home assignments
- File-based storage provides persistence without complex database server setup
- Easy migration to PostgreSQL/SQL Server for production environments

### **React Query for State Management**

- Chosen for robust server state management with automatic caching, background refetching, and optimistic updates
- Eliminates the need for complex Redux setup while providing excellent developer experience
- Handles loading states and error management automatically

### **Simple RSVP Data Model**

- Stored `RsvpedUsers` as comma-separated strings for assignment simplicity
- Avoids complex junction tables while still tracking user RSVPs effectively
- Trade-off between simplicity and query flexibility

## ⚠️ Known Limitations & Improvements

### **Security & Authorization**

- **Missing backend authorization**: Edit/delete operations don't verify event ownership on the server side
- **Username-only authentication**: Current login system is not suitable for production use
- Relies on localStorage which can be manipulated client-side

### **User Experience**

- **Basic error handling**: Using browser `alert()` instead of elegant toast notifications
- Limited form validation and loading state indicators

### **Production Readiness**

- **No testing suite**: Missing unit tests and integration tests
- **SQLite limitations**: Single-file database not suitable for concurrent users in production
