### Express In-App Purchase Validator Middleware

This project aims to add a middleware to validate the in app purchase receipts for NodeJs & ExpressJs.


##### Example:

```
const iapValidator = require('iap-middleware');

req.get('/validate', iapValidator, (req, res, next) => {
  //Access IAP through req.iap
  
  res.json(req.iap);
});

```
