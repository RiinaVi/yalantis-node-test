# yalantis-node-test

To start the app run:

```sh
docker-compose up
```

You can try out deployed version of this project here:

`ec2-3-86-110-7.compute-1.amazonaws.com:8080`

# API Documentation

## Get users

```http
GET /
```

#### Response

```javascript
[
  {
    "id": string,
    "firstName": string,
    "lastName": string,
    "email": string,
    "image": string
  }
]
```

The `id` is generated automatically with uuid()

The `image` attribute contains a link to open image

## Create user

```http
POST /
```

#### Multipart form used:

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `firstName` | `string` | **Required**. User first name |
| `lastName` | `string` | **Required**. User last name |
| `email` | `string` | **Required**. User email in proper email format |
| `image` | `file` | **Required**. User image (Valid types: `image/jpeg`, `image/png`, `image/gif`) |

#### Response

Returns newly created user

```javascript
{
  "id": string,
  "firstName": string,
  "lastName": string,
  "email": string,
  "image": string
}
```

## Get user

```http
GET /user/:id
```

#### Response

```javascript
{
  "id": string,
  "firstName": string,
  "lastName": string,
  "email": string,
  "image": string
}
```

## Update user

```http
PATCH /user/:id
```

#### Multipart form used:

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `firstName` | `string` | User first name |
| `lastName` | `string` | User last name |
| `email` | `string` | User email in proper email format |
| `image` | `file` | User image (Valid types: `image/jpeg`, `image/png`, `image/gif`) |

#### Response

Returns updated user

```javascript
{
  "id": string,
  "firstName": string,
  "lastName": string,
  "email": string,
  "image": string
}
```

## Delete user

```http
DELETE /user/:id
```

#### Response

Returns deleted user data

```javascript
{
  "id": string,
  "firstName": string,
  "lastName": string,
  "email": string,
  "image": string
}
```

## Status Codes

| Status Code | Description |
| :--- | :--- |
| 200 | `OK` |
| 400 | `BAD REQUEST` |
| 404 | `NOT FOUND` |
| 500 | `INTERNAL SERVER ERROR` |
