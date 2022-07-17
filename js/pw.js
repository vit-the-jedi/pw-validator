"use strict";

const passwordInput = document.getElementById("user-password");
const confirmPasswordInput = document.getElementById("user-confirm-password");
const accountSubmitBtn = document.getElementById("account-submit");
const pwView = document.querySelector("#pw-view");
const confPwView = document.querySelector("#confirm-pw-view");
//change this value to change min password length allowed
const passwordMinLength = 8;
const passwordValidateObj = {
  //set our business rules to false to begin
  rules: {
    rule1: false,
    rule2: false,
    rule3: false,
    rule4: false,
    rule5: false,
  },
  //perform all required business logic on password creation
  performPasswordChecks: function () {
    if (this["password_length"] > 0) {
      this.checkMinimum();
      this.checkCase();
      this.checkNumber();
      //wait until user has entered confirm password value
      if (this["confirm_password_string"]) {
        //then check it
        this.performConfirmPasswordCheck();
      }
    } else {
      for (const rule of Object.keys(this["rules"])) {
        this["rules"][rule] = false;
      }
    }
    console.log(this);
    performCriteriaStyleChange();
  },
  //check confirm password value matches the password value
  performConfirmPasswordCheck: function () {
    const ruleObj = this["rules"];
    if (this["password_string"] === this["confirm_password_string"]) {
      ruleObj.rule5 = true;
    } else {
      ruleObj.rule5 = false;
    }
    performCriteriaStyleChange();
    //toggle submit button if rules are all valid or if at least one is invalid
    for (const ruleValue of Object.values(this["rules"])) {
      if (ruleValue === false) {
        disableSubmit();
        return;
      } else {
        allowSubmit();
      }
    }
  },
  //chack against our minimum allowed password length
  checkMinimum: function () {
    const ruleObj = this["rules"];
    if (this["password_length"] < passwordMinLength) {
      ruleObj.rule1 = false;
      return false;
    } else {
      ruleObj.rule1 = true;
      return true;
    }
  },
  //check if upper/lower case char exists in password
  checkCase: function () {
    const password = this["password_string"];
    const ruleObj = this["rules"];
    const upperLetterRegex = /[A-Z]/;
    const lowerLetterRejex = /[a-z]/;
    const upperMatch = password.match(upperLetterRegex);
    const lowerMatch = password.match(lowerLetterRejex);

    //loop through our string and match each char against an uppercase version
    if (upperMatch) {
      ruleObj.rule3 = true;
    } else if (upperMatch === null) {
      ruleObj.rule3 = false;
    }
    if (lowerMatch) {
      ruleObj.rule2 = true;
    } else if (lowerMatch === null) {
      ruleObj.rule3 = false;
    }
  },
  //check if a number exists in password
  checkNumber: function () {
    const passwordString = this["password_string"];
    const numRegex = /[0-9]/;
    const match = passwordString.match(numRegex);
    if (match) {
      this["rules"].rule4 = true;
    } else {
      this["rules"].rule4 = false;
    }
  },
};
//update our password object on keyup of password input
const validatePasswordHandler = (e) => {
  passwordValidateObj["eventTarget"] = e.currentTarget;
  passwordValidateObj["password_string"] = e.currentTarget.value;
  passwordValidateObj["password_length"] = e.currentTarget.value.length;
  passwordValidateObj.performPasswordChecks();
};
//update our password object on keyup of confirm password input
const confirmPasswordHandler = (e) => {
  passwordValidateObj["confirm_password_string"] = e.currentTarget.value;
  passwordValidateObj.performConfirmPasswordCheck();
};

const performCriteriaStyleChange = function () {
  for (const [key, value] of Object.entries(passwordValidateObj["rules"])) {
    const ruleNum = key.slice(-1);
    const criteriaTarget = document.querySelector(`[pw-criteria="${ruleNum}"]`);
    if (value) {
      criteriaTarget.style.color = "green";
    } else {
      criteriaTarget.style.color = "inherit";
    }
  }
};

const allowSubmit = function () {
  accountSubmitBtn.removeAttribute("disabled");
};
const disableSubmit = function () {
  accountSubmitBtn.setAttribute("disabled", "disabled");
};
//disable submit btn on load
disableSubmit();
passwordInput.addEventListener("keyup", function (e) {
  const keyPressed = e.code || e.keyCode;
  //ignore certain keys so we aren't doing unnecessary work if keys arent nums/letters/symbols
  switch (keyPressed) {
    case "ShiftLeft":
    case "ShiftRight":
    case "ControlLeft":
    case "ControlRight":
    case "MetaLeft":
    case "MetaRight":
    case "AltLeft":
    case "AltRight":
    case "Enter":
      break;
    default:
      validatePasswordHandler(e);
  }
});
confirmPasswordInput.addEventListener("keyup", function (e) {
  const keyPressed = e.code || e.keyCode;
  //ignore certain keys so we aren't doing unnecessary work if keys arent nums/letters/symbols
  switch (keyPressed) {
    case "ShiftLeft":
    case "ShiftRight":
    case "ControlLeft":
    case "ControlRight":
    case "MetaLeft":
    case "MetaRight":
    case "AltLeft":
    case "AltRight":
    case "Enter":
      break;
    default:
      confirmPasswordHandler(e);
  }
});

const pwViewToggle = (e) => {
  const target = e.target;
  const targetParent = document.querySelector(
    `#${target.getAttribute("pw-toggle")}`
  );
  //change icon
  if (target.classList.contains("fa-eye")) {
    target.classList.remove("fa-eye");
    target.classList.add("fa-eye-slash");
  } else {
    target.classList.add("fa-eye");
    target.classList.remove("fa-eye-slash");
  }
  //set the password to visible
  if (targetParent.getAttribute("type") === "password") {
    targetParent.setAttribute("type", "text");
  } else {
    targetParent.setAttribute("type", "password");
  }
};
pwView.addEventListener("click", pwViewToggle);
confPwView.addEventListener("click", pwViewToggle);
