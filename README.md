## Setup
#Aerospike
- Docker Should be installed on the machine
- List all Docker Containers: docker ps -a
- Execute interactive Aerospike bash shell: docker exec -it a86 bash
- Start Aerospike Query Client: aql

#Node Server
- set Node Development Environment: export NODE_ENV=development
- start Development server: npm run dev



## Usage

<b>Get app token and forum token</b>

<b>API :</b>

POST /auth

<b>request body:</b>

```
phone {String}
memberId {String}
lsId {String}
```

<b>response:</b>

```
response {Object}
response.token {String} => App Token
response.forum {Object} => Forum data
response.forum.token {String} => Forum token
response.forum.userId {Number} => Forum user id
response.message {String}
```


