const db = require("../db");

exports.getCardTypes = async () => {
  const c = await db.getConnection();
  const cardtypes = await c.query("select idtype, name, amount from cardtype");
  c.release();
  return cardtypes[0];
};

exports.getCardStates = async () => {
  const c = await db.getConnection();
  const cardstates = await c.query("select idstate, name from cardstate");
  c.release();
  return cardstates[0];
};
