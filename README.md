# Item Management Application

This application provides a full-stack solution for managing a list of items. The back-end API, built with Express, offers endpoints for retrieving and adding items. The front-end interface, developed with Next.js and React, allows users to view and add items to the list. Data persistence is handled with `lowdb`, a lightweight JSON database.

## Table of Contents

- [Item Management Application](#item-management-application)
  - [Table of Contents](#table-of-contents)
  - [Project Structure](#project-structure)
  - [Requirements](#requirements)
  - [Setup Instructions](#setup-instructions)
    - [1. Clone the Repository](#1-clone-the-repository)
    - [2. Installing Dependencies](#2-installing-dependencies)
    - [3. Environment Variables](#3-environment-variables)
    - [4. Running the app](#4-running-the-app)
    - [API Endpoints](#api-endpoints)
  - [Usage](#usage)
  - [License](#license)

## Project Structure

item-management/
├── item-api/ # Back-end code (Express)
│ ├── server.js # Main server file
│ ├── db.json # JSON file for data persistence
│ └── .env # Environment variables for backend
├── item-client/ # Front-end code (Next.js)
│ ├── src/pages.tsx # Main Next.js pages
│ └── .env.local # Environment variables for frontend
├── README.md # Project documentation

## Requirements

- **Node.js**: v14+ (recommended)
- **npm**: v6+ (recommended)
- **Git**: For cloning the repository

## Setup Instructions

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone hhttps://github.com/SaiKiranCVN/Assignment.git
cd item-management
```

### 2. Installing Dependencies

Navigate into each project folder and install dependencies using `npm`.

For the back-end:

```bash
cd item-api/
npm install
```

For the front-end:

```bash
cd ../item-client
npm install
```

### 3. Environment Variables

This repository includes pre-configured `.env` files for both the front-end and back-end. These files contain environment variables required for running the application locally.

### 4. Running the app

Start the badend and frontend.

```bash
$ cd item-api/
$ node server.js
$ cd item-client/
$ npm run dev
```

### API Endpoints

The back-end provides the following API endpoints:

- **GET /items**: Retrieves a list of items.
  - **Response**: `200 OK` with JSON array of items.
- **POST /items**: Adds a new item.
  - **Request Body**: `{ "name": "Item Name" }`
  - **Response**: `201 Created` with the added item object.
  - **Validation**: `name` is required and must be a non-empty string.

## Usage

- **Retrieve Items**: On the front-end, click the "Retrieve Items" button to load all items from the server.
- **Add Item**: Enter an item name in the input field and click "Add Item". The item will be saved and displayed immediately.
- **Persistent Storage**: Items are stored in `db.json` and will persist even if the server restarts.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
