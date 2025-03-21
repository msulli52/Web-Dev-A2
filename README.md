Piazza API by Molly Sullivan 


Piazza is a simple social network API built with Node.js, Express, and MongoDB. 
This API allows users to create, read, update, and delete posts while ensuring that 
only the post creator can update or delete their posts.


Set up instructions: 

1. Clone the repository
    - git clone <repository_url>
2. Navigate to the project directory
    - cd <project_directory>
3. Install dependencies 
    - Make sure you have Node.js installed 
    - npm install express nodemon mongoose dotenv body-parser joi bcryptjs jsonwebtoken
4. Set up environment variables
    -  Create a .env file in the root directory and add: 
    - DB_CONNECTOR=<Your MongoDB connection url string>
    - TOKEN_SECRET=<Your secret key for JWT authentication>
5. Start the server 
    - npm start
    - The server will be running at http://localhost:3000 


API Documentation: 

1. Create a post 

URL: 
    /api/posts
Method: 
    POST
Description: 
    Create a new post. Only authorized users can create posts (requires a valid JWT token in the Authorization header)
Request body: 
    {
        "title": "Post Title",
        "description": "Description of the post"
    }
Response body:
    {
        "_id": "PostID",
        "title": "Post Title",
        "description": "Description of the post",
        "createdBy": "UserID",
        "likes": 0,
        "__v": 0
    }


2. Get all posts 

URL:
    /api/posts
Method: 
    GET 
Description: 
    Retrieve all posts. No authentication required.
Response body: 
    [
        {
            "_id": "PostID1",
            "title": "Post Title 1",
            "description": "Description of the post 1",
            "createdBy": "UserID",
            "likes": 5,
            "__v": 0
        },
        {
            "_id": "PostID2",
            "title": "Post Title 2",
            "description": "Description of the post 2",
            "createdBy": "UserID",
            "likes": 3,
            "__v": 0
        }
    ]


3. Update a post 

URL:
    /api/posts/:postId
Method: 
    PUT 
Description: 
    Update a post. Only the creator of the post can update it (requires JWT authentication)
Request body: 
    {
        "title": "Updated Post Title",
        "description": "Updated description of the post"
    }
Response body: 
    {
        "acknowledged": true,
        "modifiedCount": 1,
        "upsertedId": null,
        "upsertedCount": 0,
        "matchedCount": 1
    }


4. Delete a post 

URL:
    /api/posts/:postId
Method: 
    DELETE
Description: 
    Delete a post. Only the creator of the post can delete it (requires JWT authentication).
Response body: 
    {
        "acknowledged": true,
        "deletedCount": 1
    }


5. User registration and authentication 

URL:
    /api/user/register
Method: 
    POST 
Description: 
    Register a new user. This endpoint allows users to create a new account. Username, email, and password must meet respective min/max length requirements. 
Request body: 
    {
        "username":"Name",
        "email":"name@cloud.com",
        "password":"1234567"
    }
Response body: 
    {
        "username": "Name",
        "email": "name@cloud.com",
        "password": "........",
        "_id": "......",
        "__v": 0
    }


6. User login and authentication

URL:
    /api/user/login
Method: 
    POST
Description: 
    Log in and obtain a JWT token for authentication. This token string is required for accessing protected routes like creating, updating, and deleting posts.
Request body: 
    {
        "email":"name@cloud.com",
        "password":"1234567"
    }
Response body: 
    {
        "auth-token": "JWT_TOKEN"
    }
