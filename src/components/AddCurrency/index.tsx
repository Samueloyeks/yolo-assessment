import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import "./style.css";

const AddCurrency = (props: { addCurrency: Function; loading: boolean }) => {
  const { addCurrency, loading } = props;
  const [currency, setCurrency] = useState<String>("");

  const onFormSubmit = (e: any): void => {
    e.preventDefault();
    addCurrency(currency);
    setCurrency("");
  };

  return (
    <div className="add-currency">
      <form className="add-currency-form" onSubmit={onFormSubmit}>
        <TextField
          value={currency}
          onChange={(e: any) => setCurrency(e.target.value)}
          label="CRYPTOCURRENCY CODE"
          className="add-currency-input"
          inputProps={{ style: { textTransform: "uppercase" } }}
        />
        <Button type="submit" className="add-currency-button" data-testid="add-currency-button">
          {loading ? <CircularProgress size={20} color="primary" /> : "Add"}
        </Button>
      </form>
      <div className="add-currency-text">
        Use of this service is subject to terms and conditions.
      </div>
    </div>
  );
};

export default AddCurrency;
