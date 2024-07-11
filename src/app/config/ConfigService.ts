import { Injectable } from '@angular/core';
import { AppConfig } from '../models/IAppConfig.model';
import { environment } from 'src/environments/environment.prod';
import { TypeEnvironment } from '../models/Types';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: AppConfig = {
    dev: {
      port: 5234,
      host: 'localhost',
      url: 'http://'
    },
    production: {
      port: undefined,
      host: 'www.ingenieriaback.somee.com',
      url: 'https://'
    }
  }

  private environment: TypeEnvironment = environment.production ? 'production' : 'dev';

  constructor() { }

  getConfig(environment: TypeEnvironment = this.environment) {
    return this.config[environment];
  }

  buildApiUrl(route: string, environment: TypeEnvironment = this.environment) {
    const config = this.getConfig(environment);
    const body = config.port ? ':' + config.port : '';
    return `${config.url}${config.host}${body}/api/${route}`;
  }
}
