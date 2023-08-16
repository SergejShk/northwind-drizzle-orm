CREATE TABLE IF NOT EXISTS "categories" (
	"CategoryID" text PRIMARY KEY NOT NULL,
	"CategoryName" text,
	"Description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "customers" (
	"CustomerID" text PRIMARY KEY NOT NULL,
	"CompanyName" text,
	"ContactName" text,
	"ContactTitle" text,
	"Address" text,
	"City" text,
	"Region" text,
	"PostalCode" text,
	"Country" text,
	"Phone" text,
	"Fax" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "emplyee_territories" (
	"EmployeeID" text PRIMARY KEY NOT NULL,
	"CompanyName" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "employees" (
	"EmployeeID" text PRIMARY KEY NOT NULL,
	"LastName" text,
	"FirstName" text,
	"Title" text,
	"TitleOfCourtesy" text,
	"BirthDate" text,
	"HireDate" text,
	"Address" text,
	"City" text,
	"Region" text,
	"PostalCode" text,
	"Country" text,
	"HomePhone" text,
	"Extension" text,
	"Notes" text,
	"ReportsTo" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order_details" (
	"OrderID" text PRIMARY KEY NOT NULL,
	"ProductID" text,
	"UnitPrice" text,
	"Quantity" text,
	"Discount" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"OrderID" text PRIMARY KEY NOT NULL,
	"CustomerID" text,
	"EmployeeID" text,
	"OrderDate" text,
	"RequiredDate" text,
	"ShippedDate" text,
	"ShipVia" text,
	"Freight" text,
	"ShipName" text,
	"ShipAddress" text,
	"ShipCity" text,
	"ShipRegion" text,
	"ShipPostalCode" text,
	"ShipCountry" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"ProductID" text PRIMARY KEY NOT NULL,
	"ProductName" text,
	"SupplierID" text,
	"CategoryID" text,
	"QuantityPerUnit" text,
	"UnitPrice" text,
	"UnitsInStock" text,
	"ReorderLevel" text,
	"Discontinued" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "regions" (
	"RegionID" text PRIMARY KEY NOT NULL,
	"RegionDescription" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "shippers" (
	"ShipperID" text PRIMARY KEY NOT NULL,
	"CompanyName" text,
	"Phone" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "suppliers" (
	"SupplierID" text PRIMARY KEY NOT NULL,
	"CompanyName" text,
	"ContactName" text,
	"ContactTitle" text,
	"Address" text,
	"City" text,
	"Region" text,
	"PostalCode" text,
	"Country" text,
	"Phone" text,
	"Fax" text,
	"HomePage" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "territories" (
	"TerritoryID" text PRIMARY KEY NOT NULL,
	"TerritoryDescription" text,
	"RegionID" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "test" (
	"TestID" text PRIMARY KEY NOT NULL,
	"firstName" text,
	"lastName" text
);
