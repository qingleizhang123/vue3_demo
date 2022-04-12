export const commandConfig = {
  cellOperations: [
    {
      ID: 0,
      classNames: ['InitializeCellOperation']
    },
    {
      ID: 19,
      classNames: ['UpdateGraphicAllInfoCellOperation']
    },
    {
      ID: 22,
      classNames: ['ScaleCellOperation']
    },
    {
      ID: 23,
      classNames: ['WindowLevelCellOperation']
    },
    {
      ID: 24,
      classNames: ['CrossHairCellOperation']
    },
    {
      ID: 25,
      classNames: ['CrossCellOperation']
    },
    // {
    //     ID: 28,
    //     classNames: ['ThicknessCellOperation']
    // },
    {
      ID: 31,
      classNames: ['RulerCellOperation']
    },
    {
      ID: 32,
      classNames: ['SlicePosition3DCellOperation']
    },
    {
      ID: 34,
      classNames: ['CurrentSliceOperation']
    },
    /* {
          ID: 55,
          classNames: ['OrientationCellOperation']
      }, */
    {
      ID: 59,
      classNames: ['PseudoColorCellOperation']
    },
    {
      ID: 60,
      classNames: ['ImageDataCellOperation']
    },
    {
      ID: 61,
      classNames: ['ImageTextContentOperation']
    },
    {
      ID: 132,
      classNames: ['AppMPROutlineOperation']
    },
    {
      ID: 133,
      classNames: ['FusionCrossCellOperation']
    },
    {
      ID: 134,
      classNames: ['HKALineOperation']
    }
  ],
  panelOperations: [
    {
      ID: 'UpdateProgressInfo',
      classNames: ['UpdateProgressInfo']
    },
    {
      ID: 'UpdateFESetLayout',
      classNames: ['SetLayoutOperation']
    },
    {
      ID: 'UpdateSeriesList',
      classNames: ['UpdateSeriesListOperation']
    },
    {
      ID: 'UpdateImageList',
      classNames: ['UpdateImageListOperation']
    },
    {
      ID: 'UpdateImageInfo',
      classNames: ['UpdateImageInfoOperation']
    }
  ],
  commandHandlers: [
    {
      ID: 13002,
      className: 'DrvLoadCheckCommandHandler'
    }
  ]
};
