<img src="./app/assets/Logo.png" alt="Logo" style="width: 200px"/>

# Closet - The Ultimate Outfit Assistant App

Closet relieves the stress of deciding what to wear to any occasion

## Author

- [Thabisa Dingani](https://www.github.com/pgm-thabisadingani)

## Screenshots

<div style="display: flex">
    <img src="./app/assets/poster.png" alt="Poster screenshot" style="width: 400px"/>
</div>

## Color Reference

| Color        | Hex     |
| ------------ | ------- |
| White        | #ffffff |
| Light Purple | #E299F8 |
| Light Gray   | #F2F2F2 |

## Demo

published with expo: exp://exp.host/@mthabie/Virtual-closet?release-channel=default
or
https://expo.dev/@mthabie/Virtual-closet

## Tech Stack

**Frontend:** React Native, Styled components, Google Vision, Google Places autocomplete, Weather API, Expo, formik, Yup, react native paper.

**Backend:** Firebase

## Run Locally

Clone the project

```bash
  git clone https://github.com/pgm-thabisadingani/virtual-closet-app
```

Go to the project directory

```bash
  cd virtual-closet-app
```

Install dependencies

```bash
  npm install
```

Add .env and and following keys

Firebase

```bash
# Rename this file to ".env" before use
# Replace XXXX's with your own Firebase config keys
API_KEY="XXXX"
AUTH_DOMAIN="XXXX"
PROJECT_ID="XXXX"
DATABASE_URL="XXXX",
STORAGE_BUCKET="XXXX"
MESSAGING_SENDER_ID="XXXX"
APP_ID="XXXX"
```

Open Weather

```bash
# Replace XXXX's with your own Open Weather key.
API_KEY_OPEN_WEATHER="XXXXX"
```

Google vision

```bash
# Replace XXXX's with your own google vision key.
API_KEY_OPEN_WEATHER="XXXXX"

```

Start the server

```bash
  Expo start
```

or

```bash
  npm start
```
