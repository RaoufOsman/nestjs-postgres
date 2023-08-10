"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateString = exports.getConnectionName = exports.handleRetry = exports.getConnectionPrefix = exports.getConnectionToken = exports.getDbToken = void 0;
const postgres_constants_1 = require("../postgres.constants");
const operators_1 = require("rxjs/operators");
const node_crypto_1 = require("node:crypto");
const common_1 = require("@nestjs/common");
const circular_dependency_exception_1 = require("../exceptions/circular-dependency.exception");
const logger = new common_1.Logger('PostgresModule');
/**
 * This function generates an injection token for an Database
 * @param {Function} This parameter can either be a Database
 * @param {string} [connection='default'] Connection name
 * @returns {string} The Entity injection token
 */
function getDbToken(database, connection = postgres_constants_1.DEFAULT_CONNECTION_NAME) {
    if (database === null || database === undefined) {
        throw new circular_dependency_exception_1.CircularDependencyException('@InjectClient()');
    }
    const connectionPrefix = getConnectionPrefix(connection);
    return `${connectionPrefix}${database.name}`;
}
exports.getDbToken = getDbToken;
function getConnectionToken(connection = postgres_constants_1.DEFAULT_CONNECTION_NAME) {
    if (typeof connection === 'string') {
        return connection;
    }
    return `${connection.name || postgres_constants_1.DEFAULT_CONNECTION_NAME}`;
}
exports.getConnectionToken = getConnectionToken;
/**
 * This function returns a Connection prefix based on the connection name
 * @param {PostgresModuleOptions | string} [connection='default'] This optional parameter is either
 * a PostgresModuleOptions or a string.
 * @returns {string | Function} The Connection injection token.
 */
function getConnectionPrefix(connection = postgres_constants_1.DEFAULT_CONNECTION_NAME) {
    if (connection === postgres_constants_1.DEFAULT_CONNECTION_NAME) {
        return '';
    }
    if (typeof connection === 'string') {
        return connection + '_';
    }
    if (connection.name === postgres_constants_1.DEFAULT_CONNECTION_NAME || !connection.name) {
        return '';
    }
    return connection.name + '_';
}
exports.getConnectionPrefix = getConnectionPrefix;
function handleRetry(retryAttempts = 9, retryDelay = 3000) {
    return (source) => source.pipe((0, operators_1.retryWhen)((e) => e.pipe((0, operators_1.scan)((errorCount, error) => {
        logger.error(`Unable to connect to the database. Retrying (${errorCount + 1})...`, error.stack);
        if (errorCount + 1 >= retryAttempts) {
            throw error;
        }
        return errorCount + 1;
    }, 0), (0, operators_1.delay)(retryDelay))));
}
exports.handleRetry = handleRetry;
function getConnectionName(options) {
    return options && options.name ? options.name : postgres_constants_1.DEFAULT_CONNECTION_NAME;
}
exports.getConnectionName = getConnectionName;
const generateString = () => (0, node_crypto_1.randomUUID)();
exports.generateString = generateString;
