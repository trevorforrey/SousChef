import unitLookup from './unit_lookup';

async function getCustomUnitResponse(ingredientName, unit){
    //console.log(ingredientName)
    //console.log(unit)
    var unitConvert = require('convert-units');
    //let recipe_doc = await get_recipe("Todd's Favorite Blueberry Pancakes");
    let ingredientInfo = ingredientName;
    //console.log(ingredientInfo)
    if (ingredientInfo == null) {
        return "The recipe doesn't call for " + ingredientName + ".";
    }
    let amount = ingredientInfo.quantity;
    let origUnit = ingredientInfo.unit;
    let newAmount = null;
    let newUnitShort = null;
    let origUnitShort = null;
    try{
        newUnitShort = await unitLookup(unit);
        origUnitShort = await unitLookup(origUnit);

        //If the client or recipe said 'ounces' we need to determine
        //whether they meant the volume measure or the mass measure.
        if (newUnitShort === 'oz') {
            if (unitConvert.possibilites('mass').indexOf(origUnitShort) < 0) {
                newUnitShort = 'fl-oz'
            }
        //In the case that they both mean fluid ounces, conversion won't be an issue, and
        // Sue should reply back with "ounces" rather than "fluid oounces" to be on the 
        // safe side
        } else if (origUnitShort === 'oz') {
            if (unitConvert.possibilites('mass').indexOf(newUnitShort) < 0){
                origUnitShort = 'fl-oz'
            }
        }

        //console.log(newUnitShort)
        //console.log(origUnitShort)
        newAmount = unitConvert(amount).from(origUnitShort).to(newUnitShort).toPrecision(3);
    } catch (e){
        console.log('unable to convert ' + origUnit + ' to ' + unit + '.');
        return ("I'm sorry, I was unable to convert " + origUnit + " to " + unit + ".");
    }
    let plural = (newAmount != 1);
    let unitDesc = unitConvert().describe(newUnitShort)
    let unitNamePretty = null;
    if (plural){
        unitNamePretty = unitDesc.plural
    } else {
        unitNamePretty = unitDesc.singular
    }
    unitNamePretty = unitNamePretty.toLowerCase()

    return "The recipe calls for " + newAmount + " " + unitNamePretty + " of " + ingredientName;
    

}

export default getCustomUnitResponse;