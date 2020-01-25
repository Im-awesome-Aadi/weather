const weather = document.querySelector('form')
const search = document.querySelector('input')
const first = document.querySelector('#one')
const second = document.querySelector('#two')
const third = document.querySelector('#three')
const fourth = document.querySelector('#four')
weather.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    first.textContent= 'Loading...'
    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error)
            {
                console.log(data.error)
                first.textContent = data.error
            }
            else{
                console.log(data.place)
                console.log(data.forecast)
                third.textContent= data.place
                second.textContent = 'Weather Description : '+data.forecast
                first.textContent = 'Current Temperature : '+data.temperature+' C'
                fourth.textContent = 'Not Desired city? Try to make search term more specific. '
            }
        })
    })
    
})