const { db } = require('../config');

const getById = async (id) => {
  const r = await db.get(id);
  if (
    !r
    || (r.type && r.type !== 'service')
  ) return;
  return r;
};

module.exports = {
  getById,
};

