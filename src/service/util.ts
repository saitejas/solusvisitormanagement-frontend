import { NavigateFunction } from "react-router-dom";

export const logout = (navigate: NavigateFunction) => {
    localStorage.clear();
    navigate("/");
}

export const sortData = (data: any, sortKey: string, sortDirection: string) => {
    const sorted = data.slice().sort((a: any, b: any) => {
        if (sortKey) {
          const aValue = a[sortKey];
          const bValue = b[sortKey];
          if (sortDirection === "asc") {
            return aValue < bValue ? -1 : 1;
          } else {
            return bValue < aValue ? -1 : 1;
          }
        }
        return 0;
    });
    return sorted
}