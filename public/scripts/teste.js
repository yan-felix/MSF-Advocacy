async function teste(){
    const woeidBruto = '45638-SP'
    const woeid = woeidBruto.replace(/\D+/g, "")
    console.log(woeid)
    const splited = woeidBruto.split('-')
    console.log(splited)
}

await teste()