INSERT INTO public.account (
        account_firstname,
        account_lastname,
        account_email,
        account_password,
        account_type
    )
VALUES (
        'Basic',
        'Client',
        'basic@340.edu',
        'I@mABas1cCl!3nt',
        DEFAULT
    ),
    (
        'Happy',
        'Employee',
        'happy@340.edu',
        'I@mAnEmpl0y33',
        'Employee'
    ),
    (
        'Manager',
        'User',
        'manager@340.edu',
        'I@mAnAdm!n1strat0r',
        'Admin'
    );