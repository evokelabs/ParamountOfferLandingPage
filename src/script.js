// API Submit New Email Address: https://0f21n2zlzg.execute-api.ap-southeast-2.amazonaws.com/Dev/register_trial_user
// API Resend Trial Offer: https://0f21n2zlzg.execute-api.ap-southeast-2.amazonaws.com/Dev/resend_trial_user_email

//Create Email Dummy JSON
const data = {
    first_name: 'FirstTest',
    last_name: 'LastTest',
    email: 'test@email.com',
    mobile: '0433033033'
};

//Create Trial Dummy JSON
const data2 = {
    email: 'test@email.com'
}

//Button 1 (Sign Up Email) Enabled 
document.getElementById('submit-email-button').addEventListener('click', signupEmail)

//Button 2 (Check for Email Trial) Enabled 
document.getElementById('email-trial-submit').addEventListener('click', checkTrial)

function signupEmail(e){
    
    e.preventDefault();

    //Compile form values and create json

    // const firstNameString = document.getElementById('first-name').value;
    // const lastNameString = document.getElementById('last-name').value;
    // const emailString = document.getElementById('email').value;
    // const emailTrialString = document.getElementById('email-trial').value;
    // const mobileNumber = document.getElementById('mobile').value;

    // const data = {
    //     first_name: firstNameString,
    //     last_name:  lastNameString,
    //     email: emailString,
    //     mobile: mobileNumber 
    // };

    console.log("Sending this json through post:" + JSON.stringify(data));
    // Post JSON to working API
    submitNewEmail('https://jsonplaceholder.typicode.com/posts', data.value);
    // Post JSON to Paramount's API
    submitNewEmail('https://0f21n2zlzg.execute-api.ap-southeast-2.amazonaws.com/Dev/register_trial_user', data);
}

function checkTrial(e){
    e.preventDefault();
    console.log("Sending this json through post:" + JSON.stringify(data2));
    // Post JSON to working API
    checkEmail('https://jsonplaceholder.typicode.com/posts', data2);
    // Post JSON to Paramount's API
    checkEmail('https://0f21n2zlzg.execute-api.ap-southeast-2.amazonaws.com/Dev/resend_trial_user_email', data2);
}

function submitNewEmail(url, data) {
    fetch(url, {
        method: 'post',
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    })
    .then ((res) => res)
    .then ((data)=> console.log(data))
    .catch(err => {  
        document.getElementById('submit-feedback').classList.remove('no-display');
        document.getElementById('submit-feedback').innerHTML = err;
        console.error(err);
    })
}

function checkEmail(url, data) {
    fetch(url, {
        method: 'post',
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)

    })
    .then ((res) => res)
    .then ((data)=> console.log(data))
    .catch(err => {  
        document.getElementById('trial-feedback').classList.remove('no-display');
        document.getElementById('trial-feedback').innerHTML = err;
        console.error(err);
    })
}


// ****************************************
// Form Validation
// ****************************************
// Form Blur Event Listeners
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
        name.parentElement.childNodes[3].classList.remove('no-display');
    } else {
        name.parentElement.childNodes[3].classList.add('no-displays-active');
    }

}

function validateLastName() {
    const name = document.getElementById('last-name');
    const re = /^[A-Za-z]{2,10}$/;

    if (!re.test(name.value)) {
        name.parentElement.childNodes[3].classList.remove('no-display');
    } else {
        name.parentElement.childNodes[3].classList.add('no-displays-active');
    }

}

function validateEmail() {

    const email = document.getElementById('email');
    const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

    if (!re.test(email.value)) {
        email.parentElement.childNodes[3].classList.remove('no-display');
    } else {
        email.parentElement.childNodes[3].classList.add('no-displays-active');
    }

}

function validateEmailTrial() {

    const email = document.getElementById('email-trial');
    const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

    if (!re.test(email.value)) {
        email.parentElement.childNodes[3].classList.remove('no-display');
    } else {
        email.parentElement.childNodes[3].classList.add('no-displays-active');
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