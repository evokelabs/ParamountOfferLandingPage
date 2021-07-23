// API Submit New Email Address: https://0f21n2zlzg.execute-api.ap-southeast-2.amazonaws.com/Dev/register_trial_user
// API Resend Trial Offer: https://0f21n2zlzg.execute-api.ap-southeast-2.amazonaws.com/Dev/resend_trial_user_email

//Set up DOM variables

//Assign Email Form - Field Variables
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const email = document.getElementById('email');
const emailTrial = document.getElementById('email-trial');
const mobile = document.getElementById('mobile');

//Assign Email Form - Input Variables
var firstNameString = document.getElementById('first-name').value;
var lastNameString = document.getElementById('last-name').value;
var emailString = document.getElementById('email').value;
var emailTrialString = document.getElementById('email-trial').value;
var mobileNumber = document.getElementById('mobile').value;
var TermsConditionsCheck = document.getElementById('TermsConditions-checkbox');

//Assign Email Form - Feedback Areas (Forms)
const firstNameFeedback = document.getElementById('first-name').parentElement.childNodes[3];
const lastNameFeedback = document.getElementById('last-name').parentElement.childNodes[3];
const emailFeedback = document.getElementById('email').parentElement.childNodes[3];
const mobileFeedback = document.getElementById('email-trial').parentElement.childNodes[3];
const emailTrialFeedback = document.getElementById('email-trial').parentElement.childNodes[3];

//Assign Buttons - Feedback Areas (Buttons)
const emailsubmitFeedback = document.getElementById('submit-feedback');
const trailsubmitFeedback = document.getElementById('trial-feedback');

//Assign Buttons
const submitEmailButton = document.getElementById('submit-email-button');
const emailTrialButton = document.getElementById('email-trial-submit');

//Create Trial Dummy JSON
var data2 = {
    email: 'test@email.com'
}

//Set up event methods
//Button 1 (Sign Up Email) Enabled 
submitEmailButton.addEventListener('click', signupEmailButton)

//Button 2 (Check for Email Trial) Enabled 
emailTrialButton.addEventListener('click', checkTrialButton)

//Checkbox Remove invalid classlist when click
TermsConditionsCheck.addEventListener('click', removeInvalid)


//Clicking "sign up" will assign form values and provide validation
function signupEmailButton(e) {

    e.preventDefault();

    //Compile form values 
    firstNameString = document.getElementById('first-name').value;
    lastNameString = document.getElementById('last-name').value;
    emailString = document.getElementById('email').value;
    emailTrialString = document.getElementById('email-trial').value;
    mobileNumber = document.getElementById('mobile').value;

    //Validation Function
    validateSignUpEmail();

}

function checkTrialButton(e){

    e.preventDefault();

    //Compile form values 
    emailTrialString = document.getElementById('email-trial').value;

    //Validation Function
    checkTrial();
}

//If statements to detect if required fields are empty. Returns feedback if one is empty. Passes to API if all filled
function validateSignUpEmail() {
    var flag = 0;
    if (TermsConditionsCheck.checked == false){
        failErrorMessage(emailsubmitFeedback, "Please read and accept the Terms & Conditions")
        flag = 1;
    } 
    
    if (validateEmail()) {
        failErrorMessage(emailFeedback, "Please enter a valid email address")
        flag = 1;
    }

    if (lastNameString == "") {
        failErrorMessage(lastNameFeedback, "Please enter your last name")
        flag = 1;
    }

    if (firstNameString == "") {
        failErrorMessage(firstNameFeedback, "Please enter your first name")
        flag = 1;
    }

   if (flag==0){
        passSignUpEmail();
    }
}


//If statements to detect if required fields are empty. Returns feedback if one is empty. Passes to API if all filled

function checkTrial(){

    var flag = 0;  
    if (validateEmailTrial()) {
        failErrorMessage(emailTrialFeedback, "Please enter a valid email address")
        flag = 1;
    }
   if (flag==0){
        passTrailEmail();
    }
}


//Display passed error on feedback element and assigns "invalid" class to target.
function failErrorMessage(target, warningString) {
    target.innerHTML = warningString;
    emailsubmitFeedback.innerHTML = warningString;
    target.classList.remove("no-display");
    if (target != emailsubmitFeedback) {
        target.parentElement.childNodes[1].classList.add("invalid")
    } else if (target == emailsubmitFeedback){
        TermsConditionsCheck.classList.add("invalid")
    }
};

//Remove "Invalid" class
function removeInvalidBorder() {
    firstNameFeedback.parentElement.childNodes[1].classList.remove("invalid")
    lastNameFeedback.parentElement.childNodes[1].classList.remove("invalid")
    emailFeedback.parentElement.childNodes[1].classList.remove("invalid")
    TermsConditionsCheck.classList.remove("invalid")
}

//Remove "Invalid" class from checkbox if clicked
function removeInvalid(){
    if (TermsConditionsCheck.checked == true){        
        TermsConditionsCheck.classList.remove("invalid");
        if (emailsubmitFeedback.innerHTML == "Please read and accept the Terms &amp; Conditions"){
            emailsubmitFeedback.innerHTML = "";
        }; 
    }
}

function passSignUpEmail(){
    submitEmailButton.classList.add("disable-button");
    emailsubmitFeedback.innerHTML = "Sending your details..."

    const data = {
        first_name: firstNameString,
        last_name:  lastNameString,
        email: emailString,
        mobile: mobileNumber 
    };

    console.log("Sending this json through post:" + JSON.stringify(data));

    // Post JSON to Paramount's API
    submitNewEmail('https://0f21n2zlzg.execute-api.ap-southeast-2.amazonaws.com/Dev/register_interest', data);
}

function passTrailEmail(){
    emailTrialButton.classList.add("disable-button");
    trailsubmitFeedback.innerHTML = "Sending your details..."

    const data2 = {
        email: emailString
    };

    console.log("Sending this json through post:" + JSON.stringify(data2));

    submitTrailEmail('https://0f21n2zlzg.execute-api.ap-southeast-2.amazonaws.com/Dev/register_trial_user', data2);
}

function submitNewEmail(url, data) {
    fetch(url, {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then((res) => res)
        .then((data) => console.log(data))
        .catch(err => {
            emailsubmitFeedback.classList.remove('no-display');
            emailsubmitFeedback.innerHTML = err;
            console.error(err);
        })
}

function submitTrailEmail(url, data) {
    fetch(url, {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then((res) => res)
        .then((data) => console.log(data))
        .catch(err => {
            trailsubmitFeedback.classList.remove('no-display');
            trailsubmitFeedback.innerHTML = err;
            console.error(err);
        })
}

function checkEmail(url, data) {
    fetch(url, {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)

    })
        .then((res) => res)
        .then((data) => console.log(data))
        .catch(err => {
            document.getElementById('trial-feedback').classList.remove('no-display');
            document.getElementById('trial-feedback').innerHTML = err;
            console.error(err);
        })
}


// function checkTrial(e) {
//     e.preventDefault();
//     console.log("Sending this json through post:" + JSON.stringify(data2));
//     // Post JSON to working API
//     checkEmail('https://jsonplaceholder.typicode.com/posts', data2);
//     // Post JSON to Paramount's API
//     checkEmail('https://0f21n2zlzg.execute-api.ap-southeast-2.amazonaws.com/Dev/resend_trial_user_email', data2);
// }






// ****************************************
// Form Validation
// ****************************************

//Assign events to form fields
document.getElementById('first-name').addEventListener('blur', validateFirstName);
document.getElementById('last-name').addEventListener('blur', validateLastName);
document.getElementById('email').addEventListener('blur', validateEmail);
document.getElementById('email-trial').addEventListener('blur', validateEmailTrial);

// Phone Not Needed
// document.getElementById('mobile').addEventListener('blur', validatePhone);

function validateFirstName() {

    const name = document.getElementById('first-name');
    const re = /^[A-Za-z]{2,10}$/;

    if (!re.test(name.value)) {
        firstNameFeedback.classList.remove('no-display');
    } else {
        firstNameFeedback.classList.add('no-display');
        firstName.classList.remove('invalid');
    }

}

function validateLastName() {
    const name = document.getElementById('last-name');
    const re = /^[A-Za-z]{2,10}$/;

    if (!re.test(name.value)) {
        lastNameFeedback.classList.remove('no-display');       
    } else {
        lastNameFeedback.classList.add('no-display');
        lastName.classList.remove('invalid');
    }
}

function validateEmail() {

    const email = document.getElementById('email');
    const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

    if (!re.test(email.value)) {
        emailFeedback.classList.remove('no-display');
        return(true);
    } else {
        emailFeedback.classList.add('no-display');
        email.classList.remove('invalid');
        return(false);
        }
}

function validateEmailTrial() {

    const email = document.getElementById('email-trial');
    const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

    if (!re.test(email.value)) {
        emailTrialFeedback.classList.remove('no-display');
        return(true);
    } else {
        emailTrialFeedback.classList.add('no-display');
        emailTrial.classList.remove('invalid');
        return(false);
    }


}

function validatePhone() {

    const name = document.getElementById('mobile');
    const re = /^\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d(4)$/;

    if (!re.test(mobile.value)) {
        name.parentElement.childNodes[3].classList.remove('no-display');
    } else {
        name.parentElement.childNodes[3].classList.add('no-displays-active');
    }

}