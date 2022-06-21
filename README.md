<p align="center"> 
    <img
        src="./client/src/assets/logos/Uncircled Green.png"
        raw=true
        alt="tithenai_Logo"
        style="width: 128px" />
</p>

# <div align="center">Tithenai</div>

<p align="center">A Project submitted for the "Software Project II" course at the Turkish German University</p>

<p align="center">Abdurrahman ODABAŞI, Alhamza IBRAHIM, Betül BEIDAS, Bilal YILDIZ, Mahasin ELDERVİŞ, Muhammed ŞİHEBİ</p>

## Important Notice:
Before you can run the project, you must download and install NodeJS on your machine! 
<br><br>
You can download NodeJS from <a href="https://nodejs.org/en/download/">the official website</a>.
<br><br>
Note that `npm` is also installed, so if you are going to use it, you are through with the preliminary steps.

To use `yarn`, install it as described on the <a href="https://yarnpkg.com/getting-started/install">Yarn official website</a>.

To use `pnpm`, open the built-in Terminal and type:
```sh
npm install --g pnpm
```
Learn more from the <a href="https://pnpm.io/installation">pnpm official website</a>.
<br>

## Clone the Repository:

After you have downloaded NodeJs and one of the package managers on your machine, you are ready to clone this repository (e.g. from Github Desktop).

## Installation of dependencies:

To Install all dependencies listed in a `package.json` file, move into the project folder, 
```sh
cd 'directoryOfProject'
cd .\client\
```

then open the built-in Terminal and type one of the following commands:

```sh
npm install
```

```sh
yarn install
```

```sh
pnpm install
```

## Running the App:

Once you have installed all the required dependencies, you can run the app in the development mode by typing one of the following commands in the built-in Terminal:

```sh
npm start
```
```sh
yarn start
```
```sh
pnpm start
```

## Viewing the App:

Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.

Notice that the page will reload if you make edits. You will also see any errors (if exist) in the console.


## Running the Server:

Firstly all dependencies listed in a `package.json` file on Server should be installed, for that move into the server folder, 
```sh
cd 'directoryOfProject'
cd .\server\
```

then open the built-in Terminal and type one of the following commands:

```sh
npm install
```

```sh
yarn install
```

```sh
pnpm install
```

Once you have installed all the required dependencies, you can run the server in the development mode by typing one of the following commands (Generated Scripts) in the built-in Terminal:

```sh
npm start
```
```sh
yarn start
```
```sh
pnpm start
```


## Build the application:
To build the application run the following command: 

```sh
cd client && CI='' npm run build

// OR 

cd client && CI='' yarn build
```
After the building is done, you can run the built application by running the following command: 

```sh
cd ../server && npm start 

// OR 

cd ../server && yarn start 
```
The application will be running on [http://localhost:9000](http://localhost:9000). 
