import { DynamicModule, Provider, OnApplicationShutdown } from '@nestjs/common';
import { PostgresModuleAsyncOptions, PostgresModuleOptions } from './interfaces';
import { ModuleRef } from '@nestjs/core';
export declare class PostgresCoreModule implements OnApplicationShutdown {
    private readonly options;
    private readonly moduleRef;
    constructor(options: PostgresModuleOptions, moduleRef: ModuleRef);
    static forRoot(options: PostgresModuleOptions, connection?: string): DynamicModule;
    static forRootAsync(options: PostgresModuleAsyncOptions, connection: string): DynamicModule;
    onApplicationShutdown(): Promise<any>;
    static createAsyncProviders(options: PostgresModuleAsyncOptions): Provider[];
    static createAsyncOptionsProvider(options: PostgresModuleAsyncOptions): Provider;
    private static createConnectionFactory;
}
