'use strict'
var CollectionObj = function(timeGetCash, cashType, periodServ, day, cashLen, mainPepCont, workdayFirst, workdaySecond,
    saturdayFirst, saturdaySecond, sundayFirst, sundaySecond, typeCity, typeAdress, nameCityPoint,
    street, numberHouse, corpusHouse, servIt, id, idPerson) {
    this.timeGetCash = timeGetCash;
    this.cashType = cashType;
    this.periodServ = periodServ;

    this.day = day;
    this.cashLen = cashLen;

    this.mainPepCont = mainPepCont;

    this.workdayFirst = workdayFirst;
    this.workdaySecond = workdaySecond;

    this.saturdayFirst = saturdayFirst;
    this.saturdaySecond = saturdaySecond;

    this.sundayFirst = sundayFirst;
    this.sundaySecond = sundaySecond;

    this.typeCity = typeCity;
    this.typeAdress = typeAdress;

    this.nameCityPoint = nameCityPoint;
    this.street = street;

    this.numberHouse = numberHouse;
    this.corpusHouse = corpusHouse;
    this.servIt = servIt;

    this.id = id;
    this.idPerson = idPerson;
};

var CollectionApp = function(typeInp, otherText, bankIt, inn, kpp, fullNameOrg, phoneForm, numberItem,
    bik, numberCorrect, numberSwift, otherRec, collectionObjs, id, idPerson, date, number) {
    this.typeInp = typeInp;
    this.otherText = otherText;
    this.bankIt = bankIt;

    this.inn = inn;
    this.kpp = kpp;

    this.fullNameOrg = fullNameOrg;

    this.phoneForm = phoneForm;
    this.numberItem = numberItem;

    this.bik = bik;
    this.numberCorrect = numberCorrect;

    this.numberSwift = numberSwift;
    this.otherRec = otherRec;

    this.collectionObjs = collectionObjs;
    this.date = date;
    this.number = number;

    this.id = id;
    this.idPerson = idPerson;
};