# Order-IT
target repo structure
ORDER-IT/

├── client/                    # Frontend
│
│   ├── public/
│   │   ├── images/
│   │   │   ├── burger.png
│   │   │   ├── cart.png
│   │   │   ├── maggie.png
│   │   │   ├── sandwich.png
│   │   │   ├── vegLabel.png
│   │   │   └── non-vegLabel.png
│   │
│   │   └── fonts/
│   │       ├── IrishGrover-Regular.ttf
│   │       ├── NunitoSans.ttf
│   │       └── NunitoSans-Italic.ttf
│
│   ├── pages/
│   │   ├── Home/
│   │   ├── Cart/
│   │   ├── Checkout/
│   │   ├── Orders/
│   │   └── Login/
│
│   ├── components/
│   │   ├── Navbar/
│   │   ├── ProductCard/
│   │   ├── CartItem/
│   │   └── Footer/
│
│   ├── css/
│   │   └── global.css
│
│   ├── js/
│   │   ├── api.js
│   │   ├── cart.js
│   │   └── auth.js
│
│   ├── index.html
│   └── main.js
│
├── admin/
│
│   ├── index.html
│   ├── admin.js
│   ├── admin.css
│   │
│   └── pages/
│       ├── products.html
│       ├── orders.html
│       └── dashboard.html
│
├── server/
│
│   ├── node_modules/
│
│   ├── routes/
│   │   ├── products.js
│   │   ├── orders.js
│   │   └── auth.js
│
│   ├── controllers/
│   │   ├── productController.js
│   │   ├── orderController.js
│   │   └── authController.js
│
│   ├── middleware/
│   │   └── auth.js
│
│   ├── db/
│   │   └── db.js
│
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── database/
│   └── creating_db.sql
│
├── .gitignore
└── README.md