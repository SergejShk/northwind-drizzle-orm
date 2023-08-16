import { pgTable, text } from "drizzle-orm/pg-core";

const employees = pgTable('employees', {
    EmployeeID: text('EmployeeID').primaryKey(),
    LastName: text('LastName'),
    FirstName: text('FirstName'),
    Title: text('Title'),
    TitleOfCourtesy: text('TitleOfCourtesy'),
    BirthDate: text('BirthDate'),
    HireDate: text('HireDate'),
    Address: text('Address'),
    City: text('City'),
    Region: text('Region'),
    PostalCode: text('PostalCode'),
    Country: text('Country'),
    HomePhone: text('HomePhone'),
    Extension: text('Extension'),
    Notes: text('Notes'),
    ReportsTo: text('ReportsTo'),
});

export default employees
