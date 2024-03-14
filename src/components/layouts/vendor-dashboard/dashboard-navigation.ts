import duotone from "icons/duotone";

export const navigation = [
  { type: "label", label: "Admin" },
  {
    name: "Products",
    icon: duotone.Products,
    children: [
      { name: "Product List", path: "/admin/products" },
      { name: "Create Product", path: "/admin/products/create" },
      { name: "Product Reviews", path: "/admin/products/reviews" }
    ]
  },

  {
    name: "Categories",
    icon: duotone.Accounts,
    children: [
      { name: "Category List", path: "/admin/categories" },
      { name: "Create Category", path: "/admin/categories/create" }
    ]
  },

  {
    name: "Brands",
    icon: duotone.Apps,
    children: [
      { name: "Brand List", path: "/admin/brands" },
      { name: "Create Brand", path: "/admin/brands/create" }
    ]
  },

  {
    name: "Orders",
    icon: duotone.Order,
    children: [
      { name: "Order List", path: "/admin/orders" },
      {
        name: "Order Details",
        path: "/admin/orders/f0ba538b-c8f3-45ce-b6c1-209cf07ba5f8"
      }
    ]
  },

  { name: "Customers", icon: duotone.Customers, path: "/admin/customers" },

  {
    name: "Refunds",
    icon: duotone.Refund,
    children: [
      { name: "Refund Request", path: "/admin/refund-request" },
      { name: "Refund Settings", path: "/admin/refund-setting" }
    ]
  },

  {
    name: "Sellers",
    icon: duotone.Seller,
    children: [
      { name: "Seller List", path: "/admin/sellers" },
      { name: "Seller Package", path: "/admin/seller-package" },
      { name: "Package Payments", path: "/admin/package-payments" },
      { name: "Earning History", path: "/admin/earning-history" },
      { name: "Payouts", path: "/admin/payouts" },
      { name: "Payout Request", path: "/admin/payout-requests" }
    ]
  },
  { name: "Logout", icon: duotone.Session, path: "/" }
];
