// const pool = require("../database/")

// /* *****************************
//  *   Register new account
//  * *************************** */
// async function registerAccount(
//   account_firstname,
//   account_lastname,
//   account_email,
//   account_password
// ) {
//   try {
//     const sql =
//       "INSERT INTO account (account_firstname, account_lastname, account_email, account_password, account_type) VALUES ($1, $2, $3, $4, 'Client') RETURNING *"
//     return await pool.query(sql, [
//       account_firstname,
//       account_lastname,
//       account_email,
//       account_password,
//     ])
//   } catch (error) {
//     return error.message
    
//   }
// }

// /* **********************
//  *   Check for existing email
//  * ********************* */
// async function checkExistingEmail(account_email) {
//     try {
//         const sql = "SELECT * FROM public.account WHERE account_email = $1"
//         const { rowCount } = await pool.query(sql, [account_email])

//         return rowCount
//     } catch (error) {
//         return error.message
//     }
// }

// /* ********************************
// * Return account data using email address
// * ***************************** */
// async function getAccountByEmail (account_email) {
//   try {
//     const result = await pool.query(
//       'SELECT account_id, account_firstname, account_lastname, account_email, account_type, account_password FROM account WHERE account_email = $1',
//       [account_email])
//     return result.rows[0]
//   } catch (error) {
//     return new Error("No matching email found")
//   }
// }

// /* *****************************
//  * Return account data using account id
//  * ***************************** */
// async function getAccountById(account_id) {
//   try {
//     const result = await pool.query(
//       "SELECT account_id, account_firstname, account_lastname, account_email, account_type, account_password FROM account WHERE account_id = $1",
//       [account_id]
//     );
//     return result.rows[0];
//   } catch (error) {
//     return new Error("No matching email found")
//   }
// }


// async function updateAccount(account_id, account_firstname, account_lastname, account_email) {
//   try{
//     const sql = "UPDATE account SET account_firstname = $1, account_lastname = $2, account_email = $3 WHERE account_id = $4"
//     const result = await pool.query(sql, [account_firstname, account_lastname, account_email, account_id])
//     return result; // TODO: See what the requirement wants
//   } catch(error) {
//     return new Error("Update failed");
//   }

// }
// async function updatePassword(account_id, hashed_password) {
//   try{
//     const sql = "UPDATE account SET account_password = $1 WHERE account_id = $2"
//     const result = await pool.query(sql, [hashed_password, account_id])
//     return result; // TODO: See what the requirement wants
//   } catch(error) {
//     return new Error("Update password failed")
//   }

// }

// async function getAccountList() {
//   const sql = "SELECT account_id, account_firstname, account_lastname FROM public.account"
//     try {
//      const response = await pool.query(sql)
//      return response.rows;
//     }
//    catch(error) {
//     return new Error("Failed to get account list")
//   }
// }
 

// module.exports = { registerAccount, checkExistingEmail, getAccountByEmail, getAccountById, updateAccount, updatePassword, getAccountList };

const pool = require("../database/")

/* *****************************
 *   Register new account
 * *************************** */
async function registerAccount(
  account_firstname,
  account_lastname,
  account_email,
  account_password
) {
  try {
    const sql = `
      INSERT INTO account (
        account_firstname, 
        account_lastname, 
        account_email, 
        account_password, 
        account_type
      ) VALUES ($1, $2, $3, $4, 'Client') RETURNING *`
    const result = await pool.query(sql, [
      account_firstname,
      account_lastname,
      account_email,
      account_password,
    ])
    return result.rows[0]
  } catch (error) {
    console.error("Error in registerAccount:", error.message)
    return null
  }
}

/* **********************
 *   Check for existing email
 * ********************* */
async function checkExistingEmail(account_email) {
  try {
    const sql = "SELECT * FROM account WHERE account_email = $1"
    const { rowCount } = await pool.query(sql, [account_email])
    return rowCount > 0
  } catch (error) {
    console.error("Error in checkExistingEmail:", error.message)
    return false
  }
}

/* ********************************
 *  Return account data using email address
 * ***************************** */
async function getAccountByEmail(account_email) {
  try {
    const sql = `
      SELECT account_id, account_firstname, account_lastname, 
             account_email, account_type, account_password 
      FROM account 
      WHERE account_email = $1`
    const result = await pool.query(sql, [account_email])
    return result.rows[0]
  } catch (error) {
    console.error("Error in getAccountByEmail:", error.message)
    return null
  }
}

/* *****************************
 * Return account data using account id
 * ***************************** */
async function getAccountById(account_id) {
  try {
    const sql = `
      SELECT account_id, account_firstname, account_lastname, 
             account_email, account_type, account_password 
      FROM account 
      WHERE account_id = $1`
    const result = await pool.query(sql, [account_id])
    return result.rows[0]
  } catch (error) {
    console.error("Error in getAccountById:", error.message)
    return null
  }
}

/* *****************************
 * Update account details
 * ***************************** */
async function updateAccount(account_id, account_firstname, account_lastname, account_email) {
  try {
    const sql = `
      UPDATE account 
      SET account_firstname = $1, account_lastname = $2, account_email = $3 
      WHERE account_id = $4 RETURNING *`
    const result = await pool.query(sql, [
      account_firstname,
      account_lastname,
      account_email,
      account_id
    ])
    return result.rows[0]
  } catch (error) {
    console.error("Error in updateAccount:", error.message)
    return null
  }
}

/* *****************************
 * Update account password
 * ***************************** */
async function updatePassword(account_id, hashed_password) {
  try {
    const sql = `
      UPDATE account 
      SET account_password = $1 
      WHERE account_id = $2 RETURNING *`
    const result = await pool.query(sql, [hashed_password, account_id])
    return result.rows[0]
  } catch (error) {
    console.error("Error in updatePassword:", error.message)
    return null
  }
}

/* *****************************
 * Get list of all accounts
 * ***************************** */
async function getAccountList() {
  try {
    const sql = "SELECT account_id, account_firstname, account_lastname FROM account"
    const response = await pool.query(sql)
    return response.rows
  } catch (error) {
    console.error("Error in getAccountList:", error.message)
    return []
  }
}

module.exports = { 
  registerAccount, 
  checkExistingEmail, 
  getAccountByEmail, 
  getAccountById, 
  updateAccount, 
  updatePassword, 
  getAccountList 
}
