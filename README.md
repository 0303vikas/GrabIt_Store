# Grab It

Welcome to Grabit Store, your ultimate online shopping destination for a wide range of products, from electronics and fashion to home essentials and much more. Built with cutting-edge technologies like React, Redux, TypeScript, and Sass, Grabit Store delivers a seamless and engaging shopping experience like no other.

## Tech Stack

![React](https://img.shields.io/badge/React-v.18-blue)
![Redux toolkit](https://img.shields.io/badge/RTK-v.1-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-v.4-green)
![SASS](https://img.shields.io/badge/SASS-v.1-hotpink)

## Instruction to start the project

In the project directory, you can run:

### `npm install`

Install all the dependencies

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.start

## Project Structure

```

├── package.json
├── package-lock.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── README.md
├── src
│   ├── App.tsx
│   ├── components
│   │   ├── Card.tsx
│   │   ├── CartItem.tsx
│   │   ├── Cart.tsx
│   │   ├── Category.tsx
│   │   ├── CreateCategory.tsx
│   │   ├── CreateProduct.tsx
│   │   ├── Create.tsx
│   │   ├── Footer.tsx
│   │   ├── ImageChangeButtons.tsx
│   │   ├── Login.tsx
│   │   ├── NavigationBar.tsx
│   │   ├── Product.tsx
│   │   ├── Profile.tsx
│   │   ├── Protected.tsx
│   │   ├── Registration.tsx
│   │   ├── SingleProduct.tsx
│   │   ├── UpdateProduct.tsx
│   │   └── UploadImageForm.tsx
│   ├── hooks
│   │   ├── checkEmailAvailibility.ts
│   │   ├── filterProduct.ts
│   │   ├── findOneUser.ts
│   │   ├── reduxMediaModeCheck.ts
│   │   ├── setThemeLocalStorage.ts
│   │   ├── sortProduct.ts
│   │   ├── useAppDispatch.ts
│   │   ├── useAppSelector.ts
│   │   └── useDebounceHook.ts
│   ├── icons
│   │   ├── DarkImage.png
│   │   ├── darkLogo.png
│   │   ├── LightImage.png
│   │   └── lightLogo.png
│   ├── index.css
│   ├── index.tsx
│   ├── pages
│   │   ├── Error.tsx
│   │   └── Home.tsx
│   ├── react-app-env.d.ts
│   ├── redux
│   │   ├── reducers
│   │   │   ├── cartReducer.ts
│   │   │   ├── categoryReducer.ts
│   │   │   ├── image
│   │   │   │   └── imageUpload.ts
│   │   │   ├── modeReducer.ts
│   │   │   ├── productReducer.ts
│   │   │   └── userReducer.ts
│   │   └── store.ts
│   ├── reportWebVitals.ts
│   ├── setupTests.ts
│   ├── style.css
│   ├── style.css.map
│   ├── styles
│   │   └── style.scss
│   ├── test
│   │   ├── data
│   │   │   ├── cart.ts
│   │   │   ├── categories.ts
│   │   │   ├── products.ts
│   │   │   └── user.ts
│   │   ├── reducers
│   │   │   ├── cartReducer.test.ts
│   │   │   ├── categoriesReducer.test.ts
│   │   │   ├── productsReducer.test.ts
│   │   │   └── userReducer.test.ts
│   │   ├── servers
│   │   │   ├── categoryServer.ts
│   │   │   ├── productServer.ts
│   │   │   └── userServer.ts
│   │   └── shared
│   │   └── store.ts
│   ├── themes
│   │   ├── categoryTheme.ts
│   │   ├── formTheme.ts
│   │   ├── HomePageTheme.ts
│   │   ├── horizontalCardTheme.ts
│   │   └── mainTheme.ts
│   └── types
│   ├── CartType.ts
│   ├── Category.ts
│   ├── FilterProduct.ts
│   ├── NewCategory.ts
│   ├── NewProduct.ts
│   ├── NewUser.ts
│   ├── Product.ts
│   ├── ProtectedRouter.ts
│   ├── UpdateProduct.ts
│   └── User.ts
└── tsconfig.json

```

```

```
