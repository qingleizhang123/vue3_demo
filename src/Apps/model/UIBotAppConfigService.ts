import * as AppToolkit from 'uih-mcsf-apptoolkit';

// 重写AppConfigService类
export class AppConfigService implements AppToolkit.IAppConfigService {
  private configUrl = './assets/appconfig.json';

  private config: Promise<AppToolkit.AppConfig> | undefined = undefined;

  getAppItems(): Promise<AppToolkit.AppItem[]> {
    return this.getAppConfig().then(value => Promise.resolve(value.appItems));
  }

  getAppConfig(): Promise<AppToolkit.AppConfig> {
    if (!this.config) {
      this.config = AppToolkit.AppConfigHelper.parseAppConfig(this.configUrl);
    }
    return this.config;
  }

  setConfigUrl(configUrl: string) {
    this.configUrl = configUrl;
  }

  getConfigUrl() {
    return this.configUrl;
  }
}
