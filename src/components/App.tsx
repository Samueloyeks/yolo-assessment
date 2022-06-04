import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { ReactComponent as LogoIcon } from "../assets/logo.svg";
import AddCurrency from "./AddCurrency";
import CurrencyList from "./CurrencyList";
import ComfirmModal from "./ConfirmModal";
import CRYPTO_PRICES_QUERY from "../api/graphql/queries/getCryptoPrices";
import { Currency, NotificationSeverity } from "../types";
import "../styles/App.css";

function App() {
  const [currency, setCurrency] = useState<String>("");
  const [currencyList, setCurrencyList] = useState<Currency[]>([]);
  const { data, error, loading, refetch } = useQuery(CRYPTO_PRICES_QUERY, {
    variables: { currency: currency },
    errorPolicy: "all",
  });
  const [showNotif, setShowNotif] = useState<boolean>(false);
  const [notifSeverity, setNotifSeverity] =
    useState<NotificationSeverity>("success");
  const [notifMessage, setNotifMessage] = useState<String>("");
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [deleteIndex, setDeleteindex] = useState<number>(-1);

  const deleteCurrency = (): void => {
    let list = [...currencyList];
    list.splice(deleteIndex, 1);
    setCurrencyList(list);
    setNotifMessage("Currency Deleted");
    setNotifSeverity("success");
    setShowNotif(true);
  };

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  useEffect(() => {
    if (data && !error) {
      const { markets } = data;

      if (currency !== "" && markets.length === 0) {
        setNotifMessage("No prices found");
        setNotifSeverity("error");
        setShowNotif(true);
      }

      for (let market of markets) {
        if (market?.ticker?.lastPrice) {
          const newCurrency = {
            id: market.id,
            name: currency.toUpperCase(),
            price: `${Number(market.ticker.lastPrice).toFixed(2)}EUR`,
          };
          setCurrencyList((currencyList) => [newCurrency, ...currencyList]);
          setNotifMessage("Currency Added");
          setNotifSeverity("success");
          setShowNotif(true);
          setCurrency("");
          return;
        }
      }
    }
    refetch({ currency: currency.toUpperCase() });
  }, [currency, data, refetch, error]);

  return (
    <div className="app">
      <div className="main">
        <header className="header">
          <LogoIcon />
        </header>
        <div className="content-wrapper">
          <div className="add-crypto">
            <AddCurrency loading={loading} addCurrency={setCurrency} />
          </div>
          <div className="crypto-list">
            <CurrencyList
              currencyList={currencyList}
              deleteCurrency={(index: number) => {
                setConfirmOpen(true);
                setDeleteindex(index);
              }}
            />
          </div>
        </div>
      </div>
      <div className="info">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
        mollitia, molestiae quas vel sint commodi repudiandae consequuntur
        voluptatum laborum numquam blanditiis harum quisquam eius sed odit
        fugiat iusto fuga praesentium optio, eaque rerum! Provident similique
        accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut
      </div>
      <Snackbar
        open={showNotif}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setShowNotif(false)}
      >
        <Alert
          onClose={() => setShowNotif(false)}
          severity={notifSeverity}
          sx={{ width: "100%" }}
        >
          {notifMessage}
        </Alert>
      </Snackbar>
      <ComfirmModal
        title="Delete Cryptocurrency?"
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={deleteCurrency}
      >
        Are you sure you want to delete this cryptocurrency?
      </ComfirmModal>
    </div>
  );
}

export default App;
