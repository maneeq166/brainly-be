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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const db_config_1 = require("./Config/db.config");
//logs every stuff 
const morganFormat = ':method :url :status :response-time ms';
app.use((0, morgan_1.default)(morganFormat));
//protects my website from attacks
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.json({ message: "hello" });
});
const port = 3000;
function connection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, db_config_1.connectDb)();
            console.log("Database is connected");
            app.listen(port, () => {
                console.log(`Server running on http://localhost:${port}`);
            });
        }
        catch (error) {
            console.error("Connection error:", error);
        }
    });
}
connection();
