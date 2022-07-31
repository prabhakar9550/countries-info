const countriesElements =document.querySelector(".countries");
const dropDown= document.querySelector(".dropDown");
const dropElement= document.querySelector(".drop");
const currency= document.querySelectorAll(".currency");
const search= document.querySelector(".search");
const toggle= document.querySelector(".toggle");
const moon= document.querySelector(".moon");
async function getCountry() {
    const url=await fetch("https://countriesnow.space/api/v0.1/countries/info?returns=unicode,currency,flag,dialCode");
    const res= await url.json();
    res.data.map(element => {
        return(
        showCountry(element))
    });
}
getCountry();
function showCountry(data) {
    const country= document.createElement("div")
    country.classList.add("country")
    country.innerHTML=` <div class="country-image">
    <img src="${data.flag}" alt="flag image">
    </div>
    <div class="country-info">
    <h5 class="countryName">${data.name}</h5>
    <p class="currencyName"><strong>Currency:</strong> ${data.currency}</p>
    <p><strong>DialCode:</strong> ${data.dialCode}</p>
</div>`
countriesElements.appendChild(country)
country.addEventListener("click",() =>{
    showCountryDetails(data);
})
}
dropDown.addEventListener("click",() => {
    dropElement.classList.toggle("showDropDown")
})
const currencyName= document.getElementsByClassName("currencyName");
const countryName= document.getElementsByClassName("countryName");
currency.forEach(element => {
    element.addEventListener("click", () => {
        Array.from(currencyName).forEach(elem => {
            if(elem.innerText.includes(element.innerText) || element.innerText=="ALL"){
                elem.parentElement.parentElement.style.display = "grid"
            }else{
                elem.parentElement.parentElement.style.display = "none"
            }
        })
    })
})
search.addEventListener("input", () =>{
    Array.from(countryName).forEach(elem => {
        if(elem.innerText.toLowerCase().includes(search.value.toLowerCase())){
            elem.parentElement.parentElement.style.display = "grid"
        }else{
            elem.parentElement.parentElement.style.display = "none"
        }
    })
})
toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark")
    moon.classList.toggle("fas")
})
const countryModel= document.querySelector(".countryModel");
function showCountryDetails(data) {
    countryModel.classList.toggle("show")
    countryModel.innerHTML=`<button class="back">Back</button>
    <div class="model">
        <div class="leftModel">
            <img src="${data.flag}" alt="flag image">
        </div>
        <div class="rightModel">
            <h1>${data.name}</h1>
            <div class="innerLeft">    
                <p><strong>Currency:</strong> ${data.currency}</p>
                <p><strong>DialCode:</strong> ${data.dialCode}</p>
            </div>
        </div>
    </div>`
    const back= countryModel.querySelector(".back");
    back.addEventListener("click", () =>{
    countryModel.classList.toggle("show")
})
}