"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const util_1 = require("util");
const write = util_1.promisify(fs_1.default.writeFile);
const read = util_1.promisify(fs_1.default.readFile);
const scan = util_1.promisify(fs_1.default.readdir);
const unlink = util_1.promisify(fs_1.default.unlink);
const REPO_PATH = "./doc-repo";
const INDEX_PATH = `${REPO_PATH}/index.json`;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield unlink(INDEX_PATH);
        }
        catch (_a) { }
        const files = yield scan(REPO_PATH);
        const result = [];
        for (const file of files) {
            const fileString = yield read(`${REPO_PATH}/${file}`, "utf8");
            const data = JSON.parse(fileString);
            result.push(data.version);
        }
        yield write(INDEX_PATH, JSON.stringify(result));
    });
}
main();
