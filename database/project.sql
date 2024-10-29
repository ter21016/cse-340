-- Alter classification table to enable approve colummn
ALTER TABLE public.classification
ADD classification_approval boolean NOT NULL DEFAULT FALSE,
    ADD account_id INTEGER DEFAULT NULL,
    ADD approval_date TIMESTAMP DEFAULT NULL;
-- Alter inventory table to enable approve colummn
ALTER TABLE public.inventory
ADD inv_approval boolean NOT NULL DEFAULT FALSE,
    ADD account_id INTEGER DEFAULT NULL,
    ADD approval_date TIMESTAMP DEFAULT NULL;
-- Update classification_approval to true
UPDATE public.classification
SET classification_approval = TRUE,
    account_id = 3,
    approval_date = CURRENT_TIMESTAMP;
-- Update inv_approval to true
UPDATE public.inventory
SET inv_approval = TRUE,
    account_id = 3,
    approval_date = CURRENT_TIMESTAMP;