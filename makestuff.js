const inscriptions = require("./inscriptions");
const fs = require("fs");
// console.log(inscriptions)

(async () => {
  const x = await fetch(
    "https://ordinals.com/inscription/9a5caf4662f98b3bf5d0dc4dad8689be4703e940da88c65be9b50caedd875a33i0",
    {
      method: "GET",
    }
  );
  const body = await x.text();
  // console.log(body)
  const things = {};
  inscriptions.forEach(async (i) => {
    const y = await fetch(`https://ordinals.com/inscription/${i}`, {
      method: "GET",
    });
    const data = await y.text();

    // const parser = new DOMParser();
    // const doc = parser.parseFromString(data, "text/html");

    // const id = parseInt(doc.querySelector("main h1").split(" ")[1]);

    const address = data.match(
      /<dt>address<\/dt>\s*<dd class=monospace>(.*?)<\/dd>/
    )[1];
    const id = data.match(/<h1>(.*?)<\/h1>/)[1];
    const idNumber = parseInt(id.split(" ")[1]);
    things[idNumber] = i.toString();
    fs.writeFileSync("./output.json", JSON.stringify(things));
  });
})();
