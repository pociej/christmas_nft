import { Akord, Auth } from "@akord/akord-js";
import OpenAI from "openai";
// import http from "http";
import fs from "fs";
import * as db from "./db";
import express from "express";
import cors from "cors";
import https from "https";

db.fixture();

const app = express();

app.use(cors());

const port = 3111;

app.get("/", (req, res) => {
  res.send("Welcome to my server!");
});

app.get("/checkToken", async (req, res) => {
  const token = req.query.token as string;
  const user = await db.getUserByToken(token);
  console.log("token", user);
  if (user) {
    res.send({ name: user.name, used: user.used });
  } else {
    res.send({ error: "Invalid token" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/replyToWish", async (req, res) => {
  const wish = req.query.wish as string;
  console.log("wish", wish);
  const openai = new OpenAI({
    apiKey: "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",
  });

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a santa claus. You are talking to a person that you will give NFT of rubber duck, even if this person is naughty and nice.",
      },
      {
        role: "assistant",
        content: "Have you been naughty or nice this year?",
      },
      { role: "user", content: wish },
    ],
    model: "gpt-3.5-turbo-1106",
  });

  res.send({ reply: completion.choices[0].message.content });
});

app.get("/getImage", async (req, res) => {
  console.log("post");
  const token = req.query.token as string;
  const user = await db.getUserByToken(token);
  console.log("token", user);
  if (user) {
    const openai = new OpenAI({
      apiKey: "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",
    });
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt:
        "beauty rubber duck for christmas, swimming in the perfect scenery. Choose one scenery from, tropical or arctic or amazonian or maybe stormy ocean or wild river. lovely, with heart symbol on the duck and santa hat on the head. Heart symbol can be coloured and duck as well can have some colours or texture",
      n: 1,
      size: "1024x1024",
      quality: "hd",
    });
    console.log(response);
    downloadFile({
      url: response.data[0].url || "",
      dest: `./${user.name}.png`,
      name: user.name,
      sendResponse: (response) => {
        res.send(response);
      },
      token,
    });
  } else {
    res.send({ error: "Invalid token" });
  }
});

// console.log(response);

const downloadFile = async ({
  url,
  dest,
  name,
  sendResponse,
  token,
}: {
  url: string;
  dest: string;
  name: string;
  sendResponse: (response: object) => void;
  token: string;
}) => {
  const file = fs.createWriteStream(dest);

  const { wallet } = await Auth.signIn(
    "grzegorz.pociejewski@gmail.com",
    "Dupa1234cycki"
  );

  const akord = await Akord.init(wallet);
  const vaults = await akord.vault.listAll();

  const vaultId =
    vaults.find((vault) => vault.name === "Golem Christmas NFT")?.id || "";
  https.get(url, (response) => {
    response.pipe(file);

    file.on("finish", () => {
      file.close();
      akord.stack
        .create(vaultId, dest, name + "_image", {
          mimeType: "image/png",
        })
        .then((stack) => {
          console.log(stack);
          akord.stack.getUri(stack.stackId).then((uri) => {
            akord.stack
              .create(
                vaultId,
                Buffer.from(
                  JSON.stringify({
                    image: `https://arweave.net/${uri}`,
                    name,
                  })
                ),
                name + "_json",
                {
                  mimeType: "application/json",
                }
              )
              .then((jstack) => {
                akord.stack.getUri(jstack.stackId).then((juri) => {
                  sendResponse({
                    image: url,
                    json: `https://arweave.net/${juri}`,
                  });
                  db.setUSerAsUsed(token);
                });
              });
          });
        });
    });
  });
};
