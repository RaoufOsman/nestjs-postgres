import { PostgresModuleOptions } from '../interfaces';
import { Observable } from 'rxjs';
/**
 * This function generates an injection token for an Database
 * @param {Function} This parameter can either be a Database
 * @param {string} [connection='default'] Connection name
 * @returns {string} The Entity injection token
 */
export declare function getDbToken(database: Function, connection?: PostgresModuleOptions | string): string;
export declare function getConnectionToken(connection?: PostgresModuleOptions | string): string | Function;
/**
 * This function returns a Connection prefix based on the connection name
 * @param {PostgresModuleOptions | string} [connection='default'] This optional parameter is either
 * a PostgresModuleOptions or a string.
 * @returns {string | Function} The Connection injection token.
 */
export declare function getConnectionPrefix(connection?: PostgresModuleOptions | string): string;
export declare function handleRetry(retryAttempts?: number, retryDelay?: number): <T>(source: Observable<T>) => Observable<T>;
export declare function getConnectionName(options: PostgresModuleOptions): string;
export declare const generateString: () => `${string}-${string}-${string}-${string}-${string}`;
