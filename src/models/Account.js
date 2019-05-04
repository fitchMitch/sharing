import _ from 'lodash';

class Account {
  constructor(remainingMoney) {
    this._remainingMoney = remainingMoney;
    this._families = [];
    this._moneySpent = -remainingMoney;
    this._operations = [];
  }

  get remainingMoney () { return parseInt(this._remainingMoney)}
  get families () { return parseInt(this._families)}
  get moneySpent () { return parseInt(this._moneySpent)}
  get operations () { return parseInt(this._operations)}

  // reset() {
  //   this._operations = [];
  //   this._moneySpent = -this.remainingMoney;
  //   for (let family in this._families) {
  //     this._moneySpent += family.familyMoneySpent;
  //   }
  //   return;
  // }

  addFamily(family) {
    this._families.push(family);
    this._moneySpent += family.familyMoneySpent;
    return;
  }

  countingPeople() {
    const reducer = (acc,family) => acc + family.nrOfPeople()
    return this._families.reduce(reducer,0)
  }

  averageMoneySpentPerPerson() {
    if (this.countingPeople() === 0) {
      return this.moneySpent;
    }

    return this.moneySpent / this.countingPeople();
  }

  setFamiliesDebt(){
    for (let family of this._families) {
      family.setFamilyDebt(this.computeFamilyDebt(family))
    }
    return true;
  }

  computeFamilyDebt(family) {
    return this.averageMoneySpentPerPerson() * family.nrOfPeople() - family.familyMoneySpent
  }

  giveMoney({money, creditFamily, debitFamily}) {
    debitFamily.spendMoney(money);
    creditFamily.spendMoney(-money);
    return true;
  }

  writeOperation({money, creditFamily, debitFamily}) {
    if (money > 0){
      this._operations.push({ money, creditFamily, debitFamily});
    } else {
      console.log('error when writing')
    }
    return true;
  }

  familiesDebtReorganize() {
    this._families = _.sortBy(this._families, family => family.getFamilyDebt())
    return true;
  }

  operationsMaterial() {
    let material = [];
    for (let operation of this._operations) {
      material.push({
        debitFamily: operation.debitFamily._familyName,
        word: 'gives',
        money: operation.money,
        creditFamily: operation.creditFamily._familyName
      });
    }
    return material;
  }
  showFamilies(){
    return (this._families.map(family => family.showFamily()));
  }

  check(){
    const reducer = (acc,family) => acc +  this.computeFamilyDebt(family)
    return this._families.reduce(reducer,0)
  }

  getGeneralDetails(){
    return {
      totalCost: this._moneySpent,
      averageCostPerPerson: this.averageMoneySpentPerPerson()
    }
  }
  resetBook(){
    this._operations = []
    return true;
  }

  resolve() {
    this.resetBook() && this.setFamiliesDebt() && this.familiesDebtReorganize();
    if (Math.abs(this.check()) > 0.01){
      console.log("wrong computation")
      return {};
    }
    let familiesNr = this._families.length;
    while(this._families[0].getFamilyDebt() < -0.01 ){
      let amount = Math.min(
        - this._families[0].getFamilyDebt(),
        this._families[familiesNr-1].getFamilyDebt()
      );
      let operation = {
        money: amount,
        creditFamily: this._families[familiesNr-1],
        debitFamily: this._families[0]
      }
      this.giveMoney(operation) && this.writeOperation(operation);
      this.familiesDebtReorganize();
    }

    return {
      operations: this.operationsMaterial(),
      generalDetails: this.getGeneralDetails()
    }
  }
}

export default Account;
