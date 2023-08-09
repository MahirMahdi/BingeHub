<a name="readme-top"></a><!-- PROJECT LOGO -->

<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="https://ik.imagekit.io/y4cguk6dk/bingehub.png?updatedAt=1691599384673" alt="Logo" width="128" height="128">
  </a>

  <h1 align="center">Bingehub</h1>
</div>

<!-- ABOUT THE PROJECT -->

## About Bingehub

Bingehub is a Movie & TV Shows-focused website powered by The MovieDB API, similar to IMDb. On Bingehub, you can access information about all the movies, rate them, write reviews, and create a watchlist.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With
- [![React][React.js]][React-url]
- [![Firebase][Firebase]][Firebase-url]
- [![MUI][MUI]][MUI-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Features

- **Rate:**: This feature helps users gauge the overall popularity of a title within the Bingehub community and allows them to contribute to the platform's collective ratings.

- **Watchlist**: This feature provides a convenient way to keep track of upcoming entertainment options, making it an ideal tool for planning binge-watching sessions and staying organized.

- **Review**: This feature not only allows users to express their viewpoints but also helps other community members make informed decisions about what to watch next

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Installation

1. Clone the repo
   ```sh
   git clone https://github.com/MahirMahdi/BingeHub.git
   ```
2. Change directory and install dependencies
   ```sh
   cd bingehub
   npm install
   ```
3. Create a `.env`
   ```
   cp .env.example .env
   ```
4. Go to `.env` and fill up these credentials using your [The MovieDB](https://www.themoviedb.org/) api key and [Firebase](https://firebase.google.com/) project details
   ```
     REACT_APP_FIREBASE_API_KEY = 'YOUR_FIREBASE_API_KEY'
     REACT_APP_FIREBASE_APP_ID = 'YOUR_FIREBASE_APP_ID'
     REACT_APP_FIREBASE_AUTH_DOMAIN = 'YOUR_FIREBASE_AUTH_DOMAIN'
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID = 'YOUR_FIREBASE_MESSAGING_SENDER_ID'
     REACT_APP_FIREBASE_PROJECT_ID = 'YOUR_FIREBASE_PROJECT_ID'
     REACT_APP_FIREBASE_STORAGE_BUCKET = 'YOUR_FIREBASE_STORAGE_BUCKET'
     REACT_APP_MOVIEDB_API_KEY = 'YOUR_MOVIEDB_API_KEY'
   ```
5. Now start the server
   ```sh
   npm start
   ```

This will start the server on http://localhost:3000

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## License

Distributed under the MIT License. See LICENSE for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Firebase]: https://img.shields.io/badge/Firebase-F7A520?style=for-the-badge&logo=firebase&logoColor=white
[Firebase-url]: https://openai.com/
[MUI]: https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white
[MUI-url]: https://mui.com/
