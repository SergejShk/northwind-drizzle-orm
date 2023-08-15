CREATE TABLE IF NOT EXISTS "customers" (
	"CustomerID" serial PRIMARY KEY NOT NULL,
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
	"EmployeeID" serial PRIMARY KEY NOT NULL,
	"CompanyName" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "employees" (
	"EmployeeID" serial PRIMARY KEY NOT NULL,
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
	"OrderID" serial PRIMARY KEY NOT NULL,
	"ProductID" text,
	"UnitPrice" text,
	"Quantity" text,
	"Discount" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"OrderID" serial PRIMARY KEY NOT NULL,
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
CREATE TABLE IF NOT EXISTS "prodacts" (
	"ProductID" serial PRIMARY KEY NOT NULL,
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
	"RegionID" serial PRIMARY KEY NOT NULL,
	"RegionDescription" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "shippers" (
	"ShipperID" serial PRIMARY KEY NOT NULL,
	"CompanyName" text,
	"Phone" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "suppliers" (
	"SupplierID" serial PRIMARY KEY NOT NULL,
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
	"TerritoryID" serial PRIMARY KEY NOT NULL,
	"TerritoryDescription" text,
	"RegionID" text
);
