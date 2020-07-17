//Get discount by id
export function getDiscountById(idDiscount) {
    return new Promise((resolve, reject) => {
        return fetch('http://tsukiru.ddns.net:3000/api/discounts/id/' + idDiscount, {
            method: 'GET',
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

//Get discount by link
export function getDiscountByLink(linkDiscount) {
    return new Promise((resolve, reject) => {
        return fetch('http://tsukiru.ddns.net:3000/api/discounts/link/' + linkDiscount, {
            method: 'GET',
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

//All discounts for user
export function getDiscountsUser(idUser) {
    return new Promise((resolve, reject) => {
        return fetch('http://tsukiru.ddns.net:3000/api/discounts/' + idUser, {
            method: 'GET',
        })
          .then((response) => response.json())
          .then((responseJSON) => {
              resolve(responseJSON);
          }).catch((error) => {
              reject(error);
          });
    });
}

//Update discount
export function updateDiscount(data) {
    return new Promise((resolve, reject) => {
        return fetch('http://tsukiru.ddns.net:3000/api/discounts/update', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_user: data.id_user,
                id_discount: data.id_discount,
                used: data.used,
            }),
        })
          .then((response) => response.json())
          .then((responseJSON) => {
              resolve(responseJSON);
          }).catch((error) => {
              reject(error);
          });
    });
}

//Discount details with used state
export function getDiscountAssociation(idDiscout,idUser) {
    return new Promise((resolve, reject) => {
        return fetch('http://tsukiru.ddns.net:3000/api/discounts/' + idDiscout + '/' + idUser, {
            method: 'GET',
        })
          .then((response) => response.json())
          .then((responseJSON) => {
              resolve(responseJSON);
          }).catch((error) => {
              reject(error);
          });
    });
}
