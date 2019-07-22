"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const util_1 = require("util");
const read = util_1.promisify(fs_1.default.readFile);
const write = util_1.promisify(fs_1.default.writeFile);
const unlink = util_1.promisify(fs_1.default.unlink);
const args = process.argv.slice(2);
const path = String(args[0]);
function getTag(comment, type) {
    if (!comment)
        return;
    if (!comment.tags)
        return;
    const tag = comment.tags.find((x) => x.tag === type) || {};
    if (!tag)
        return;
    return tag.text.trim();
}
function flattenChild(child) {
    const { kind: _, typeParameter: __, groups: ___, kindString: kind, comment, flags, sources } = child, rest = __rest(child, ["kind", "typeParameter", "groups", "kindString", "comment", "flags", "sources"]);
    const category = getTag(comment, "category");
    const description = comment && comment.shortText;
    const signatures = flattenChildren(rest.signatures);
    const parameters = flattenChildren(rest.parameters);
    const children = flattenChildren(rest.children);
    const generics = flattenChildren(rest.typeParameter);
    const getSignature = flattenChildren(rest.getSignature);
    const types = flattenChildren(rest.types);
    const type = typeof rest.type === "object" ? flattenChild(rest.type) : rest.type;
    const declaration = rest.declaration && flattenChild(rest.declaration);
    return Object.assign({}, rest, { kind,
        type,
        types,
        category,
        description,
        generics,
        signatures,
        parameters,
        children,
        getSignature,
        declaration }, flags);
}
const flattenChildren = (arr) => arr && arr.map(x => flattenChild(x));
function flatten(docs) {
    const modules = docs.children
        .flatMap((x) => x.children)
        .filter((x) => x)
        .map((x) => flattenChild(x))
        .filter((x) => x.category);
    return modules;
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const docString = yield read(path, "utf8");
        const packageString = yield read("package.json", "utf8");
        const { version } = JSON.parse(packageString);
        const docsObject = JSON.parse(docString);
        const flattened = flatten(docsObject);
        const newPath = path.replace(".json", `_${version.replace(/\./g, "-")}.json`);
        yield write(newPath, JSON.stringify({ version, modules: flattened }));
        yield unlink(path);
    });
}
main();
