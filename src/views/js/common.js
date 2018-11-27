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