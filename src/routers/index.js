const express = require('express');
const url = require('url');
const services = require('../services');
const router = express.Router()

const prepareResponse = (r) => {
  const res = r?.request?.response;
  const resHeaders = res?.headers ?? {};
  const resContentType = (resHeaders['Content-Type'] ?? '')
    .toLowerCase();
  let resContent = res?.content;
  if (resContentType === 'application/json; charset=utf-8') {
    resContent = JSON.parse(resContent);
  }
  return resContent;
};

router.use(async (req, res, next) => {
  const host = url.parse(req.headers.host, true);
  const path = url.parse(req.url, true);
  const hostname = host.href.split('.');
  // if subdomain (service ID) was not defined
  if (hostname?.length !== 2) {
    res.sendStatus(404);
    return;
  }
  const serviceId = hostname[0];
  const service = await services.service.getById(serviceId);
  if (!service) {
    res.sendStatus(404);
    return;
  }
  const r = await services.request.get(
    serviceId,
    {
      path: path.href,
      method: req.method,
      body: req.body,
    },
  );
  if (!r) {
    res.sendStatus(404);
    return;
  }
  res.status(201).send(
    prepareResponse(r),
  );
});

module.exports = router;
