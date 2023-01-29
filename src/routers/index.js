const express = require('express');
const router = express.Router()
const url = require('url');

router.use((req, res, next) => {
  const host = url.parse(req.headers.host, true);
  const path = url.parse(req.url, true);
  const hostname = host.href.split('.');
  // if subdomain (service ID) was not defined
  if (hostname?.length !== 2) {
    res.sendStatus(404);
    return;
  }
  const serviceId = hostname[0];
  console.log(req.body)
  console.log(req.method)
  res.status(201).send(serviceId);
});

module.exports = router;
