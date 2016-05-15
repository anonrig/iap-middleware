'use strict';

const request = require('request-promise');
const _ = require('lodash');


module.exports = (req, res, next) => {
  let options = {
    method: 'POST',
    url: req.body.env == 'production' ? 'https://buy.itunes.apple.com/verifyReceipt' : 'https://sandbox.itunes.apple.com/verifyReceipt',
    json: {
      'receipt-data': req.body['ios-receipt'],
      'password': req.body['itunes-secret']
    }
  };

  request(options)
    .then((body) => {
      let subscriptionIAP = _.filter(body['latest_receipt_info'], function(receipt) {
        return new Date(parseInt(receipt.expires_date_ms)) > new Date() && (receipt.product_id == req.body['subscription-iap-id']);
      });

      let IAP = _.filter(body['latest_receipt_info'], function(receipt) {
        return receipt.product_id == req.body['iap-id'];
      });

      req.iap = {
        IAP: IAP,
        subscriptionIAP: subscriptionIAP.length > 0 && subscriptionIAP[0],
        latestReceipt: body['latest_receipt_info']
      };

      next();
    })
    .catch(next);
};
