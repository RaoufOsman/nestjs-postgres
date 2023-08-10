import { DynamicModule } from '@nestjs/common';
import { PostgresModuleAsyncOptions, PostgresModuleOptions } from './interfaces';
export declare class PostgresModule {
    static forRoot(options: PostgresModuleOptions, connection?: string): DynamicModule;
    static forRootAsync(options: PostgresModuleAsyncOptions, connection?: string): DynamicModule;
}
