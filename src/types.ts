type Currency = {
  id: String;
  name: String;
  price: String;
};

type NotificationSeverity = "error" | "info" | "success" | "warning";

export type { Currency, NotificationSeverity };
