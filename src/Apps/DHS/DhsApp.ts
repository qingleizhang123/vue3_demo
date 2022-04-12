import * as AppToolkit from 'uih-mcsf-apptoolkit';
import * as VueAppToolkit from 'uih-mcsf-vue-apptoolkit';
import {
  AppConfigService,
  BaseApp,
  UIBotAppContainer
} from 'uih-mcsf-vue-apptoolkit';
import * as Utility from 'uih-mcsf-utility';
import { markRaw, reactive } from 'vue';
import { Options, Vue } from 'vue-class-component';
import { Provide } from 'vue-property-decorator';
import * as AppFramework from 'uih-mcsf-appframework';
import { UIBotAppConfigureModel } from '../model/UIBotAppConfigureModel';
import { modelContainerConfig } from './config/DhsModelContainerConfig';
import { UIBotLayoutSwitcher, AppWorkflow } from 'uih-mcsf-apptoolkit';
import { SetLayoutOperation } from './model/DhsPanelOps';

@Options({
  props: {},
  components: {}
})
export default class DrvApp extends Vue implements BaseApp {
  @Provide({ to: 'modelContainer' })
  public modelContainer: AppFramework.ModelContainer = markRaw(
    new AppFramework.ModelContainer()
  );

  @Provide({ to: 'appConfigService' })
  public appConfigService = new AppConfigService();

  private appContainer: UIBotAppContainer | undefined = undefined;

  public created(): void {
    if (!this.appContainer) {
      this.appContainer = new UIBotAppContainer(this);
    }
    // 向PA页面发送请求并开启消息监听
    if (document.referrer) {
      console.log('开启postMessage监听', document.referrer);
      if (window.opener) {
        window.opener.postMessage(
          { title: 'request checkSeries' },
          document.referrer.substring(0, document.referrer.length - 1)
        );
        window.addEventListener('message', e => {
          if (document.referrer.startsWith(e.origin)) {
            console.log('data from PA is: ', e.data);
            if (e.data.checkSeries !== undefined) {
              sessionStorage.setItem('checkSeries', e.data.checkSeries);
              sessionStorage.setItem('userId', e.data.userId);
            }
          }
        });
      }
    }
  }

  public mounted() {
    window.addEventListener(
      'resize',
      Utility.debounce((e: any) => this.OnSizeChanged(e), 100),
      false
    );

    if (this.modelContainer) {
      const rootUiModel = this.modelContainer.getSpecificModel(
        AppToolkit.RootUIInitModel
      );
      rootUiModel.setUIInitialized();
    }
  }

  public reactiveModel(model: any): any {
    if (!model) {
      return false;
    }
    // 为了提高性能，按照Vue WARNING
    // https://www.vue3js.cn/docs/zh/api/basic-reactivity.html#markraw
    // 有些值不应被设置为响应式的，例如复杂的第三方类实例或 Vue 组件对象
    // 当渲染具有不可变数据源的大列表时，跳过代理转换可以提高性能。
    // 将ViewModel转为代理，其他的标记为永远不会转换为代理
    if (
      model instanceof AppFramework.AppViewModelBase ||
      model instanceof Utility.NLS
    ) {
      return reactive(model);
    } else {
      return markRaw(model);
    }
  }

  public registerType(): void {
    AppToolkit.registerType(this.modelContainer);
    VueAppToolkit.registerType(this.modelContainer);

    // model
    this.modelContainer.register(
      AppToolkit.AppConfigureModel,
      UIBotAppConfigureModel
    );
    this.modelContainer.register(
      AppToolkit.AppLayoutSwitcher,
      UIBotLayoutSwitcher
    );

    // operation
    this.modelContainer.register(AppToolkit.CrossCellOperation);
    this.modelContainer.register(SetLayoutOperation);
  }

  public addModels(): void {
    AppToolkit.addModels(this.modelContainer);
    VueAppToolkit.addModels(this.modelContainer);
    this.modelContainer.initilize(modelContainerConfig);
  }

  public doWorkCompleted(): void {
    const containerStatusModel = this.modelContainer.getModel(
      'ModelContainerCompleteStatusModel'
    ) as AppToolkit.PromiseWrapper<boolean>;
    containerStatusModel.fulfillPromise(true);
    const statusHandleModel = this.modelContainer.getSpecificModel(
      AppToolkit.StatusHandlerModel
    );
    if (statusHandleModel) {
      statusHandleModel.beCreated.then(result => {
        if (result) {
          const strSeriesUIDList = sessionStorage.getItem('checkSeries');
          let seriesUIDArray = [
            '1.2.156.112605.91758808170.220216054153.6.12964.10675',
            '1.2.156.112605.189250940799837.181115054722.3.10852.300808'
          ];
          // '1.2.156.112605.141352166858894.191218034201.3.5968.40564'];
          // '1.2.156.112605.189250946647754.191129095430.3.6224.59677',
          // '1.2.156.112605.189250946647754.191129095430.3.6224.29220',
          // '1.2.156.112605.189250946647754.191129095429.3.6224.48403',
          // '1.2.156.112605.189250946647754.191129095430.3.6224.80085',
          // '1.2.156.112605.189250946647754.191129095430.3.6224.110493'];
          if (strSeriesUIDList !== null) {
            seriesUIDArray = strSeriesUIDList.split(',');
          }
          const commandSender = this.modelContainer.getModel(
            AppToolkit.ModelNameConst.CommandSender
          ) as AppToolkit.ICommandSender;
          AppToolkit.CommandHelper.loadSeries(commandSender, seriesUIDArray);
        }
      });
    } else {
      console.error('StatusHandlerModel is not exit');
    }
  }

  protected OnSizeChanged(ev) {
    const appWorkflow = this.modelContainer.getSpecificModel(AppWorkflow);
    console.log(ev.target);
    if (appWorkflow && appWorkflow.LayoutSwitcher) {
      appWorkflow.LayoutSwitcher.sendLayoutCommand();
    }
  }
}
