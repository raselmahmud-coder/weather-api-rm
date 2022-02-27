const url = `https://weatherdbi.herokuapp.com/data/weather/`;
const input = document.getElementById('input-feilds');
const sectionContainer = document.getElementById('search-result');
const spinnerId = document.getElementById('spinner');
const weatherId = document.getElementById('weather-id');
const errorText = document.getElementById('error');
const loadData = () => {
    weatherId.textContent = '';
    errorText.textContent = '';
if (!isNaN(input.value)) {
    input.value = '';
    return alert('please put only text');
} else {
    spinnerId.classList.remove('d-none');
    fetch(url + `${input.value}`)
    .then(response => response.json())
    .then(data => displayData(data))
input.value = '';
}
};
// display data
const displayData = (getData) => {
    if (getData.status === 'fail') {
        input.className = 'border-4 border-danger form-control';
        /* const classesToAdd = ['text-center', 'text-danger', 'fs-3'];
        createH1.classList.add(...classesToAdd);
        createH1.setAttribute("id", "id_you_like"); */
        spinnerId.classList.add('d-none');
        errorText.innerText = `${getData.message}`;
        // createDiv.classList.add('')
        sectionContainer.appendChild(errorText);
        // console.log(getData.message);
        // sectionContainer.textContent = '';
    }
    
    else {
        errorText.innerText = '';
        input.classList.remove('border-4', 'border-danger');
        spinnerId.classList.add('d-none');
        weatherId.innerHTML = `
        <h4>Region: ${getData.region}</h4>
        <h4>Day Hour: ${getData.currentConditions.dayhour}</h4>
        <h4>Comment: ${getData.currentConditions.comment}</h4>
        <button class='btn btn-primary' onclick='getDetailsRegion("${getData.region}")'>Details</button>
        `;
        // errorText.innerText = `${getData.currentConditions.dayhour}`;
        // sectionContainer.appendChild(errorText);
        // console.log(getData);
        // sectionContainer.textContent = '';
    }
};
// get details data
const getDetailsRegion = (region) => {
    spinnerId.classList.remove('d-none');
    weatherId.textContent = '';
    fetch(url + `${region}`)
    .then(response => response.json())
        .then((data) => { 
            spinnerId.classList.add('d-none');
            weatherId.innerHTML = `
            <h1>Resion: ${data.region}</h1>
            <h2>Current Conditions: ${data.currentConditions.comment}</h2>
            <h3>Tempareture: ${data.currentConditions.temp.c}C ${data.currentConditions.temp.f}F</h3>
            <h4>Day: ${data.next_days[0].day}</h4>
            <h5>Comment: ${data.next_days[0].comment}</h5>
            <h5>Day: ${data.next_days[1].day}</h5>
            <h6>Comment: ${data.next_days[1].comment}</h6>
            `;
            console.log(data)
        })
    // console.log(region);
    // success my weather API
}