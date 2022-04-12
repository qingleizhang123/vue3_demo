import * as ViewerKit from 'uih-mcsf-apptoolkit';
import { ModelContainer, plugable } from 'uih-mcsf-appframework';
import * as $PBRoot from 'uih-mcsf-protocol';
import $FrameworkPB = $PBRoot.Mcsf.AppFramework.ProtoBuf;
import { UIBotLayoutSwitcher } from 'uih-mcsf-apptoolkit';
import { AppsConsts } from '../utils/apps-consts';
@plugable('SetLayoutOperation')
export class SetLayoutOperation implements ViewerKit.IPanelOperation {
  public handle(
    modelContainer: ModelContainer,
    obj: $FrameworkPB.MsgCommonOperate
  ): Uint8Array {
    console.log('receive setlayout from be');
    const commandSender = modelContainer.getModel(
      ViewerKit.ModelNameConst.CommandSender
    ) as ViewerKit.ICommandSender;
    commandSender.workflowName = obj.workflowName;
    const workflow = modelContainer.getSpecificModel(ViewerKit.AppWorkflow);
    const layoutswitcher = workflow.LayoutSwitcher as UIBotLayoutSwitcher;
    layoutswitcher.switchLayout(AppsConsts.DefaultMedViewer, 'layout1x1');
    return null;
  }
}
