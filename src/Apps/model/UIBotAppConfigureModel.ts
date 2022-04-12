import * as ApptoolKit from 'uih-mcsf-apptoolkit';
import * as Utility from 'uih-mcsf-utility';
import * as Netbase from 'uih-mcsf-netbase';
/**
 * 重写AppBase的AppConfigureModel
 */
export class UIBotAppConfigureModel extends ApptoolKit.AppConfigureModel {
  initialize(): Promise<boolean> {
    return new Promise(resolve => {
      this._serverUrl = window.location.host;
      this._appName = ApptoolKit.AppRouteHelper.getAppNameByUrl(
        window.location.href
      );
      // this._studyInstanceUid = AppRouteHelper.getStudyUidByUrl(window.location.href);
      this._appHostType = ApptoolKit.AppRouteHelper.getHostTypeByUrl(
        window.location.href
      );
      // this._proxyName = ViewerKit.AppRouteHelper.getProxyNameByUrl(window.location.href);
      this._isDeviceSlow =
        Utility.DeviceInformationHelper.getChromeVersion() < 50;
      console.log(`AppName=${this._appName}`);
      console.log(`HostType=${this._appHostType}`);
      console.log(`StudyUID=${this._studyInstanceUid}`);
      console.log(`ProxyName=${this._proxyName}`);
      if (this._appHostType === ApptoolKit.AppHostType.Native) {
        if (
          !this._proxyName ||
          Netbase.CommunicationNodeName.isAutoCommunicationProxyName(
            this._proxyName
          )
        ) {
          resolve(false);
          return;
        } else {
          this._beProxyName =
            Netbase.CommunicationNodeName.getPeerCommunicationProxyName(
              this._proxyName,
              'BE'
            );
          if (!this._beProxyName) {
            this._beProxyName = this._appName; // 如果不能根据ProxyName计算出BEName时，直接使用AppName进行通信
          }
        }
      } else {
        // FE Proxy Name不存在时，使用AppName创建自动ProxyName通知Server获取（BEName不需要配置）
        // 否则 BE Proxy Name使用AppName创建自动ProxyName通知Server获取（FE Proxy Name用于创建实例Index）
        if (!this._proxyName) {
          this._proxyName =
            Netbase.CommunicationNodeName.createAutoCommunicationProxyName(
              this._appName
            );
        } else {
          this._beProxyName =
            Netbase.CommunicationNodeName.createAutoCommunicationProxyName(
              this._appName
            );
        }
      }
      console.log(`proxy name=${this._proxyName}`);
      const appConfigService = this
        .modelParameter as ApptoolKit.IAppConfigService;
      if (appConfigService) {
        appConfigService
          .getAppConfig()
          .then(appConfig => {
            this._serverUrl = appConfig.serverUrl;
            resolve(true);
          })
          .catch(error => {
            console.error(error);
            resolve(false);
          });
      } else {
        resolve(false);
      }
    });
  }
}
