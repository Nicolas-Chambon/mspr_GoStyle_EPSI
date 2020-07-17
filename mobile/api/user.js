//Register POST
export function postRegister(data) {
    return new Promise((resolve, reject) => {
        return fetch('http://tsukiru.ddns.net:3000/api/users/register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: data.email,
                password1: data.password1,
                password2: data.password2,
            }),
        })
          .then((response) => response.json())
          .then((responseJSON) => {
              console.log(responseJSON);
              resolve(responseJSON);
          }).catch((error) => {
              reject(error);
          });
    });
}

//Login POST
export function postLogin(data) {
    return new Promise((resolve, reject) => {
        return fetch('http://tsukiru.ddns.net:3000/api/users/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password
            }),
        })
          .then((response) => response.json())
          .then((responseJSON) => {
              console.log(responseJSON);
              resolve(responseJSON);
          }).catch((error) => {
              reject(error);
          });
    });
}

//Resend email POST
export function postResendEmail(data) {
    return new Promise((resolve, reject) => {
        return fetch('http://tsukiru.ddns.net:3000/api/users/resend_email', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: data.email,
            }),
        })
          .then((response) => response.json())
          .then((responseJSON) => {
              console.log(responseJSON);
              resolve(responseJSON);
          }).catch((error) => {
              reject(error);
          });
    });
}

//Forgot password
export function postForgotPassword(data) {
    return new Promise((resolve, reject) => {
        return fetch('http://tsukiru.ddns.net:3000/api/users/forgot', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: data.email,
            }),
        })
          .then((response) => response.json())
          .then((responseJSON) => {
              console.log(responseJSON);
              resolve(responseJSON);
          }).catch((error) => {
              reject(error);
          });
    });
}

//user by mail
export function postUserByEmail(data) {
    return new Promise((resolve, reject) => {
        return fetch('http://tsukiru.ddns.net:3000/api/users/email', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: data.email,
            }),
        })
          .then((response) => response.json())
          .then((responseJSON) => {
              console.log(responseJSON);
              resolve(responseJSON);
          }).catch((error) => {
              reject(error);
          });
    });
}


