const db = require("../db");

exports.existsIDcard = async (idcard) => {
  const c = await db.getConnection();
  const existsIDcard = await c.query("select idcard from card where idcard=?", [
    idcard,
  ]);
  c.release();
  return existsIDcard[0][0];
};

exports.getCIByIDcard = async (idcard) => {
  const c = await db.getConnection();
  const cardState = await c.query("select ci from card where idcard=?", [
    idcard,
  ]);
  c.release();
  return cardState[0][0].ci;
};

exports.getCardStateByIDcard = async (idcard) => {
  const c = await db.getConnection();
  const cardState = await c.query("select idstate from card where idcard=?", [
    idcard,
  ]);
  c.release();
  return cardState[0][0].idstate;
};

exports.getCardResidueByIDcard = async (idcard) => {
  const c = await db.getConnection();
  const residue = await c.query("select residue from card where idcard=?", [
    idcard,
  ]);
  c.release();
  return residue[0][0].residue;
};

exports.getCardTypeByIDcard = async (idcard) => {
  const c = await db.getConnection();
  const cardType = await c.query("select idtype from card where idcard=?", [
    idcard,
  ]);
  c.release();
  return cardType[0][0].idtype;
};

exports.getAmoutToPayByIDcard = async (cardType) => {
  const c = await db.getConnection();
  const amount = await c.query("select amount from cardtype where idtype=?", [
    cardType,
  ]);
  c.release();
  return amount[0][0].amount;
};

exports.updateResidue = async (idcard, residue) => {
  const c = await db.getConnection();
  await c.query("update card set residue=? where idcard=?", [residue, idcard]);
  c.release();
};

exports.addPaymentReport = async (idcard, ci, amount, reader) => {
  const c = await db.getConnection();
  await c.query("insert into report values(?,?,now(),?,1,?);", [
    idcard,
    ci,
    amount,
    reader,
  ]);
  c.release();
};
