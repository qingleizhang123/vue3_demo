import * as AppFramework from 'uih-mcsf-appframework';
import * as AppToolkit from 'uih-mcsf-apptoolkit';
import { workflowConfig } from './DhsWorkflowConfig';
import { commandConfig } from './DhsCommandConfig';
import { UIBotAppConfigureModel } from '../../model/UIBotAppConfigureModel';
export const modelContainerConfig = {
  modelCollection: [
    {
      modelName: 'CommandSender'
    },
    {
      modelName: 'AppWorkflow',
      modelParameter: workflowConfig
    },
    {
      modelName: 'CommandHandlerModel',
      modelParameter: commandConfig
    },
    {
      modelName: 'ChangeCrossHairCommandViewModel'
    },
    {
      modelName: 'ImageTextDisplayModeCommandViewModel'
    },
    {
      modelName: 'ResetWindowingCommandViewModel'
    },
    {
      modelName: 'FitWindowCommandViewModel'
    },
    {
      modelName: 'ClearGraphicsCommandViewModel'
    },
    {
      modelName: 'ChangeLayoutCommandViewModel'
    },
    {
      modelName: 'ChangeLayoutByDoubleClickCommandViewModel'
    },
    {
      modelName: 'CommonToolsCommandViewModel'
    },
    {
      modelName: 'CrossHairVisibleCommandViewModel'
    },
    {
      modelName: 'ResetMprCommandViewModel'
    },
    {
      modelName: 'DRVSetGraphicMirrorModeVertical'
    },
    {
      modelName: 'DRVSetGraphicMirrorModeHorizon'
    },
    {
      modelName: 'DRVCommonToolsCommandViewModel'
    },
    {
      modelName: 'DRVWWWLResetCommandViewModel'
    },
    {
      modelName: 'ModelContainerCompleteStatusModel'
    }
  ]
};

/**
 * override UIH.Mcsf.NG.AppToolkit's registerType
 * @param modelContainer modelContainer
 */
export function registerType(modelContainer: AppFramework.ModelContainer) {
  AppToolkit.registerType(modelContainer);
  modelContainer.register(AppToolkit.RootUIInitModel);
  modelContainer.register(AppToolkit.ServerAPIModel);
}
