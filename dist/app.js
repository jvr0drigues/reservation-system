"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const event_1 = __importDefault(require("./routes/event"));
const seat_1 = __importDefault(require("./routes/seat"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerOptions_1 = __importDefault(require("./config/swaggerOptions"));
const app = (0, express_1.default)();
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions_1.default);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/events', event_1.default);
app.use('/seats', seat_1.default);
exports.default = app;
