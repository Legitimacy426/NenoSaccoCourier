// Fields for populating order-related references
export const ORDER_POPULATE_FIELDS = [
  { path: "userId", select: "username email" }, // Populate user info in orders
  {
    path: "parcelId",
    populate: [
      { path: "parcelType", select: "name description" },
      { path: "deliveryDetails" },
    ],
  }, // Populate parcel info with parcelType and delivery details
  { path: "deliveryAgent", select: "username phone" }, // Populate delivery agent info if any
];

// Fields for populating parcel-related references
export const PARCEL_POPULATE_FIELDS = [
  { path: "userId", select: "username email" }, // Populate user who owns the parcel
  { path: "orderId", populate: ORDER_POPULATE_FIELDS }, // Populate order details if associated
  { path: "parcelType", select: "name description" }, // Populate parcelType info
  { path: "deliveryAgent", select: "username phone" }, // Populate delivery agent for the parcel
  { path: "logs", populate: { path: "handledBy", select: "username" } }, // Populate logs with user info
];

// Fields for populating user-related references
export const USER_POPULATE_FIELDS = [
  { path: "orders", populate: ORDER_POPULATE_FIELDS }, // Populate user's orders
  { path: "parcels", populate: PARCEL_POPULATE_FIELDS }, // Populate user's parcels
  { path: "role", select: "name permissions" }, // If user has a role or permissions
  { path: "logs", populate: { path: "handledBy", select: "username" } }, // Populate logs if any
];

// Fields for populating log-related references
export const LOG_POPULATE_FIELDS = [
  { path: "userId", select: "username email" }, // Populate user who made the log
  { path: "parcelId", populate: PARCEL_POPULATE_FIELDS }, // Populate parcel related to the log
  { path: "orderId", populate: ORDER_POPULATE_FIELDS }, // Populate order related to the log
  { path: "handledBy", select: "username" }, // Who handled this log entry
];

// Fields for populating delivery agent-related references
export const DELIVERY_AGENT_POPULATE_FIELDS = [
  { path: "parcels", populate: PARCEL_POPULATE_FIELDS }, // Populate parcels assigned to the agent
  { path: "orders", populate: ORDER_POPULATE_FIELDS }, // Populate orders assigned to the agent
  { path: "user", select: "username email" }, // Populate delivery agent's user info
];
