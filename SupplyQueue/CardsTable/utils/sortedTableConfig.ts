import { Dispatch, SetStateAction } from 'react';

export const sortedTableConfig = <T extends { id: number }, D extends { id: number }>({
  sortedShowColumns,
  parsedShowTableConfig,
  setTableConfig,
  setInitialConfig,
}: {
  setTableConfig: Dispatch<SetStateAction<T[]>>;
  setInitialConfig: Dispatch<SetStateAction<T[]>>;
  sortedShowColumns: D[];
  parsedShowTableConfig: D[];
}) => {
  setTableConfig(prevConfig => {
    const sortedTableConfig = prevConfig.sort((a, b) => {
      const indexA = parsedShowTableConfig.findIndex((item: D) => item.id === a.id);
      const indexB = parsedShowTableConfig.findIndex((item: D) => item.id === b.id);
      return indexA - indexB;
    });
    return sortedTableConfig.map(f => ({
      ...f,
      showColumn: f.id === 10 || f.id === 1 ? true : sortedShowColumns.some((item: D) => item.id === f.id),
    }));
  });
  setInitialConfig(prevConfig => {
    return prevConfig.sort((a, b) => {
      const indexA = parsedShowTableConfig.findIndex((item: D) => item.id === a.id);
      const indexB = parsedShowTableConfig.findIndex((item: D) => item.id === b.id);
      return indexA - indexB;
    });
  });
};
