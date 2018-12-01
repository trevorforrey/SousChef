//Common pop-up dialog for upload and update recipe.
function popUpMessage(divID,message,isError,id){
    
    var modal = document.getElementById(id); 
    modal.style.display = "block";
    var modelPopUpContentCss = "<p class=\"modal-content\" style=\"text-align: center;width: 297px;padding-top: -10px;color: #eee;font-size: 14px;border-bottom-width: 20px;margin-bottom: 0px;padding-top: 0px;\"> <img src=\"";
    var image;
    if(isError){
        image = "../img/error.png\">&nbsp;";
    }else{
       image =  "../img/green_tick.png\">&nbsp;";
    }
    document.getElementById(divID).innerHTML = modelPopUpContentCss + image + message + "</p>";
    
    setTimeout(function() {
        modal.style.display = "none";
        if(id.includes("upload")){
            location.reload();
        }
    }, 3000); 
    
}

//Common validate recipe function for update and upload.
function validateRecipe(popUpDiv,inputClass,popUpID){
    if($(inputClass).val() == '' || undefined == $(inputClass).val()){
       popUpMessage(popUpDiv,"Recipe cannot have empty fields",true,popUpID);
        return false;
    }else{
        return true;
    }
}

//Object comparator
function compare(obj1, obj2) {
    var result = false;
    /*for(key in obj1) {
        if(obj2[key] != obj1[key]) result[key] = obj2[key];
        if(typeof obj2[key] == 'array' && typeof obj1[key] == 'array') 
            result[key] = arguments.callee(obj1[key], obj2[key]);
        if(typeof obj2[key] == 'object' && typeof obj1[key] == 'object') 
            result[key] = arguments.callee(obj1[key], obj2[key]);
    } */
    if(JSON.stringify(obj1) === JSON.stringify(obj2)){
        result = true
    }
    return result;
}