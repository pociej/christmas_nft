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
var akord_js_1 = require("@akord/akord-js");
var openai_1 = require("openai");
// import http from "http";
var fs_1 = require("fs");
var db = require("./db");
var express_1 = require("express");
var cors_1 = require("cors");
var https_1 = require("https");
db.fixture();
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
var port = 3111;
app.get("/", function (req, res) {
    res.send("Welcome to my server!");
});
app.get("/checkToken", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.query.token;
                return [4 /*yield*/, db.getUserByToken(token)];
            case 1:
                user = _a.sent();
                console.log("token", user);
                if (user) {
                    res.send({ name: user.name, used: user.used });
                }
                else {
                    res.send({ error: "Invalid token" });
                }
                return [2 /*return*/];
        }
    });
}); });
app.listen(port, function () {
    console.log("Server is running on port ".concat(port));
});
app.get("/replyToWish", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var wish, openai, completion;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                wish = req.query.wish;
                console.log("wish", wish);
                openai = new openai_1.default({
                    apiKey: process.env.OPENAI_API_KEY,
                });
                return [4 /*yield*/, openai.chat.completions.create({
                        messages: [
                            {
                                role: "system",
                                content: "You are a santa claus. You are talking to a person that you will give NFT of rubber duck, even if this person is naughty and nice.",
                            },
                            {
                                role: "assistant",
                                content: "Have you been naughty or nice this year?",
                            },
                            { role: "user", content: wish },
                        ],
                        model: "gpt-3.5-turbo-1106",
                    })];
            case 1:
                completion = _a.sent();
                res.send({ reply: completion.choices[0].message.content });
                return [2 /*return*/];
        }
    });
}); });
app.get("/getImage", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, user, openai, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("post");
                token = req.query.token;
                return [4 /*yield*/, db.getUserByToken(token)];
            case 1:
                user = _a.sent();
                console.log("token", user);
                if (!user) return [3 /*break*/, 3];
                openai = new openai_1.default({
                    apiKey: process.env.OPENAI_API_KEY,
                });
                return [4 /*yield*/, openai.images.generate({
                        model: "dall-e-3",
                        prompt: "beauty rubber duck for christmas, swimming in the perfect scenery. Choose one scenery from, tropical or arctic or amazonian or maybe stormy ocean or wild river. lovely, with heart symbol on the duck and santa hat on the head. Heart symbol can be coloured and duck as well can have some colours or texture",
                        n: 1,
                        size: "1024x1024",
                        quality: "hd",
                    })];
            case 2:
                response = _a.sent();
                console.log(response);
                downloadFile({
                    url: response.data[0].url || "",
                    dest: "./".concat(user.name, ".png"),
                    name: user.name,
                    sendResponse: function (response) {
                        res.send(response);
                    },
                    token: token,
                });
                return [3 /*break*/, 4];
            case 3:
                res.send({ error: "Invalid token" });
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); });
// console.log(response);
var downloadFile = function (_a) {
    var url = _a.url, dest = _a.dest, name = _a.name, sendResponse = _a.sendResponse, token = _a.token;
    return __awaiter(void 0, void 0, void 0, function () {
        var file, wallet, akord, vaults, vaultId;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    file = fs_1.default.createWriteStream(dest);
                    return [4 /*yield*/, akord_js_1.Auth.signIn("grzegorz.pociejewski@gmail.com", "Dupa1234cycki")];
                case 1:
                    wallet = (_c.sent()).wallet;
                    return [4 /*yield*/, akord_js_1.Akord.init(wallet)];
                case 2:
                    akord = _c.sent();
                    return [4 /*yield*/, akord.vault.listAll()];
                case 3:
                    vaults = _c.sent();
                    vaultId = ((_b = vaults.find(function (vault) { return vault.name === "Golem Christmas NFT"; })) === null || _b === void 0 ? void 0 : _b.id) || "";
                    https_1.default.get(url, function (response) {
                        response.pipe(file);
                        file.on("finish", function () {
                            file.close();
                            akord.stack
                                .create(vaultId, dest, name + "_image", {
                                mimeType: "image/png",
                            })
                                .then(function (stack) {
                                console.log(stack);
                                akord.stack.getUri(stack.stackId).then(function (uri) {
                                    akord.stack
                                        .create(vaultId, Buffer.from(JSON.stringify({
                                        image: "https://arweave.net/".concat(uri),
                                        name: name,
                                    })), name + "_json", {
                                        mimeType: "application/json",
                                    })
                                        .then(function (jstack) {
                                        akord.stack.getUri(jstack.stackId).then(function (juri) {
                                            sendResponse({
                                                image: url,
                                                json: "https://arweave.net/".concat(juri),
                                            });
                                            db.setUSerAsUsed(token);
                                        });
                                    });
                                });
                            });
                        });
                    });
                    return [2 /*return*/];
            }
        });
    });
};
