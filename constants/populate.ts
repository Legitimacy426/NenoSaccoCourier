// Fields for populating order-related references
export const ORDER_POPULATE_FIELDS = [
  { path: "customer", select: "username email" }, // Populate user info in orders
  {
    path: "parcels",

  }, // Populate parcel info with parcelType and delivery details

];

// Fields for populating parcel-related references
export const PARCEL_POPULATE_FIELDS = [
  { path: "senderId", select: "username email" },
  { path: "recipientId", select: "username email" },
  { path: "parcelType", select: "name description" }, // Populate parcelType info
];

// Fields for populating user-related references
export const USER_POPULATE_FIELDS = [
  { path: "orders", populate: ORDER_POPULATE_FIELDS }, // Populate user's orders
  { path: "parcels", populate: PARCEL_POPULATE_FIELDS }, // Populate user's parcels

];



// Fields for populating delivery agent-related references
export const DELIVERY_AGENT_POPULATE_FIELDS = [
  { path: "parcels", populate: PARCEL_POPULATE_FIELDS }, // Populate parcels assigned to the agent
  { path: "orders", populate: ORDER_POPULATE_FIELDS }, // Populate orders assigned to the agent
  { path: "user", select: "username email" }, // Populate delivery agent's user info
];
