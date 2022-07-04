const states = document.querySelectorAll("div#Brasil_Map svg a.estado")

states.forEach(state => {
    state.addEventListener('click', ()=>{
        window.location.reload()
        console.log("Função click funcionando!")
        return
    })
})
