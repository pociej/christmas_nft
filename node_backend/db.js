"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUSerAsUsed = exports.getUserByToken = exports.christmasDb = exports.fixture = exports.run = void 0;
var _a = require("mongodb"), MongoClient = _a.MongoClient, ServerApiVersion = _a.ServerApiVersion;
var uri = "mongodb+srv://grzegorzpociejewski:OlqLJZqcPAnisYq1@cluster0.suk0uam.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
var client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
function run() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Connect the client to the server	(optional starting in v4.7)
                return [4 /*yield*/, client.connect()];
                case 1:
                    // Connect the client to the server	(optional starting in v4.7)
                    _a.sent();
                    // Send a ping to confirm a successful connection
                    return [4 /*yield*/, client.db("admin").command({ ping: 1 })];
                case 2:
                    // Send a ping to confirm a successful connection
                    _a.sent();
                    console.log("Pinged your deployment. You successfully connected to MongoDB!");
                    return [2 /*return*/];
            }
        });
    });
}
exports.run = run;
var users = [
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
function fixture() {
    return __awaiter(this, void 0, void 0, function () {
        var usersCollection;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    usersCollection = client.db("christmas").collection("users");
                    return [4 /*yield*/, usersCollection.countDocuments()];
                case 2:
                    if (!((_a.sent()) === 0)) return [3 /*break*/, 4];
                    return [4 /*yield*/, usersCollection.insertMany(users)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.fixture = fixture;
exports.christmasDb = client.db("christmas");
var getUserByToken = function (token) { return __awaiter(void 0, void 0, void 0, function () {
    var usersCollection, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                usersCollection = exports.christmasDb.collection("users");
                return [4 /*yield*/, usersCollection.findOne({ token: token })];
            case 1:
                user = _a.sent();
                console.log(user);
                return [2 /*return*/, user];
        }
    });
}); };
exports.getUserByToken = getUserByToken;
var setUSerAsUsed = function (token) { return __awaiter(void 0, void 0, void 0, function () {
    var usersCollection, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                usersCollection = exports.christmasDb.collection("users");
                return [4 /*yield*/, usersCollection.findOne({ token: token })];
            case 1:
                user = _a.sent();
                if (!user) return [3 /*break*/, 3];
                return [4 /*yield*/, usersCollection.updateOne({ token: token }, {
                        $set: {
                            used: true,
                        },
                    })];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.setUSerAsUsed = setUSerAsUsed;
