function send() {
    document.getElementsByClassName('weather')[0].innerHTML = ''
    var city = city_inp.value
    var xml = new XMLHttpRequest
    xml.open('GET', 'https://api.openweathermap.org/data/2.5/find?q='+city+'&units=metric&appid=f65a144af2c21696d1eba90d0e96d77a')
    xml.send()
    xml.onreadystatechange = function() {
        if (xml.readyState == 4 && xml.status == 200){
            let data = JSON.parse(this.responseText)
            console.log(data)
            for (i = 0; i < data.list.length; i++){
                if (i == 3){break}
                document.getElementsByClassName('weather')[0].innerHTML += '<div class="day day' + (i + 1) + '">' + '<div class="cont cont' + (i + 1) + '">'
                var div = document.getElementsByClassName('cont' + (i + 1))[0]
                cont = data.list[i]
                div.innerHTML += '<h1>' + cont.name + '.' + cont.sys.country
                div.innerHTML += '<div class="temp">' + '<p>' + 'Min: ' + cont.main.temp_min + '<h2>' + cont.main.temp + '</h2>' + '<p>' + 'Max: ' + cont.main.temp_max
                div.innerHTML += '<p>' + 'Wind: ' + cont.wind.speed + ' m/s'
                div.innerHTML += '<p>' + cont.weather[0].description
                div.innerHTML += '<img class="w_img" ' + 'src="' + 'http://openweathermap.org/img/w/' + cont.weather[0].icon + '.png' + '">'
                if (document.getElementsByClassName('switch')[0].classList[1] == 'type_night'){
                    document.getElementsByClassName('weather')[0].children[i].style.background = 'rgba(0, 0, 0, 0.75)'
                }
            }
        }
    }
}

document.getElementsByClassName('switch')[0].onclick = function (event){
    if (event.target.classList[0] == 'switch'){ 
        var sw = document.getElementsByClassName('switch')[0]
        var day = document.getElementsByClassName('day')[0]
        if (sw.classList[1] == 'type_day'){
            document.getElementsByClassName('bt')[0].style.margin = '0 0 0 50%'
            sw.classList.remove('type_day')
            sw.classList.add('type_night')
            document.getElementsByClassName('bt')[0].style.background = 'darkblue'
            document.getElementsByClassName('weather')[0].style.color = 'orangered'
            for (i = 0; i < 3; i++ ){document.getElementsByClassName('weather')[0].children[i].style.background = 'rgba(0, 0, 0, 0.75)'}
        } else {
            document.getElementsByClassName('bt')[0].style.margin = '0 50% 0 0'
            sw.classList.remove('type_night')
            sw.classList.add('type_day')
            document.getElementsByClassName('bt')[0].style.background = 'wheat'
            document.getElementsByClassName('weather')[0].style.color = 'teal'
            for (i = 0; i < 3; i++ ){document.getElementsByClassName('weather')[0].children[i].style.background = 'rgba(255, 255, 255, 0.75)'}

        }    
    }
}