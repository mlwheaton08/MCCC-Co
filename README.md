# MCCC Co.

This app was created as a final capstone while attending Nashville Software School's full-stack web development bootcamp. My goal with this project was to create a very well-rounded, "complete package" example of all of the technologies I've learned in the past 11 months.

This is a full-stack ecommerce site for an imaginary cymbal manufacturing company (Mason's Cool Cheap Cymbal Company). Users can sign in, view cymbals, add cymbals to their cart, complete orders, view order history, and edit their account information.

<br>

## Table of Contents

- [App Flow](#app-flow)
- [Technologies Used](#technologies-used)
- [Project ERD](#project-erd)

<br>

## App Flow

![Home-1](screenshots/Home-1.PNG)

<br>

![Nav-Cymbals-1](screenshots/Nav-Cymbals-1.png)\
Navigate to cymbals page with a filter applied.

<br>

![Cymbals-1](screenshots/Cymbals-1.png)\
Cymbals can be filtered by both Type and Series at the same time. Here, we just have a Type filter applied.

<br>

![Cymbal-Details-1](screenshots/Cymbal-Details-1.png)\
Clicking on a cymbal card will navigate us to the details page for that cymbal. If we want to add it to our cart, we must sign in first.

<br>

![Sign-In-1](screenshots/Sign-In-1.png)\
This app uses Firebase auth for login/register. We'll sign in as an existing user.

<br>

![Cymbal-Details-2](screenshots/Cymbal-Details-2.png)\
After login/registration, we're redirected back to the previous route (excluding Login/Register routes). Now we can select the quantity and add the product to our cart.

<br>

![Nav-User-1](screenshots/Nav-User-1.png)

<br>

![Search-1](screenshots/Search-1.png)\
The search bar uses a 250ms debounce function before querying the database for the top 5 most popular (measured by purchase count) cymbals matching the search criterion. Clicking one of the dropdown options navigates us to the details page for that cymbals. However, let's hit "Enter" for this search.

<br>

![Cymbals-2](screenshots/Cymbals-2.png)\
Here we have a search, filter, and sort in place at the same time.

<br>

![Packs-1](screenshots/Packs-1.png)\
MCCC Co. also sells packs of cymbals.

<br>

![Pack-Details-1](screenshots/Pack-Details-1.png)\
Clicking "Add to Cart" will add each pack item to our cart.

<br>

![Cart-1](screenshots/Cart-1.png)\
When viewing our cart we can delete items and update quantities.

<br>

![Checkout-1](screenshots/Checkout-1.png)\
Now we're at checkout. Since we have saved addresses, the order shipping address will automatically be set as our default address

<br>

![Checkout-Address-1](screenshots/Checkout-Address-1.png)\
We can view our saved addresses in the dropdown when editing our order shipping address.

<br>

![Checkout-Cart-1](screenshots/Checkout-Cart-1.png)\
Each rewards point is worth $1.

<br>

![Checkout-Order-Complete-1](screenshots/Checkout-Order-Complete-1.png)\
Upon order completion, we're given a randomly generated alphanumeric confirmation number. We're also given more rewards (a generous 5% of the order's total value, rounded to the nearest integer).

<br>

![Nav-User-2](screenshots/Nav-User-2.png)

<br>

![Order-History-1](screenshots/Order-History-1.png)\
The Order History page features Flowbite accordion components.

<br>

![Distributors-1](screenshots/Distributors-1.png)\
Find a distributor near you by using the country, state, and city filters.

<br>

![Account-1](screenshots/Account-1.png)\
The account page gives us lots of CRUD capabilties, complete with error handling -- the name edit input doesn't allow empty or blank space, and...

<br>

![Account-2](screenshots/Account-2.png)
...the address form has required fields in order to save/update.

<br>

## Technologies Used

<a href="https://learn.microsoft.com/en-us/dotnet/csharp/" title="c#"><img src="https://github.com/get-icon/geticon/raw/master/icons/c-sharp.svg" alt="c#" width="50px" height="50px"></a>
<a href="https://reactjs.org/" title="React JS"><img src="https://github.com/get-icon/geticon/raw/master/icons/react.svg" alt="React JS" width="50px" height="50px"></a>
<a href="https://reactrouter.com/en/main" title="React Router"><img src="https://reactrouter.com/_brand/react-router-mark-color.svg" alt="React Router" width="50px" height="50px"></a>
<a href="https://www.javascript.com/" title="JavaScript"><img src="https://github.com/get-icon/geticon/raw/master/icons/javascript.svg" alt="JavaScript" width="50px" height="50px"></a>
<a href="https://www.npmjs.com/" title="npm"><img src="https://github.com/get-icon/geticon/raw/master/icons/npm.svg" alt="npm" width="50px" height="50px"></a>
<a href="https://firebase.google.com/" title="firebase"><img src="https://raw.githubusercontent.com/get-icon/geticon/master/icons/firebase.svg" alt="firebase" width="50px" height="50px"></a>
<a href="https://tailwindcss.com/" title="tailwind"><img src="https://github.com/get-icon/geticon/raw/master/icons/tailwindcss-icon.svg" alt="tailwind" width="50px" height="50px"></a>

<br>

## Project ERD

![ERD](screenshots/ERD.png)