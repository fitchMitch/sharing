
class Family {
  constructor({
    familyName,
    kidsNumber = 0,
    adultsNumber = 0,
    familyMoneySpent= 0
  }) {
    this._familyName = familyName;
    this._kidsNumber = parseInt(kidsNumber);
    this._adultsNumber = parseInt(adultsNumber);
    this._familyMoneySpent = parseFloat(familyMoneySpent);
    this._familyDebt = 0;
  }
  get familyName() { return this._familyName}
  get kidsNumber() { return parseInt(this._kidsNumber)}
  get adultsNumber() { return parseInt(this._adultsNumber)}
  get familyMoneySpent() { return parseFloat(this._familyMoneySpent)}
  getFamilyDebt = () => parseFloat(this._familyDebt * 100) / 100

  setFamilyDebt(amount) { this._familyDebt = amount }

  spendMoney(money) { this._familyDebt += money; }

  nrOfPeople() { return this.adultsNumber + this.kidsNumber / 2}

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
