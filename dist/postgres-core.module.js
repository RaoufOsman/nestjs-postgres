"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var PostgresCoreModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresCoreModule = void 0;
const common_1 = require("@nestjs/common");
const postgres_utils_1 = require("./common/postgres.utils");
const postgres_constants_1 = require("./postgres.constants");
const core_1 = require("@nestjs/core");
const rxjs_1 = require("rxjs");
const pg_1 = require("pg");
let PostgresCoreModule = exports.PostgresCoreModule = PostgresCoreModule_1 = class PostgresCoreModule {
    constructor(options, moduleRef) {
        this.options = options;
        this.moduleRef = moduleRef;
    }
    static forRoot(options, connection) {
        const knexModuleOptions = {
            provide: postgres_constants_1.POSTGRES_MODULE_OPTIONS,
            useValue: options,
        };
        const connectionProvider = {
            provide: (0, postgres_utils_1.getConnectionToken)(connection),
            useFactory: async () => await this.createConnectionFactory(options),
        };
        return {
            module: PostgresCoreModule_1,
            providers: [connectionProvider, knexModuleOptions],
            exports: [connectionProvider],
        };
    }
    static forRootAsync(options, connection) {
        const connectionProvider = {
            provide: (0, postgres_utils_1.getConnectionToken)(connection),
            useFactory: async (options) => {
                return await this.createConnectionFactory(options);
            },
            inject: [postgres_constants_1.POSTGRES_MODULE_OPTIONS],
        };
        return {
            module: PostgresCoreModule_1,
            imports: options.imports,
            providers: [...this.createAsyncProviders(options), connectionProvider],
            exports: [connectionProvider],
        };
    }
    async onApplicationShutdown() {
        const connection = this.moduleRef.get((0, postgres_utils_1.getConnectionToken)(this.options));
        connection && (await connection.end);
    }
    static createAsyncProviders(options) {
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProvider(options)];
        }
        const useClass = options.useClass;
        return [
            this.createAsyncOptionsProvider(options),
            {
                provide: useClass,
                useClass,
            },
        ];
    }
    static createAsyncOptionsProvider(options) {
        if (options.useFactory) {
            return {
                provide: postgres_constants_1.POSTGRES_MODULE_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        // `as Type<PostgresOptionsFactory>` is a workaround for microsoft/TypeScript#31603
        const inject = [
            (options.useClass || options.useExisting),
        ];
        return {
            provide: postgres_constants_1.POSTGRES_MODULE_OPTIONS,
            useFactory: async (optionsFactory) => {
                return await optionsFactory.createPostgresOptions();
            },
            inject,
        };
    }
    static async createConnectionFactory(options) {
        return (0, rxjs_1.lastValueFrom)((0, rxjs_1.defer)(() => {
            const client = new pg_1.Pool(options);
            return client.connect();
        }).pipe((0, postgres_utils_1.handleRetry)(options.retryAttempts, options.retryDelay)));
    }
};
exports.PostgresCoreModule = PostgresCoreModule = PostgresCoreModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({}),
    __param(0, (0, common_1.Inject)(postgres_constants_1.POSTGRES_MODULE_OPTIONS)),
    __metadata("design:paramtypes", [Object, core_1.ModuleRef])
], PostgresCoreModule);
