# MCCC Co.

This project is a full stack ecommerce site for a (made-up) cymbal manufacturing company. Users can sign in, view products, add products to their cart, and complete orders.

This app was created as a Backend Capstone project while attending Nashville Software School's Full Stack Web Development Bootcamp.

## Table of Contents

- [App Flow](#app-flow)
- [Features in progress](#features-in-progress)
- [Technologies Used](#technologies-used)
- [Links](#links)

## App Flow

The user is first greeted with a large splash page and navigation options.

![Home-1](screenshots/Home-1.PNG)

Hovering over Cymbals in the navbar will provide filter options for more specific browsing. Clicking one of the options will navigate the user to the cymbals page with the selected filter applied.

![Nav-Cymbals-1](screenshots/Nav-Cymbals-1.png)

The user can filter by both Type and Series at the same time if they wish.

![Cymbals-1](screenshots/Cymbals-1.png)

Clicking on a cymbal card will navigate the user to the details page for that cymbal. Here, they can add the cymbal to their cart. In the case below, the user needs to first sign in.

![Cymbal-Details-1](screenshots/Cymbal-Details-1.png)

This app uses firebase for login and supports both email/password and Google sign in. If they don't have an existing account, there is an option to register.

![Sign-In-1](screenshots/Sign-In-1.png)

After login/registration, the user is redirected back to the page they were viewing previously. Now the user can select the quantity and add the product to their cart.

![Cymbal-Details-2](screenshots/Cymbal-Details-2.png)

Once signed in, the navbar is updated to display a cart (with the item quantity) and a user dropdown. Clicking the cart will navigate the user to their cart.

![Nav-User-1](screenshots/Nav-User-1.png)

At the cart page the user can update cart item quatities, delete cart items, and complete their order.

![Cart-1](screenshots/Cart-1.png)

The user dropdown in the navbar has the option to view order history.

![Nav-User-2](screenshots/Nav-User-2.png)

Here, the user can view the details of their past completed orders, including its randomly-generated alphanumeric confirmation number.

![Order-History-1](screenshots/Order-History-1.png)

## Features in progress

- Search
- Saved
    - A page listing saved (favorited) cymbals
- Account
    - User can edit their information, including shipping address
- Rewards system
    - Each purchase earns the user rewards points, and they may use them for a discount at checkout
- Checkout
    - A page to allow customers to use rewards and enter a shipping address (or choose from saved ones) before completing their order
- Distributors
    - A page listing retailers that carry MCCC Co. cymbals

## Technologies Used

<a href="https://reactjs.org/" title="React JS"><img src="https://github.com/get-icon/geticon/raw/master/icons/react.svg" alt="React JS" width="50px" height="50px"></a>
<a href="https://reactrouter.com/en/main" title="React Router"><img src="https://reactrouter.com/_brand/react-router-mark-color.svg" alt="React Router" width="50px" height="50px"></a>
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" title="JavaScript"><img src="https://github.com/get-icon/geticon/raw/master/icons/javascript.svg" alt="JavaScript" width="50px" height="50px"></a>
<a href="https://www.npmjs.com/" title="npm"><img src="https://github.com/get-icon/geticon/raw/master/icons/npm.svg" alt="npm" width="50px" height="50px"></a>
<a href="https://tailwindcss.com/" title="npm"><img src="https://github.com/get-icon/geticon/raw/master/icons/tailwindcss-icon.svg" alt="npm" width="50px" height="50px"></a>
<a href="https://tailwindcss.com/" title="npm"><img src="https://github.com/get-icon/geticon/raw/master/icons/c-sharp.svg" alt="npm" width="50px" height="50px"></a>

## Links

<a href="https://dbdiagram.io/d/6462ba2bdca9fb07c422425a" target="_blank">Project ERD</a>