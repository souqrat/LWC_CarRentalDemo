public with sharing class RentalManagement {

    @AuraEnabled
    public static List<Car__c> getAllCars() {
        List<Car__c> cars = [
            SELECT  Id, Name, Account__r.Name, Price__c, Picture__c
            FROM    Car__c
        ];
        return cars;
    }

    @AuraEnabled
    public static List<Car__c> getAvailableCars(String carType, Integer minPrice, Integer maxPrice) {
        List<Car__c> cars = [
            SELECT  Id, Name, Account__r.Name, Price__c, Picture__c
            FROM    Car__c
            WHERE   Type__c = :carType
            AND     Price__c >= :minPrice
            AND     Price__c <= :maxPrice
        ];
        return cars;
    }

}
