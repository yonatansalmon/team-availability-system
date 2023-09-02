# Team Availability Tracker

## Overview
A full-stack application to manage the availability status of team members. It uses Flask and MongoDB for the backend, and React for the frontend.

---

## Backend Technologies
- Flask
- MongoDB
- Flask-RESTful
- Flask-CORS
- Flask-Bcrypt
- JWT for authentication

### Python Dependencies
\```python
aniso8601==9.0.1
blinker==1.6.2
click==8.1.7
colorama==0.4.6
dnspython==2.4.2
Flask==2.3.3
Flask-RESTful==0.3.10
itsdangerous==2.1.2
Jinja2==3.1.2
MarkupSafe==2.1.3
pymongo==4.5.0
pytz==2023.3
six==1.16.0
Werkzeug==2.3.7
flask_cors
flask_bcrypt
python-dotenv
pyjwt
\```

### Backend Folder Structure
team-availability-system-server
|-- api
|   |-- routes.py
|-- db
|   |-- init_db.py
|-- middleware
|   |-- auth.py
|-- models
|   |-- users.py
|-- .env
|-- app.py
|-- docker-compose.yml
|-- Dockerfile
|-- requirements.txt


### Running the Backend
1. Clone the repository.
2. Navigate to the backend folder.
3. Install dependencies: `pip install -r requirements.txt`
4. Run the Flask app: `flask run`

---

## Frontend Technologies
- React
- react-router-dom
- Axios
- React-Bootstrap



### Frontend Folder Structure
- `App.js` - Main app container.
- `components/`
  - `Login.js` - Login component.
  - `StatusScreen.js` - Shows the availability status of team members.
  - `Signup.js` - Sign up component.
  - `Navbar.js` - Navigation bar component.
  - `StatusUpdateForm.js` - Component to change status.
  - `PrivateRoute.js` - Validate token in client.
- `Dockerfile`

### Running the Frontend
1. Navigate to the frontend folder.
2. Install dependencies: `npm install`
3. Run the frontend: `npm start`

---

## API Endpoints
- POST `/api/signup`
- POST `/api/login`
- POST `/api/update_status`
- GET `/api/get_user`
- GET `/api/get_all_users`

---

## Features
- User Authentication
- Real-time status update
- Status Filtering
- Name-based search on the status screen

---

## Running with Docker

To run this application using Docker, make sure you have Docker and Docker Compose installed on your system. Follow these steps:

1. **Build the Images**

    Navigate to the project directory where the `Dockerfile` and `docker-compose.yml` files are located.

    ```bash
    docker-compose build
    ```

2. **Run the Containers**

    ```bash
    docker-compose up
    ```

    This will start the backend service on port 5000 and the frontend service on port 3000.

3. **Access the Application**

    - Backend API will be available at `http://localhost:5000`
    - Frontend will be available at `http://localhost:3000`

4. **Stop the Containers**

    To stop the containers, you can press `Ctrl+C` in the terminal where `docker-compose up` is running.

    Alternatively, you can run the following command in another terminal:

    ```bash
    docker-compose down
    ```

### Environment Variables

The `docker-compose.yml` file includes several environment variables:

- `FLASK_APP`: The entry point for the Flask application. (default: `app.py`)
- `FLASK_ENV`: The environment for the Flask application. (default: `development`)
- `MONGO_URI`: The MongoDB URI for database connection.
- `SECRET_KEY`: A secret key for Flask to use for encryption and sessions.
- `REACT_APP_BACKEND_URL`: The backend URL to be used by the frontend service.

You can customize these as needed for your specific setup.


