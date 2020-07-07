function formatCurrency(type, value) {
    const formatter = new Intl.NumberFormat(type, {
      currency: type,
      style: "currency"
    });
    return formatter.format(value);
  }


async function convertCurrency(){
    const from = document.getElementById("from").value
    const to = document.getElementById("to").value
    const amount = document.getElementsByTagName("input")[0].value

    const parsedAmount = parseInt(amount)
    const convertedValue = await getConversionRateFromAPI(`${from}_${to}`, amount)
   

    document.getElementById("result").innerHTML = formatCurrency(to, convertedValue)

}

async function getConversionRateFromAPI(conversion, amount){
    const api = `https://free.currencyconverterapi.com/api/v6/convert?q=${conversion}&compact=y&apiKey=9a02420c4a5e378f2215`
    const json = await fetch(api)

    const result = await json.json()
    return result[conversion].val * amount 
}
