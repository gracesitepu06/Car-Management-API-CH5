// SDK initialization

var ImageKit = require("imagekit");

var imagekit = new ImageKit({
  publicKey: "public_WzwnxPAUt4w52TgIIIevO8JkZXM=",
  privateKey: "private_6BfgdGdwl8BBPB4R2URYnXJ8Bco=",
  urlEndpoint: "https://ik.imagekit.io/010612",
});

module.exports = imagekit;
