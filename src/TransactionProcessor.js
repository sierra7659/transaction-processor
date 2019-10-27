class TransactionProcessor {
  // QUESTION: COMPLETE ALL CLASS FUNCTIONS TO PASS THE TESTS

  constructor(transactions) {
    this.transactions = transactions;
  }

  print(tx) {
    console.log(
      `ID: ${tx.id} - Brand: ${tx.brand} - Currency: ${tx.currency} - Amount: ${tx.amount}`
    );
  }

  // Check valid transactions rules
   static isValidTransaction(transaction) {

    // Valid is a flag 
    var valid = false;

    // Check valid fields
    if(transaction && (transaction.amount >= 0) && (transaction.id >= 0)){
      
      if(transaction.brand === 'visa' || transaction.brand === 'mastercard' || transaction.brand === 'amex'){
        
        if(transaction.currency === 'EUR' || transaction.currency === 'GBP' || transaction.currency === 'USD'){
          
          // If everything is OK flag is equal to true
          valid = true;

        }
      }
    }

    return valid;
  }

  // Remove invalid transactions
  filterInvalidTransactions() {

    if(this.transactions && this.transactions.length > 0){
      
      //Check all transactions
      this.transactions = this.transactions.filter(transaction => TransactionProcessor.isValidTransaction(transaction)); 
      
      return this; 
    }
  }

  // Return transactions of given currency
  getTransactionsByCurrency(currency) {
    
    this.transactions = this.transactions.filter(transaction => transaction.currency == currency);
    
    return this;
  }

  // Return transactions of given brand
  getTransactionsByBrand(brand) {
    
    this.transactions = this.transactions.filter(transaction => transaction.brand == brand);
    
    return this;
  }

  // BONUS:
  // Apply multiple filters. Filters parameter should be an array of functions (predicates)
  filterTransaction(filters) {

    //Get just valid Transactions
    this.filterInvalidTransactions();
    

    if(this.transactions && this.transactions.length > 0){

      var transactionsFiltered = [];
      
      //Apply every filter 
      filters.map(filter => {
        transactionsFiltered = this.transactions.filter(filter);
      });
      
      //Assign value to old Transactions
      this.transactions = transactionsFiltered;
      
      return this;
    }
  }

  // Return the total amount of current transactions array
  sum() {

    if (this.transactions && this.transactions.length > 0) {

      //Get valid transactions
      this.transactions = this.filterInvalidTransactions().transactions;
      
      // Return the total amount in float
      var result =  this.transactions.reduce((pre,cur) => {
        return {amount: pre.amount + cur.amount};
      });

      // Fix to 2
      return parseFloat(result.amount.toFixed(2));
    }

    //If there aren`t transactions
    else {
      return 0;
    }
  }
}

module.exports = TransactionProcessor;
