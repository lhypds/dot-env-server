
Dot Env Server
==============

Configure the dot env file remotely.
This project is a simple Node.js server that interacts with a `.env` file. It allows you to list, update, and retrieve environment variables through API endpoints.


Dependencies
------------

Node.js


Setup
-----

Install the project dependencies using npm:

```bash
npm install
```

Create a `.env` file in the root directory of the project to set up the following configurations:

```plaintext
PORT=4003
DOT_ENV_FILE_PATH=./target.env
BLOCKED_KEYS=AAA,BBB,API_KEY
PROJECT_NAME='Your Project Name'
```

- PORT: The port number on which the server will listen.
- DOT_ENV_FILE_PATH: The file path to the target `.env` file that the server will interact with.
- BLOCKED_KEYS: A comma-separated list of keys to block from being exposed or updated.
- PROJECT_NAME: for the web configuration page title.


Running the Server
------------------

You can start the server using the following command:

```bash
node serve.js
```

The server will run on the port specified in the `.env` file (default: `4003`).


API Endpoints
-------------

List Variables

- Endpoint: `/list`
- Method: GET
- Description: Returns a list of all available keys and their current values from the target `.env` file, excluding blocked keys.

Update Variable

- Endpoint: `/update`
- Method: POST
- Query Parameters:
  - `key`: The key to update.
  - `value`: The new value for the key.
- Description: Updates a specific key in the target `.env` file with the provided value, if the key is not blocked.

Example: `/update?key=SAMPLE_KEY&value=new_value`

Get Variable

- Endpoint: `/get`
- Method: GET
- Query Parameters:
  - `key`: The key whose value is to be retrieved.
- Description: Retrieves the value of a specific key from the target `.env` file, if the key is not blocked.

Example: `/get?key=SAMPLE_KEY`


Notes
-----

- Make sure to handle sensitive data carefully, especially with blocked keys, to prevent unauthorized access.
- Test the endpoints using tools such as Postman or curl to ensure they work as expected.
