export interface AppConfig {
    dev: {
        port: number;
        host: string;
        url: string;
    };
    production: {
        port?: number;
        host: string;
        url: string;
    };
}