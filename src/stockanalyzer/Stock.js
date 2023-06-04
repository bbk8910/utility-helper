import { Box } from "@material-ui/core";
import * as React from "react";
import AddRawStockDataForm from "./AddRawStockDataForm";
import { getAllData, stockStore } from "./StockDao";
import StockTable from "./StockTable";

export default function Stock(props) {
  const [stockMap, setStockMap] = React.useState([]);
  const [formData, setFormData] = React.useState({});

  React.useEffect(() => {
    getStocksMap();
  }, []);

  function getStocksMap() {
    getAllData(stockStore).then((data) => {
      setStockMap(data);
      console.log("get all laist", data);
    });
  }
  return (
    <Box className="page-wrapper">
      <AddRawStockDataForm
        formData={formData}
        onActionComplete={getStocksMap}
        setFormData={setFormData}
      />
      <div className="eu-table">
        <StockTable
          stockMap={stockMap}
          setFormData={setFormData}
          formData={formData}
          action={true}
        />
      </div>
    </Box>
  );
}
