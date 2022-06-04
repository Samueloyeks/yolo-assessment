import { render } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { fireEvent, screen, waitFor } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import CRYPTO_PRICES_QUERY from "../../api/graphql/queries/getCryptoPrices";
import App from "../App";

describe("App", () => {
  const mocks = [
    {
      request: {
        query: CRYPTO_PRICES_QUERY,
        variables: {
          currency: "BTC",
        },
      },
      result: {
        data: {
          markets: [
            {
              id: "test_id1",
              name: "test_name1",
              ticker: { lastPrice: 5000.2 },
            },
            {
              id: "test_id2",
              name: "test_name2",
              ticker: { lastPrice: 4000.2 },
            },
          ],
        },
      },
    },
  ];

  it("adds currency to list on button click", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );

    const input = screen.getByLabelText("CRYPTOCURRENCY CODE");

    fireEvent.change(input, { target: { value: "BTC" } });

    const button = screen.getByTestId("add-currency-button");
    userEvent.click(button);

    await waitFor(() => {
      expect(screen.getAllByRole("listitem").length).toEqual(1);
    });
  });
});
