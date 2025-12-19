const DIG = require("discord-image-generation");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "wanted",
    version: "1.0",
    author: "𝐀𝐒𝐈𝐅 𝐱𝟔𝟗",
    countDown: 1,
    role: 0,
    shortDescription: "Wanted!",
    longDescription: "",
    category: "box chat",
    guide: "{pn} [mention|leave_blank]",
    envConfig: {
      deltaNext: 5
    }
  },

  langs: {
    vi: {
      noTag: "Bạn phải tag người bạn muốn tát"
    },
    en: {
      noTag: "You must tag the person you want to "
    }
  },

  onStart: async function ({ event, message, usersData, args, getLang }) {
    let mention = Object.keys(event.mentions);
    let uid;
    if (event.type == "message_reply") {
      uid = event.messageReply.senderID;
    } else if (mention[0]) {
      uid = mention[0];
    } else {
      uid = event.senderID;
    }

    let url = await usersData.getAvatarUrl(uid);
    let avt = await new DIG.Wanted().getImage(url);

    const dirPath = path.join(__dirname, "tmp");
    await fs.ensureDir(dirPath);
    const pathSave = path.join(dirPath, "wanted.png");

    fs.writeFileSync(pathSave, Buffer.from(avt));

    message.reply(
      {
        attachment: fs.createReadStream(pathSave)
      },
      () => fs.unlink(pathSave)
    );
  }
};