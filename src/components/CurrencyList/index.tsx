import React from "react";
import ListItem from "./ListItem";
import { Currency } from "../../types";
import "./style.css";

const CurrencyList = (props: {
  currencyList: Currency[];
  deleteCurrency: Function;
}) => {
  const { currencyList, deleteCurrency } = props;

  return (
    <div className="currency-list">
      <h3 className="currency-list-heading">
        Now you can track <br /> all your cryptos here!
      </h3>
      <p className="currency-list-text">
        Just enter the <br /> cryptocurrency code on the <br /> form to the
        right
      </p>
      <div className="currency-list-container">
        {currencyList.map((item, index) => (
          <ListItem
            item={item}
            key={item.id.toString()}
            deleteCurrency={deleteCurrency}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default CurrencyList;
