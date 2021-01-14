var tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
var date = tomorrow.toString().slice(0, 15);

var select = document.getElementById('booking-date');
var bookButton = document.getElementsByClassName('book-button')[0];
let success = document.getElementById('success');
let content = document.getElementById('content');

var option = document.createElement('option');
option.appendChild(document.createTextNode(date));
option.setAttribute('value', date);
select.appendChild(option);


const submitForm = () => {
    var fullName = document.getElementById('full-name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var bookingTime = document.getElementById('booking-time').value;
    var bookingDate = document.getElementById('booking-date').value;

    var bookingData = {
        'fullName' : fullName,
        'email' : email,
        'phone' : phone,
        'bookingDate' : bookingDate,
        'bookingTime' : bookingTime,
    }
    let urL = "https://hooks.slack.com/services/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"
    let payload = {"text": `New consultation for ${bookingData.fullName} on ${bookingData.bookingDate} at ${bookingData.bookingTime}. Email: ${bookingData.email}, phone no: ${bookingData.phone}`}
    let otherParam = {
        method: 'POST',
        body: JSON.stringify(payload)
    }
    
    fetch(`https://cors-anywhere.herokuapp.com/${urL}`, otherParam)
    .then(res=> {
        if(res.status == 200){
            content.classList.add('hide');
            success.classList.remove('hide')
            success.classList.add('show');

        }
        return res.json()
    })
    .then(data=> console.log(data))
    .catch(err=> console.log(err))
    
}


bookButton.addEventListener('click', submitForm);
