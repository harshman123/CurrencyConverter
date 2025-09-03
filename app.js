const BASE_URL = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies';






const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

for (let select of dropdowns){
  for(currCode in countryList){
    let newOPtion = document.createElement("option");
    newOPtion.innerText = currCode;
    newOPtion.value = currCode;
    if(select.name === "from" && currCode === "USD"){
      newOPtion.selected = "selected";
    }else if(select.name === "to" && currCode === "INR"){
      newOPtion.selected = "selected";
    }
    select.append(newOPtion);

    select.addEventListener("change",(evt) =>{
      updateFlag(evt.target);
    });
  }
}

const updateFlag = (element) =>{
  let currcode = element.value;
  let countryCode = countryList[currcode];
  let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`; 
  let img = element.parentElement.querySelector("img");
  img.src = newsrc;
}


  
btn.addEventListener("click", async (evt) => {
  evt.preventDefault();

  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;

  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  // direct conversion URL

  console.log(fromCurr.value,toCurr.value);

  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

  
  // let response = await fetch(URL);
  // console.log(response);

  try {
  const response = await fetch(URL);
  const data = await response.json();

  const exchangeRate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  const convertedAmount = (amtVal * exchangeRate).toFixed(2);

  const result = document.querySelector(".result"); // Assuming you have a result container
  result.innerText = `${amtVal} ${fromCurr.value} = ${convertedAmount} ${toCurr.value}`;
} catch (error) {
  console.error("Error fetching exchange rate:", error);
}

  
});


