import { createRxDatabase } from "rxdb";
import { getRxStorageMemory } from "rxdb/plugins/storage-memory";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";

const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://grzegorzpociejewski:OlqLJZqcPAnisYq1@cluster0.suk0uam.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function run() {
  // Connect the client to the server	(optional starting in v4.7)
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
}

const users = [
  {
    email: "agnieszka.grzechowiak@golem.network",
    token: "0x501d723c7641a308693a83d9036b22a4b97bdd38",
    name: "Agnieszka",
  },
  {
    email: "aleksandra.mohandass@golem.network",
    token: "0x1d5ea03094d419cc1e427206934d2d439a88fd10",
    name: "Ola",
  },
  {
    email: "arkadiusz.cybulski@golem.network",
    token: "0x3c6b2f766990e607cfb7c178e35193893a9cc3f0",
    name: "Arek",
  },
  {
    email: "attila.mravik@golem.network",
    token: "0xabb86f7c5ea5f3ffc4b7d338dcc04d1ecc59917a",
    name: "Attila",
  },
  {
    email: "blue@golem.network",
    token: "0xd302690607ccb45aab8105c4d06fdb36592840f7",
    name: "Blue",
  },
  {
    email: "dariusz@golem.network",
    token: "0x6709972a40c247eabdda185e059d1bacb9abc9c7",
    name: "Darek",
  },
  {
    email: "elena@golem.network",
    token: "0xd27a57598ffbb18942dd06760638cb4ac61c1d72",
    name: "Elena",
  },
  {
    email: "eliza.lesiak@golem.network",
    token: "0xc2a16019ab6ff282aada9c008208a98420a3e0e5",
    name: "Eliza",
  },
  {
    email: "gnowakowski@golem.network",
    token: "0x81732e74a50d78918a463487360891aa484f2805",
    name: "Grzegorz",
  },
  {
    email: "grzegorz.pociejewski@golem.network",
    token: "0x7d2a4f0011ab3902568511f996039f61a64550c1",
    name: "Grzesiek",
  },
  {
    email: "grzegorz@golem.network",
    token: "0xa1816f86192f3362eaf6eb70ae70d59f15c11551",
    name: "Grzegorz",
  },
  {
    email: "iago.romero@golem.network",
    token: "0x9037916de0592f15b8b8c3fb2b40a702eb703c59",
    name: "Iago",
  },
  {
    email: "jacek@golem.network",
    token: "0xe66f333a05b8e3af580edf25da5f68ff56bb9f34",
    name: "Jacek",
  },
  {
    email: "kamil.gorczyca@golem.network",
    token: "0x23f1ff5bc33352a6f710681105600d6a3677265e",
    name: "Proxy",
  },
  {
    email: "kamil.koczurek@golem.network",
    token: "0x3ab6315124af095b7cdd1de670620657f0bc5d44",
    name: "Kamil",
  },
  {
    email: "kamila.tarnogorska@golem.network",
    token: "0xa6d67c756cf0a8dfa2c5cf482074d5877d2273ab",
    name: "Kama",
  },
  {
    email: "kbujak@golem.network",
    token: "0x440afbd62291d03ec052a69b856644468e710d4d",
    name: "Konrad",
  },
  {
    email: "kinga.strej@golem.network",
    token: "0x99a7f0291da5dd1b87cf956e06bcbb1fa2612290",
    name: "Kinga",
  },
  {
    email: "lucjan.dudek@golem.network",
    token: "0xdda800f2aab9b287333a4e3988fa26b779d0535b",
    name: "Lucek",
  },
  {
    email: "marcin.benke@golem.network",
    token: "0xbe0b1628a0db2cee953b86bc1c37dfcbdea2754e",
    name: "Marcin",
  },
  {
    email: "marek@golem.network",
    token: "0xadd1e4ea6639109395822eea056e7f29b43af3e1",
    name: "Marek",
  },
  {
    email: "mateusz.srebrny@golem.network",
    token: "0x1de210e7d52b3a01a42314df801877947e2a888a",
    name: "Mateusz",
  },
  {
    email: "michal.jarecki@golem.network",
    token: "0xdc9553f4b6c5a6b60c113950ce7c074f90c5cee6",
    name: "Michał",
  },
  {
    email: "mikolaj.barwicki@golem.network",
    token: "0x13fe3d42fbf92613652d50093475ad64c19eb79f",
    name: "Mikołaj",
  },
  {
    email: "pawel.burgchardt@golem.network",
    token: "0x023a3037e77785679543ab9b60e269f3dd94af73",
    name: "Paweł",
  },
  {
    email: "phillip@golem.network",
    token: "0x60362f5c9b92641d7d8c5beb6b8fcb35f086be15",
    name: "Phillip",
  },
  {
    email: "piotr.gerke@golem.network",
    token: "0xace1a07c50432ba53ffa50e40a088c4271b26964",
    name: "Gerkin",
  },
  {
    email: "piotr@golem.network",
    token: "0xc5a148d70e194954267c48953e7f542e6fce4670",
    name: "Piotr",
  },
  {
    email: "przemyslaw.grzywacz@golem.network",
    token: "0xabcf803959137a3c5367e1dd151cf4022fe7b5dc",
    name: "Przemek",
  },
  {
    email: "przemyslaw.rekucki@golem.network",
    token: "0xd6ab54edb9255cdae88ccb032ef4f9a1873f443d",
    name: "Requc",
  },
  {
    email: "przemyslaw.walski@golem.network",
    token: "0x18a11f89d1035860c8d2d68249f8d4a5a0eadb10",
    name: "Przemek",
  },
  {
    email: "sebastian.bielak@golem.network",
    token: "0x4b10369328a1d4af6842d6327599a679248a6570",
    name: "Smoku",
  },
  {
    email: "seweryn.kras@golem.network",
    token: "0x6c7181a39b752b37fe54c614115838530e44b239",
    name: "Seweryn",
  },
  {
    email: "sieciech.czajka@golem.network",
    token: "0x9eabd415e0772e05e57d362b6b3ecdaa5c53d0ef",
    name: "Sieciech",
  },
  {
    email: "stanislaw.krotki@golem.network",
    token: "0x47b7e05df199d1fa8634f2a982b2cd2b0068d012",
    name: "Staszek",
  },
  {
    email: "stanislaw.piwowarczyk@golem.network",
    token: "0xafbf2581e4bbde73931be6fd01ef229877bf31f1",
    name: "Stasiu",
  },
  {
    email: "szymon.paluch@golem.network",
    token: "0xec5312f40e8186439421f0c77e94b75238dfd3bf",
    name: "Szymon",
  },
  {
    email: "tomasz.pyl@golem.network",
    token: "0x71b33558190f8c860a376c1bb84edb5fc34bcccb",
    name: "Tomeczku",
  },
  {
    email: "w.lugowski@golem.network",
    token: "0x685f1ae2365e8a1fc7ae5caf7872db2bcd5e69bc",
    name: "Wojtek",
  },
  {
    email: "witek@golem.network",
    token: "0x2bec33c749798055c4e9f1a22df97ea47905034d",
    name: "Witku",
  },
];

export async function fixture() {
  await client.connect();
  const usersCollection = client.db("christmas").collection("users");
  if ((await usersCollection.countDocuments()) === 0) {
    await usersCollection.insertMany(users);
  }
}

export const christmasDb = client.db("christmas");

export const getUserByToken = async (token: string) => {
  const usersCollection = christmasDb.collection("users");

  const user = await usersCollection.findOne({ token });
  console.log(user);
  return user;
};

export const setUSerAsUsed = async (token: string) => {
  const usersCollection = christmasDb.collection("users");

  const user = await usersCollection.findOne({ token });
  if (user) {
    await usersCollection.updateOne(
      { token },
      {
        $set: {
          used: true,
        },
      }
    );
  }
};
