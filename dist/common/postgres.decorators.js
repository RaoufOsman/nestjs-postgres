"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectConnection = exports.InjectPool = exports.InjectClient = void 0;
const common_1 = require("@nestjs/common");
const postgres_utils_1 = require("./postgres.utils");
const InjectClient = (connection) => {
    return (0, common_1.Inject)((0, postgres_utils_1.getConnectionToken)(connection));
};
exports.InjectClient = InjectClient;
const InjectPool = (connection) => {
    return (0, common_1.Inject)((0, postgres_utils_1.getConnectionToken)(connection));
};
exports.InjectPool = InjectPool;
const InjectConnection = (connection) => (0, common_1.Inject)((0, postgres_utils_1.getConnectionToken)(connection));
exports.InjectConnection = InjectConnection;
