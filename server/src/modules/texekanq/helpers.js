const v4 = require("uuid").v4;

const getTexekanqUid = () => v4();
const getTexekanqTitle = () => `Ք/${Math.random()}`;

module.exports = { getTexekanqUid, getTexekanqTitle };
