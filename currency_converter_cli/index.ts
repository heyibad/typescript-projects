#! /usr/bin/env node
import inquirer from "inquirer";

const getCurrencyInfo = async (currency: string): Promise<{ [key:string]:number}> => {
    const apiKey = '9058e61f321a731cbbb4ed0d';
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${currency}`;
  
    try {
      const response = await fetch(apiUrl);
      // console.log(response)
      if (!response.ok) {
        console.log(`API request failed with status code ${response.status}`);
      }
      const { conversion_rates }: { conversion_rates: { [key: string]: number } } = await response.json();
      return conversion_rates;
    } catch (error) {
      console.error('Something went wrong/Internet Issue:', error);
      return {};
    }
  };

const user= await inquirer.prompt([

 {
     type: "list",
     name: "from",
    message: "Enter the currency you want to convert from 💲: ",
    choices:["USD","EUR","PKR","INR","AUD","CAD","CHF","JPY",]
 },
{
    type: "list",
    name: "to",
    message: "Enter the currency you want to convert to 💲: ",
    choices:["USD","EUR","PKR","INR","AUD","CAD","CHF","JPY",]
},
{
    type: "number",
    name: "amount",
    message: "Enter the amount you want to convert 💰: "
}

])

if (user.from === user.to){
    console.log("Both currencies are same, No need to convert")

}
else if (user.from && user.to){
    const currencyInfo = await getCurrencyInfo(user.from);
    const conversionRate = currencyInfo[user.to];
    const convertedAmount = Math.floor(Number(user.amount * conversionRate))
    console.log(` --- Converting from ${user.from} to ${user.to} 🤑 ---`)
    console.log(` --- Converted amount is: ${convertedAmount} ${user.to}💰 ---`);
}
else{
    console.log("Something went wrong ! Try again")
}    