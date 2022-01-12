<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/adi.sreyaj/compito">
    <img src="wfh.png" alt="Logo" width="100" height="100">
  </a>

<h3 align="center">The WFH Store</h3>

  <p align="center">
      Ecommerce website to buy all you need to setup your home office.
      <br />
      <br />
      <a href="https://wfh-store.adi.so">View Demo</a>
      ·
      <a href="https://github.com/adisreyaj/wfh/issues">Report Bug</a>
      ·
      <a href="https://github.com/adisreyaj/wfh/issues">Request Feature</a>
  </p>

  <p align="center">
   <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white">
   <img src="https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white">
   <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white">
   <img src="https://img.shields.io/badge/auth0-%23eb5424.svg?style=for-the-badge&logo=auth0&logoColor=white">
   <img src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white">
   <img src="https://img.shields.io/badge/mongo-%23116149.svg?style=for-the-badge&logo=mongodb&logoColor=white">
  </p>
</p>

![The WFH Store](home.jpg)

A simple e-commerce application that is built using Angular, NestJS and MongoDB. Built as part of the MongoDB Atlas
Hackathon ([ref](https://dev.to/devteam/announcing-the-mongodb-atlas-hackathon-on-dev-4b6m)).

## Tech Stack

![Tech Stack](https://cardify.vercel.app/api/badges?border=false&borderColor=%23ddd&borderWidth=2&iconColor=&icons=typescript%2Cangular%2Cnestjs%2Cmongodb%2Ctailwindcss%2Cnx%2Cauth0&preset=perfect-blue&shadow=true&width=100)

## Getting started

The application is a monorepo and so both the front-end and the back-end code are in the same repo.

1. Clone the repo

```shell
https://github.com/adisreyaj/wfh.git
```

2. Install dependencies

```shell
npm install
```

3. Setup the environment variables required for the API

```shell
MONGODB_URI=
AUTH0_AUDIENCE=
AUTH0_ISSUER_URL=
AUTH0_DB=

// Used for setting and internal APIs
INTERNAL_TOKEN=

```

4. Run the Front-end

```shell
npm start
```

5. Run the Back-end

```shell
npm start api
```

6. Open the URL in the browser

```shell
http://localhost:4200
```

## License

Distributed under the Apache 2.0 License. See `LICENSE` for more information.

## Show your support

Please ⭐️ this repository if this project helped you!
