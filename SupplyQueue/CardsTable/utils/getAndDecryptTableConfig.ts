import { decryptData } from 'app/utils/hashData';
import { Dispatch, SetStateAction } from 'react';

export const getAndDecryptTableConfig = <T, D extends { id: number; showColumn: boolean }>({
  tableConfigKey,
  columnsConfigKey,
  setShowTableColumnsArray,
  initialTableConfig,
}: {
  setShowTableColumnsArray: Dispatch<SetStateAction<T[]>>;
  columnsConfigKey: string;
  tableConfigKey: string;
  initialTableConfig: D[];
}) => {
  const showColumns = localStorage.getItem(columnsConfigKey);
  const showTableConfig = localStorage.getItem(tableConfigKey);
  if (showColumns && showTableConfig) {
    const parsedShowColumns = decryptData(showColumns, columnsConfigKey);
    const parsedShowTableConfig = decryptData(showTableConfig, tableConfigKey);
    return { parsedShowColumns, parsedShowTableConfig } as {
      parsedShowColumns: T[];
      parsedShowTableConfig: T[];
    };
  } else {
    setShowTableColumnsArray(
      initialTableConfig.map((m, index) => {
        if (m.showColumn) {
          return { id: m.id, index };
        }
      }) as T[],
    );
  }
};
