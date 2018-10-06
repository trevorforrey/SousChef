
//A lookup table for the unit conversion library im using
var unitLookupDict = {
    "CUBIC MILLIMETER": 'mm3',
    "CUBIC MILLIMETERS": 'mm3',
    "TABLESPOON": 'Tbs',
    "TABLESPOONS": 'Tbs',
    "TBSP": 'Tbs',
    "TSP": 'tsp',
    "TEASPOON": 'tsp',
    'TEASPOONS': 'tsp',
    "MILLILITER": 'ml',
    "MILLILITERS": 'ml',
    "LITER": 'l',
    "LITERS": 'l',
    "FLUID OUNCE": 'fl-oz',
    "FLUID OUNCES": 'fl-oz',
    'CUP': 'cup',
    'CUPS': 'cup',
    'PINT': 'pnt',
    'PINTS': 'pnt',
    'QUART': 'qt',
    'QUARTS': 'qt',
    "GAL": 'gal',
    'GALLON': 'gal',
    'GALLONS': 'gal',
    'GRAM': 'g',
    'GRAMS': 'g',
    'KILOGRAM': 'kg',
    'KILOGRAMS': 'kg',
    'KILO': 'kg',
    'KILOS': 'kg',
    'POUND': 'lb',
    'POUNDS': 'lb',
    //I'm going to assume that if a customer says 'ounces', they don't mean fluid ounces.
    // This will have to be double-checked in code.
    'OUNCE': 'oz',
    'OUNCES': 'oz'
}

async function unitLookup(unitName){
    return unitLookupDict[unitName.toUpperCase()];
}

export default unitLookup;
