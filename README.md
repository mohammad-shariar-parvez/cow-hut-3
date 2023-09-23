### Live Link:

### Application Routes:

#### User

- api/v1/users (GET)
- api/v1/users/user-create (POST)
- api/v1/users/648c5ef68fd2c4e8a33d19c1 (Single GET) Include an id that is saved in your database
- api/v1/users/648c5ef68fd2c4e8a33d19c1 (PATCH)
- api/v1/users/648c5ef68fd2c4e8a33d19c1648c5ef68fd2c4e8a33d19c1 (DELETE) Include an id that is saved in your database

#### Cows

- api/v1/cows (GET)
- api/v1/cows/cow-create (POST)
- api/v1/cows/648d2774761726cbba1759de (Single GET) Include an id that is saved in your database
- api/v1/cows/648d2774761726cbba1759de (PATCH)
- api/v1/cows/648d2774761726cbba1759de (DELETE) Include an id that is saved in your database

### Pagination and Filtering routes of Cows

- api/v1/cows?pag=1&limit=10
- api/v1/cows?sortBy=price&sortOrder=asc
- api/v1/cows?minPrice=20000&maxPrice=70000
- api/v1/cows?location=Chattogram
- api/v1/cows?searchTerm=Cha

#### Orders

- api/v1/orders (GET)
- api/v1/orders/order-create (POST)
