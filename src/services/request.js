const { db } = require('../config');

const get = async (serviceId, request) => {
  let r = await db.fetch({
    type: 'request',
    service_id: serviceId,
    "request.type": request.method.toLowerCase(),
    "request.url": request.path,
  });
  r = r?.items;
  if (!r?.length) return;
  return r[0];
};

module.exports = {
  get,
};

