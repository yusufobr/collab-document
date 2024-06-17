# Real-Time Collaborative Document Editing
This project is a real-time collaborative document editing application developed using React, Redux, Node.js, Express, Socket.IO, and MongoDB. It allows multiple users to simultaneously edit documents with real-time updates.

## Features
- Document List:
    - Display a list of documents with their titles fetched from an API.
- Document Editing:
    - Enable real-time collaboration where multiple users can edit a document simultaneously.
    - Use WebSocket (Socket.IO) to broadcast document changes to all connected clients.
    - Display online users editing the document.
- Document Management:
    - Add a new document.
    - Update the title of a document.
    - Delete a document.

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB installed and running locally or a MongoDB Atlas account


### Backend Setup

1. Clone the repository:

    ```sh
    git clone https://github.com/yusufobr/collab-document.git
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Start the server:

    ```sh
    npm start
    ```


### Frontend

1. Navigate to the frontend directory:

    ```sh
    cd client
    ```
    
2. Install dependencies:

    ```sh
    npm install
    ```

3. Start the React application:

    ```sh
    npm run dev
    ```

## Usage
- Upon starting the application, you will see a list of documents.
- Click on a document to edit it. Changes made by any user will be reflected in real-time to all connected users.
- Add new documents, update existing document titles, or delete documents using the provided UI.

## Technologies Used
### Frontend:

- React
- Redux (for state management)
- Socket.IO Client (for real-time communication)

### Backend:

- Node.js
- Express (for API routes)
- Socket.IO (for real-time communication)
- MongoDB (database)

## Folder Structure
    collab-doc-editing/
    ├── index.js
    ├── list_structure.sh
    ├── package.json
    ├── package-lock.json
    ├── README.md
    ├── client/
    │   ├── index.html
    │   ├── package.json
    │   ├── package-lock.json
    │   ├── README.md
    │   ├── vite.config.js
    │   ├── public/
    │   │   └── vite.svg
    │   ├── src/
    │   │   ├── App.css
    │   │   ├── App.jsx
    │   │   ├── index.css
    │   │   ├── main.jsx
    │   │   ├── assets/
    │   │   │   └── react.svg
    │   │   ├── components/
    │   │   │   ├── DocumentList.jsx
    │   │   │   ├── Header.jsx
    │   │   │   ├── UserList.jsx
    │   │   ├── constants/
    │   │   │   └── constants.js
    │   │   ├── pages/
    │   │   │   ├── DocumentEditor.jsx
    │   │   │   ├── Home.jsx
    │   │   ├── redux/
    │   │       ├── store.js
    │   │       └── docs/
    │   │           └── docsSlice.js
    ├── config/
    │   └── db.js
    ├── models/
    │   └── document.model.js
    ├── routes/
    │   └── document.route.js
    

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your proposed changes.

## Acknowledgments
- Design inspiration and UI mockup provided by Figma.
- Special thanks to the developers and contributors of the libraries and tools used in this project.