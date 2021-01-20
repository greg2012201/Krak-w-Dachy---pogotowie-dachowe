const POST_URL = process.env.PROXY_URL;
const form = document.querySelector('.form');
const submitButton = document.querySelector('.form__button');


// FORM FROM HTML  

const formDataToJson = formData => {
    const entries = formData.entries();

    const dataObj = Array.from(entries).reduce((data, [key, value]) => {
        data[key] = value;
        if (key === 'email') {
            data._replyTo = value;
        }
        return data;
    }, {});

    return JSON.stringify(dataObj);
};

//  SUBMITION AND REQUEST


form.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    formData.append('_subject', 'Zapytanie Kraków Dachy');

    fetch(POST_URL, {
            method: 'POST',
            body: formDataToJson(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .catch(e => console.log(e))
        .then(r => {
            console.log('wysyłanie...');
            return r.json()
        })

        .then(res => {

            if (res.statusCode === 200) form.reset();
            else throw Error(`coś poszło nie tak po stronie serwera: ${res.message}!`);

        })

});