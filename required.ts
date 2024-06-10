const bundles = {
  sid: "BUfd896ebb131389ec7ccae34d122e3a48",
  status: "draft",
  valid_until: null,
  email: "anpeteran2@gmail.com",
  status_callback: null,
  regulation_sid: "RN61b6f858c1a0b46ae2631346138a283c",
  friendly_name: "Friendly Name",
  // nice to link
  links: {
    evaluations:
      "https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/BUfd896ebb131389ec7ccae34d122e3a48/Evaluations",
    item_assignments:
      "https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/BUfd896ebb131389ec7ccae34d122e3a48/ItemAssignments",
    bundle_copies:
      "https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/BUfd896ebb131389ec7ccae34d122e3a48/Copies",
  },
  date_created: "2024-06-07T01:06:32Z",
  date_updated: "2024-06-07T01:06:32Z",
};

const endUser = {
  sid: "ITbb7c8d05759998698f544229dfafb178",
  friendly_name: "Peter An",
  type: "business",
  attributes: {
    phone_number: "+64279709299",
    first_name: "Peter",
    last_name: "An",
    business_identity: "INDEPENDENT_SOFTWARE_VENDOR",
    business_website: "https://exoticasoftware.dev",
    comments: "",
    is_subassigned: "NO",
    business_registration_number: "3948327023",
    business_name: "Exotica Software",
    business_registration_identifier: "UK:CRN",
    email: "anpeteran2@gmail.com",
  },
};

const address = {
  sid: "AD323620d3b0257e905ebe21a3ee385464",
  friendly_name: "Peter ezyVet test 2 - Address",
  customer_name: null,
  street: "158 Coronation Rd",
  street_secondary: "",
  city: "Hillcrest",
  region: "Auckland",
  postal_code: "0627",
  iso_country: "NZ",
  date_created: "Wed, 05 Jun 2024 22:00:53 +0000",
  date_updated: "Wed, 05 Jun 2024 22:00:53 +0000",
};

const itemAssignment = {
  sid: "BV93d1f0f004a7d4d631654437a3ac73d5",
  object_sid: "RD43a53d6859d246988f2f19e905b4445d", // linked sid
  bundle_sid: "BU768b0d5c9c00fe6779b0542519cb62f3",
  date_created: "2024-06-07T00:19:24Z",
};

const supportingDocument = {
  sid: "RDb5aa483b289f5e2b89c2a927df1fb6e1",
  friendly_name: "Peter ezyVet Bundle - Emergency Address",
  attributes: {
    address_sids: ["AD53fbfe0f5b98a467fcb1cebbb4bd8c6d"],
  },
  failure_reason: null,
  type: "emergency_address", // business_address or emergency_address
  mime_type: null,
  date_created: "2024-06-07T01:04:37Z",
  date_updated: "2024-06-07T01:04:37Z",
};
