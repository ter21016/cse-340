-- Q1. Insert the following new record to the account table
INSERT INTO public.account (
        account_firstname,
        account_lastname,
        account_email,
        account_password
    )
VALUES (
        Tony,
        Stark,
        tony @starkent.com Iam1ronM @n
    );
-- Q2: Modify the Tony Stark record to change the account_type to "Admin"
UPDATE public.account
SET account_type = 'Admin'::account_type
WHERE account_firstname = 'Tony'
    AND account_lastname = 'Stark';
--Q3 Delete the tony stark record from the database
DELETE FROM public.account
WHERE account_firstname = 'Tony'
    AND account_lastname = 'Stark';
--Q4 Modify the "GM Hummer" record to read "a huge interior"
UPDATE public.inventory
SET inv_description = REPLACE(
        inv_description,
        'small interiors',
        'a huge interior'
    )
WHERE inv_make = 'GM'
    AND inv_model = 'Hummer';
--Q5 Use an inner join to select the make and model
--fields from the inventory table and the classification 
--name field from the classification table for inventory items that 
--belong to the "Sport" category. 
SELECT inv_make,
    inv_model,
    classification_name
FROM public.inventory
    INNER JOIN public.classification ON public.inventory.classification_id = public.classification.classification_id
WHERE classification_name = 'Sport';
--Q6 Update all records in the inventory table to add "/vehicles" to the middle of the file path in the inv_image 
--and inv_thumbnail columns using a single query. 
UPDATE public.inventory
SET inv_image = REPLACE(inv_thumbnail, '/images', '/images/vehicles');
-- Type: account_type 
-- DROP TYPE IF EXISTS public."account_type";
CREATE TYPE public."account_type " AS ENUM ('Client', 'Employee', 'Admin');
ALTER TYPE public."account_type " OWNER TO cse340j;