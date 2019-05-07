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

  addFamily(family) {
    this._families.push(family);
    this._moneySpent += family.familyMoneySpent;
    return;
  }

  // countingPeople() {
  //   const reducer = (acc,family) => acc + family.nrOfPeople()
  //   return this._families.reduce(reducer,0)
  // }

  averageMoneySpentPerPerson() {
    const reducer = (acc,family) => acc + family.nrOfPeople()
    const peopleNr =  this._families.reduce(reducer,0)
    if (this.peopleNr === 0) {
      return this.moneySpent;
    }

    return this.moneySpent / peopleNr;
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
    this._families.map(family => family.showFamily())
  }
  stateFamilies(){
    return (this._families.map(family => {
      return {[family.familyName]: family.showFamily()}
    }));
  }

  familiesFromState(state){
    Object.values(state)
  }

  checkTotalDebtAmount(){
    const reducer = (acc,family) => acc +  this.computeFamilyDebt(family)
    return this._families.reduce(reducer,0)
  }

  getGeneralDetails(){
    return {
      totalCost: this._moneySpent,
      averageCostPerPerson: this.averageMoneySpentPerPerson()
    }
  }
  findFamilyByName(name){
    return _.find(this._families,{familyName: name});
  }

  findFamilyDetails(name){
    let family =  this.findFamilyByName(name);
    return({
      familyName : family.familyName,
      adultsNumber : family.adultsNumber,
      kidsNumber : family.kidsNumber,
      familyMoneySpent : family.familyMoneySpent
    })
  }

  deleteFamily(name){
    let familyTarget = this.findFamilyByName(name)
    this._moneySpent -= familyTarget.familyMoneySpent;
    this._families = _.reject(this._families,{_familyName: name})
  }

  resetBook(){
    this._operations = []
    return true;
  }

  resolve() {
    this.resetBook() && this.setFamiliesDebt() && this.familiesDebtReorganize();
    if (Math.abs(this.checkTotalDebtAmount()) > 0.01){
      console.log("wrong computation")
      console.log(this);
      return false;
    }
    let familiesNr = this._families.length;
    // -------------------
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
    // -------------------

    return {
      operations: this.operationsMaterial(),
      generalDetails: this.getGeneralDetails()
    }
  }
}

export default Account;
