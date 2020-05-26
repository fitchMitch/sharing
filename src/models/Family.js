
class Family {
  static people =['daniel', 'helen', 'elliot', 'steve', 'jenny']
  constructor({
    familyName,
    kidsNumber = 0,
    adultsNumber = 0,
    familyMoneySpent= 0,
    avatar= this.getRandomAvatar()
  }) {
    this._familyName = familyName;
    this._kidsNumber = parseInt(kidsNumber);
    this._adultsNumber = parseInt(adultsNumber);
    this._familyMoneySpent = parseFloat(familyMoneySpent);
    this._familyDebt = 0;
    this._avatar = avatar;
  }
  get familyName() { return this._familyName}
  get kidsNumber() { return parseInt(this._kidsNumber)}
  get adultsNumber() { return parseInt(this._adultsNumber)}
  get familyMoneySpent() { return parseFloat(this._familyMoneySpent)}
  get avatar() { return this._avatar }
  getFamilyDebt = () => parseFloat(this._familyDebt * 100) / 100

  setFamilyDebt(amount) { this._familyDebt = amount }

  spendMoney(money) { this._familyDebt += money; }

  nrOfPeople() { return this.adultsNumber + this.kidsNumber / 2}

  getRandomAvatar(){
    return Family.people[Math.floor(Math.random() * Family.people.length)]
  }

  showFamily(){
    return ({
      familyName: this._familyName,
      kidsNumber: this._kidsNumber,
      adultsNumber: this._adultsNumber,
      familyMoneySpent: this._familyMoneySpent,
      avatar: this._avatar,
      nrOfPeople: this.nrOfPeople()
    });
  }
}
export default Family;
