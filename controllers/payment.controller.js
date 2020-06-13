const Payment = require("../queries/payment.queries");
const Card = require("../queries/card.queries");
const Util = require("../util/redondeo.util");

require("dotenv").config();

var idcard = "";
var letter = "";
var colour = "";
var reader = "";
var existIDcard = "";
var ci = "";
var cardResidue = "";
var amountToPay = "";
var cardState = "";
var cardType = "";
var updatedResidue = "";

// 13476117161
// 14221153194

exports.getPassengerData = async (req, res, next) => {
  //get the idcard from the params of the request
  console.log(req.query);

  idcard = req.query.idcard;
  letter = req.query.reader.letter;
  colour = req.query.reader.colour;
  reader = letter + " " + colour;

  existIDcard = await Payment.existsIDcard(idcard);

  if (existIDcard === undefined) {
    return res.status(404).json("La tarjeta no existe");
  }

  ci = await Payment.getCIByIDcard(idcard);
  cardState = await Payment.getCardStateByIDcard(idcard);
  cardResidue = Util.roundToTwo(await Payment.getCardResidueByIDcard(idcard));
  cardType = await Payment.getCardTypeByIDcard(idcard);
  amountToPay = Util.roundToTwo(await Payment.getAmoutToPayByIDcard(cardType));

  if (cardState !== 1) {
    return res.status(200).json("La tarjeta no está activa");
  }

  if (cardResidue <= 0) {
    return res.status(200).json("La tarjeta no tiene saldo");
  }

  updatedResidue = cardResidue - amountToPay;

  if (updatedResidue < 0) {
    return res.status(200).json("La tarjeta no tiene crédito suficiente");
  }

  await Payment.updateResidue(idcard, updatedResidue);
  await Payment.addPaymentReport(idcard, ci, amountToPay, reader);

  return res.status(200).json("Tarjeta Leida y aceptada");
};

exports.prueba = async (req, res, next) => {
  const idcard = req.query.idcard;
  const letter = req.query.reader.letter;
  const colour = req.query.reader.colour;
  console.log(idcard);
  console.log(letter);
  console.log(colour);
  return res.status(500).json({ texto: "prueba", params: req.query });
};

