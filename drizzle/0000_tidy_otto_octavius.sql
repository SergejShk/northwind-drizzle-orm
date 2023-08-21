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
	"ID" serial PRIMARY KEY NOT NULL,
	"EmployeeID" text,
	"TerritoryID" text
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
	"ID" serial PRIMARY KEY NOT NULL,
	"OrderID" text,
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
	"UnitsOnOrder" text,
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
DO $$ BEGIN
 ALTER TABLE "emplyee_territories" ADD CONSTRAINT "emplyee_territories_EmployeeID_employees_EmployeeID_fk" FOREIGN KEY ("EmployeeID") REFERENCES "employees"("EmployeeID") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "emplyee_territories" ADD CONSTRAINT "emplyee_territories_TerritoryID_territories_TerritoryID_fk" FOREIGN KEY ("TerritoryID") REFERENCES "territories"("TerritoryID") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_details" ADD CONSTRAINT "order_details_OrderID_orders_OrderID_fk" FOREIGN KEY ("OrderID") REFERENCES "orders"("OrderID") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_details" ADD CONSTRAINT "order_details_ProductID_products_ProductID_fk" FOREIGN KEY ("ProductID") REFERENCES "products"("ProductID") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_CustomerID_customers_CustomerID_fk" FOREIGN KEY ("CustomerID") REFERENCES "customers"("CustomerID") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_EmployeeID_employees_EmployeeID_fk" FOREIGN KEY ("EmployeeID") REFERENCES "employees"("EmployeeID") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_SupplierID_suppliers_SupplierID_fk" FOREIGN KEY ("SupplierID") REFERENCES "suppliers"("SupplierID") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_CategoryID_categories_CategoryID_fk" FOREIGN KEY ("CategoryID") REFERENCES "categories"("CategoryID") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "territories" ADD CONSTRAINT "territories_RegionID_regions_RegionID_fk" FOREIGN KEY ("RegionID") REFERENCES "regions"("RegionID") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
