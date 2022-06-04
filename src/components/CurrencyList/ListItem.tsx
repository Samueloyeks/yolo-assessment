import React from "react";
import { ReactComponent as ItemIcon } from "../../assets/icon.svg";
import { Currency } from "../../types";
import "./style.css";

const ListItem = (props: {
  item: Currency;
  deleteCurrency: Function;
  index: number;
}) => {
  const { item, deleteCurrency, index } = props;

  return (
    <div className="list-item" role="listitem">
      <span className="list-item-wrapper">
        <ItemIcon className="list-item-img" />
        <div className="list-item-details">
          {item.name}
          <small className="list-item-price">{item.price}</small>
        </div>
      </span>

      <button
        className="list-item-delete"
        onClick={() => deleteCurrency(index)}
      >
        X
      </button>
    </div>
  );
};

export default ListItem;
