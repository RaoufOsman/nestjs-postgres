import { PostgresModuleOptions } from '../interfaces/postgres-options.interface';
export declare const InjectClient: (connection?: string) => PropertyDecorator & ParameterDecorator;
export declare const InjectPool: (connection?: string) => PropertyDecorator & ParameterDecorator;
export declare const InjectConnection: (connection?: PostgresModuleOptions | string) => ParameterDecorator;
