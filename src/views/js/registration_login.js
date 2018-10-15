var cookieParser = require('cookie-parser');
var session = require('express-session');
var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var app = express();



/*Click functionality between the Login and register tabs
* using jquery to make it easier to do the DOM manipulation of showing
* and hiding tab panels and also because I found a nice code snippet online ;-)*/
$(function () {
    $('#login-form-link').click(function  (e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
    $('#register-form-link').click(function (e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
});


function loginSubmit() {

}






