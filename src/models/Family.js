
class Family {
  constructor({
    familyName,
    kidsNumber,
    adultsNumber,
    familyMoneySpent
  }) {
    this._familyName = familyName;
    this._kidsNumber = kidsNumber;
    this._adultsNumber = adultsNumber;
    this._familyMoneySpent = familyMoneySpent;
    this._familyAccount = 0;
  }
  get familyName() { return this._familyName}
  get kidsNumber() { return this._kidsNumber}
  get adultsNumber() { return this._adultsNumber}
  get familyMoneySpent() { return this._familyMoneySpent}
  get familyAccount() { return this._familyAccount}

  nrOfPeople() { return this._adultsNumber + this._kidsNumber / 2}

  moveMoney(money) {
    this._familyAccount += money;
  }

  showFamily(){
    return ({
      familyName: this._familyName,
      kidsNumber: this._kidsNumber,
      adultsNumber: this._adultsNumber,
      familyMoneySpent: this._familyMoneySpent,
      nrOfPeople: this.nrOfPeople()
    });
  }
}
export default Family;
