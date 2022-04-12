export const workflowConfig = {
  cellCollection: [
    {
      cellName: 'Axial',
      cellType: 'MPR',
      initializeItems: [
        {
          mapClassName: 'ImageTextInitializeItem',
          config: {
            items: [
              {
                modality: 'CT',
                cellType: 'MPR',
                WebPath: './assets/ct.json'
              }
            ]
          }
        }
      ]
    },
    {
      cellName: 'Preview_Axial_MPR',
      cellType: 'MPR',
      clonedFrom: 'Axial'
    }
  ],
  layoutCollection: [
    {
      layoutName: 'layout1x1',
      content: '布局= 1*1',
      toolTip: '布局',
      layoutInfo: {
        layout: {
          rows: 1,
          columns: 1
        },
        cellItems: ['Preview_Axial_MPR']
      }
    }
  ]
};
