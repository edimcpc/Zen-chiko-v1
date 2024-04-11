const fs = require("fs");
const LuxionCMD = {
  config: {
    name: "arknight2",
    version: "1.0",
    author: "Luxion",
    countDown: 15,
    role: 0,
    sortDescription: "",
    longDescription: "",
    category: "command",
    guide: "{pn}",
  },
  onStart: async function ({ api, message, args, event }) {
    const gachaPullBulk = "• 𝗚𝗮𝗰𝗵𝗮 𝗣𝘂𝗹𝗹 (𝗕𝘂𝗹𝗸)\n\n";
    const operators = [
      {
        name: "Vigil",
        ID: "1",
        Bintang: "☆☆☆☆☆☆",
        dropRate: 0.0001,
        NewOperator: "i.imgur.com/mryA0vD.jpg",
      },
      { name: "Mostima", ID: "2", Bintang: "☆☆☆☆☆☆", dropRate: 0.0001 },
      { name: "Siege", ID: "3", Bintang: "☆☆☆☆☆☆", dropRate: 0.0001 },
      { name: "Akafuyu", ID: "4", Bintang: "☆☆☆☆☆", dropRate: 0.012 },
      { name: "Amiya", ID: "5", Bintang: "☆☆☆☆☆", dropRate: 0.012 },
      {
        name: "12F",
        ID: "7",
        Bintang: "☆☆",
        dropRate: 0.9204,
        NewOperator: "i.imgur.com/11w3Tkg.jpg",
      },
      {
        name: "Durin",
        ID: "8",
        Bintang: "☆☆",
        dropRate: 0.9204,
        NewOperator: "i.imgur.com/mPkv0Rq.jpg",
      },
      {
        name: "Rangers",
        ID: "9",
        Bintang: "☆☆",
        dropRate: 0.9204,
        NewOperator: "i.imgur.com/6HNdapd.jpg",
      },
      {
        name: "Noir Corne",
        ID: "10",
        Bintang: "☆☆",
        dropRate: 0.9204,
        NewOperator: "i.imgur.com/uErPTT1.jpg",
      },
      {
        name: "'Justice Knight'",
        ID: "12",
        Bintang: "☆",
        dropRate: 0.8080,
        NewOperator: "i.imgur.com/UxVtDxi.jpg",
      },
      {
        name: "Lancet-2",
        ID: "13",
        Bintang: "☆",
        dropRate: 0.8080,
        NewOperator: "i.imgur.com/YLrzFTN.jpg",
      },
    ];

    const getRandomOperator = () => {
      const randomIndex = Math.floor(Math.random() * operators.length);
      const randomNum = Math.random();
      const selectedOperator = operators[randomIndex];
      if (randomNum < selectedOperator.dropRate) {
        return selectedOperator;
      } else {
        return getRandomOperator();
      }
    };

    switch (args[0]) {
      case "pull": {
        const selectedOperator = getRandomOperator();
        const data = JSON.stringify(selectedOperator, null, 2);
        fs.writeFile("arknInv.json", data, (err) => {
          if (err) {
            api.sendMessage("Error: " + err, event.threadID);
            return;
          }
          api.sendMessage(
            {
              attachment: await global.utils.getStreamFromURL(
                selectedOperator.NewOperator
              ),
            },
            event.threadID
          );
        });
        break;
      }
      case "sell": {
        const item = args.slice(1).join(" ");
        api.sendMessage(`gagal menjual: ${item}`, event.threadID);
        break;
      }
      case "bulk": {
        const jumlahBulk = parseInt(args[1]);

        function gachaBulkItem(jumlahBulk) {
          if (jumlahBulk < 2 || jumlahBulk > 10) {
            api.sendMessage(
              "Bulk hanya batas sampai 2-10 saja",
              event.threadID
            );
            return;
          }
          const items = [];
          for (let i = 0; i < jumlahBulk; i++) {
            const selectedOperator = getRandomOperator();
            items.push(selectedOperator);
          }
          const results = items.map(
            (operator) =>
              `#${operator.ID}:${operator.name} (${operator.Bintang})`
          );
          const data = JSON.stringify(items, null, 2);
          fs.writeFile("arknInv.json", data, (err) => {
            if (err) {
              api.sendMessage("Error: " + err, event.threadID);
              return;
            }
            api.sendMessage(
              gachaPullBulk + results.join("\n"),
              event.threadID
            );
          });
          console.log(`Kartu telah berhasil disimpan dalam arknInv.json`);
        }
        gachaBulkItem(jumlahBulk);
        break;
      }
      default: {
        api.sendMessage(
          "[Gacha] \nArknight:\n-Pull\nMenggacha Arknight Operator\n-Sell\nMenjual Item\n\n-Bulk\nMenggacha kartu masal",
          event.threadID
        );
        break;
      }
    }
  },
};
module.exports = LuxionCMD;