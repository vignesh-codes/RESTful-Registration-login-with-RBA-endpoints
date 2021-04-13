# NodeJS---RoleBasedAcces

Node JS User/Employee Registeration/Login using JWT Token Authorization with RBA endpoints \


The repo can handle the following:

- Can register as a user or employee. Can detect and inform if the username/email already exists in the DB. They need to be unique.

- Once Registered, a success/failure return message is received. The user can login with the registered credentials. 

- Once Logged In, an access token is received. The user can use this to access the pages by passing them as headers.

- Endpoints for Users/Employees list requires access-token. Incorrect access-token returns unauthorized messages.

- Pagination has been added to users and employees List








## Sign Up/Sign In 

### For USER

POST \
SignUp - /api/auth/user/signup \
SignIn - /api/auth/user/signin \
Req Body \
```
{
    "username": "aaq",
    "email": "aaq@a.com",
    "password": "1s23a",
    "firstname": "Z",
    "lastname": "Q",
    "organization": "Antartica",
    "roles":["user"]  
}
```  
### For Employee
POST \
SignUp - /api/auth/employee/signup \
SignIn - /api/auth/employee/signin \
Req Body 
```
{
    "username": "qwq",
    "email": "qwq@a.com",
    "password": "1s23a",
    "firstname": "Z",
    "lastname": "Q",
    "organization": "Antartica",
    "roles":["employee"]  
}
```  

### Endpoints For UserList
GET \ 
Get All Users - \
``` /api/test/users \``` 

Get All Users with Filters - \
```/api/test/users?field=valA&toOrder=valB&pgLimit=valC&pgOffset=valD``` 

Get User by username - \
```/api/test/user/username/:username```

Get User by ID - \
```/api/test/user/id/:id``` 

Get User by maidID - \
```/api/test/user/mail/:mail ``` 

Get User by Firstname - \
``` /api/test/user/fname/:fname ``` 

Get User by Lastname - \
``` /api/test/user/lname/:lname ```



### Endpoints For Employee List
GET \ 
Get All Employees - \
``` /api/test/employees \``` 

Get All Employees with Filters - \
```/api/test/users?field=valA&toOrder=valB&pgLimit=valC&pgOffset=valD``` 

Get employee by username - \
```/api/test/employee/username/:username```

Get employee by ID - \
```/api/test/employee/id/:id``` 

Get employee by maidID - \
```/api/test/employee/mail/:mail ``` 

Get employee by Firstname - \
``` /api/test/employee/fname/:fname ``` 

Get employee by Lastname - \
``` /api/test/employee/lname/:lname ```


DB Details:
We make use of Belongs to many method to connect the user or employee DB with the roles. We maintain roles in a seperate Table. The sequalize can automatically map and create tables for mapping with roles

```/api/test/users?field=valA&toOrder=valB&pgLimit=valC&pgOffset=valD
Query Params field - DB Column, Order - ASC/DESC, pgLimit - int, pgOffset - int
```

```
/api/test/users -> gives list sorted by latest entries
```

## Setup

```python
npm install
node server.js
```
Incase if the DB showed database not exist. Create a DATABASE with this name in MySQL terminal
```
CREATE DATABASE myapi;
```
