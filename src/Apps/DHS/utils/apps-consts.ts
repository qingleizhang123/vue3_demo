import { RouteParaEnum } from 'uih-mcsf-apptoolkit';

export class AppsConsts {
  static APP_NAME_TKA_PLANNING = 'TKASurgeryPlanning'; // 术前规划

  static ROUTE_TKA_PLANNING: string =
    AppsConsts.APP_NAME_TKA_PLANNING +
    '/' +
    RouteParaEnum.RoutePara_GeneralRoutPara;

  static ROUTE_PRO_THA_PLANNING: string =
    AppsConsts.APP_NAME_TKA_PLANNING +
    '/' +
    RouteParaEnum.RoutePara_GeneralRoutParaPro;

  static DefaultMedViewer = 'MedViewerControl';

  static InvalidValue = -10000; // 非法值
}
