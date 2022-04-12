import * as Viewer from 'uih-mcsf-medviewercontrol';
import * as AppToolKit from 'uih-mcsf-apptoolkit';
export class MedViewerHelper {
  static getCellsByCellType(
    cellType: string,
    medViewer: Viewer.MedViewerControl
  ): Viewer.MedViewerControlCell[] {
    return medViewer.cells.filter(
      m => (m as AppToolKit.AppCell).cellType === cellType
    );
  }
}

export function readString(buffer: Uint8Array) {
  let s = '';
  for (const n of buffer) {
    s += String.fromCharCode(n);
  }
  return s;
}

/**
 * 字符串传Uint8Array
 * @param str string
 * @returns 字符串传Uint8Array
 */
export function stringToUint8Array(str: string): Uint8Array {
  const arr = [];
  for (let i = 0; i < str.length; ++i) {
    arr.push(str.charCodeAt(i));
  }

  return new Uint8Array(arr);
}
