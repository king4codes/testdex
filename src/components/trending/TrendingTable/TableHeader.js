import React from "react";

const TableHeader = ({ sortBy, sortDirection, onSortChange }) => {
  const renderSortIcon = (column) => {
    if (sortBy !== column) return null;

    return (
      <span className="ml-1 inline-block">
        {sortDirection === "asc" ? "⬆️" : "⬇️"}
      </span>
    );
  };

  const headerClass = "sticky top-0 px-4 py-3 cursor-pointer hover:brightness-125 transition-all";

  return (
    <thead>
      <tr>
        <th className={`${headerClass} text-left`}>
          #
        </th>
        <th className={`${headerClass} text-left`}>
          ITEM
        </th>
        <th
          className={`${headerClass} text-right`}
          onClick={() => onSortChange("usdPrice")}
        >
          PRICE {renderSortIcon("usdPrice")}
        </th>
        <th
          className={`${headerClass} text-right`}
          onClick={() => onSortChange("createdAt")}
        >
          AGE {renderSortIcon("createdAt")}
        </th>
        <th
          className={`${headerClass} text-right`}
          onClick={() => onSortChange("transactions.oneDay")}
        >
          TRADES {renderSortIcon("transactions.oneDay")}
        </th>
        <th
          className={`${headerClass} text-right`}
          onClick={() => onSortChange("volumeUsd.oneDay")}
        >
          VOLUME {renderSortIcon("volumeUsd.oneDay")}
        </th>
        <th
          className={`${headerClass} text-right`}
          onClick={() => onSortChange("buyers.oneDay")}
        >
          MERCHANTS {renderSortIcon("buyers.oneDay")}
        </th>
        <th
          className={`${headerClass} text-right`}
          onClick={() => onSortChange("usdPricePercentChange.5m")}
        >
          5M {renderSortIcon("usdPricePercentChange.5m")}
        </th>
        <th
          className={`${headerClass} text-right`}
          onClick={() => onSortChange("usdPricePercentChange.oneHour")}
        >
          1H {renderSortIcon("usdPricePercentChange.oneHour")}
        </th>
        <th
          className={`${headerClass} text-right`}
          onClick={() => onSortChange("usdPricePercentChange.sixHour")}
        >
          6H {renderSortIcon("usdPricePercentChange.sixHour")}
        </th>
        <th
          className={`${headerClass} text-right`}
          onClick={() => onSortChange("usdPricePercentChange.oneDay")}
        >
          24H {renderSortIcon("usdPricePercentChange.oneDay")}
        </th>
        <th
          className={`${headerClass} text-right`}
          onClick={() => onSortChange("liquidityUsd")}
        >
          STOCK {renderSortIcon("liquidityUsd")}
        </th>
        <th
          className={`${headerClass} text-right`}
          onClick={() => onSortChange("marketCap")}
        >
          VALUE {renderSortIcon("marketCap")}
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;
