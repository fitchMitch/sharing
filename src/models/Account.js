import _ from 'lodash';

class Account {
  constructor(remainingMoney) {
    this._remainingMoney = remainingMoney;
    this._families = [];
    this._moneySpent = -remainingMoney;
    this._operations = [];
  }

  get remainingMoney () { return this._remainingMoney}
  get families () { return this._families}
  get moneySpent () { return this._moneySpent}
  get operations () { return this._operations}

  reset() {
    this._operations = [];
    this._moneySpent = -this.remainingMoney;
    for (let family in this._families) {
      this._moneySpent += family._familyMoneySpent;
    }
    return;
  }

  addFamily(family) {
    this._families.push(family);
    this._moneySpent += family._familyMoneySpent;
    return;
  }

  countingPeople() {
    let count = 0;
    this.families.each( family => {
      count += family.nrOfPeople();
    });
    return count;
  }

  averageMoneyPerPerson() {
    if (this.countingPeople() === 0) {
      return this.moneySpent;
    }

    return this.moneySpent / this.countingPeople();
  }

  familyDebt(family) {
    return this.averageMoneyPerPerson() * family.nrOfPeople() - family.familyMoneySpent
  }

  giveMoney({money, creditFamily, debitFamily}) {
    debitFamily.familyAccount.moveMoney(money);
    creditFamily.familyAccount.moveMoney(-money);
    this.operations.push({money,creditFamily,debitFamily});
    return;
  }

  familiesReorganize() {
    this._families = _.sortBy(this.families, family => family.familyDebt())
    return;
  }

  operationsMaterial() {
    let material = [];
    for (let operation in this.operations) {
      material.push({
        debitfamily: operation.debitfamily.familyName,
        word: 'gives',
        money: operation.money,
        creditfamily: operation.creditfamily.familyName
      });
    }
    return material;
  }
  showFamilies(){
    return (this._families.map(family => family.showFamily()));
  }

  resolve() {
    for(let i =0 ; i < this.familiesReorganize().length -1;i++){
      if (this.families[i].familyDebt() > 0.01){
        this.giveMoney({
          money: this.family[i].getDebt(),
          creditFamily: this.family[i],
          debitFamily: this.family[i+1]})
      }
      // maybe this.familiesReorganize()
    };
    return this.operationsMaterial();
  }
}

export default Account;
