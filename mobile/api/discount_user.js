//Add discount_user
export function addDiscountToUser(data) {
    return new Promise((resolve, reject) => {
        fetch('http://tsukiru.ddns.net:3000/api/discount_user/addDiscountToUser', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: data.user_id,
                discount_id: data.discount_id
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

//Delete discount_user
export function deleteDiscountUser(idDiscount,idUser) {
    return new Promise((resolve, reject) => {
        return fetch('http://tsukiru.ddns.net:3000/api/user_discount/' + idDiscount + '/' + idUser, {
            method: 'DELETE',
        })
          .then((response) => response.json())
          .then((responseJSON) => {
              resolve(responseJSON);
          }).catch((error) => {
              reject(error);
          });
    });
}