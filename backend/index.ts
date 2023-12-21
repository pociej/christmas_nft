import { Akord, Auth } from "@akord/akord-js";
import OpenAI from "openai";
import https from "https";
import fs from "fs";

const { wallet } = await Auth.signIn(
  "grzegorz.pociejewski@gmail.com",
  "Dupa1234cycki"
);

const akord = await Akord.init(wallet);
const vaults = await akord.vault.listAll();

const vaultId = vaults.find((vault) => vault.name === "testcnft")?.id || "";

const openai = new OpenAI({
  apiKey: "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",
});

const response = await openai.images.generate({
  model: "dall-e-3",
  prompt:
    "beauty rubber duck for christmas, swiming in the perfect arctic. lovely scenery with heart symbol on the duck ",
  n: 1,
  size: "1024x1024",
  quality: "hd",
});

console.log(response);

const downloadFile = (url: string, dest: string) => {
  const file = fs.createWriteStream(dest);

  https.get(url, (response) => {
    response.pipe(file);

    file.on("finish", () => {
      file.close();
      console.log("Download completed.");
      akord.stack
        .create(vaultId, dest, "tertre", {
          mimeType: "image/png",
        })
        .then((stack) => {
          console.log(stack);
        });
    });
  });
};

// Call the function with the URL and the destination file name
downloadFile(response.data[0].url || "", "./downloaded_file.png");
