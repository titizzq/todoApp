const form = document.querySelector("#todoAddForm")
const addinput = document.querySelector("#todoName")
const todolist = document.querySelector(".list-group")
const firstcardbody = document.querySelectorAll(".card-body")[0]
const secondcardbody = document.querySelectorAll(".card-body")[1]
const clearbutton = document.querySelector("#clearButton")
const filterinput = document.querySelector("#todoSearch")

let todos

runevents()

function runevents() {
    form.addEventListener("submit", addtodo)
    document.addEventListener("DOMContentLoaded", pageloaded)
    secondcardbody.addEventListener("click", removetodofromUI)
    clearbutton.addEventListener("click",alllistscleaned)
    filterinput.addEventListener("keyup", filter)
}

function filter(e){
    const filteralue = e.target.value.toLowerCase().trim()
    const todolist = document.querySelectorAll(".list-group-item")

    if(todolist.length>0){
        todolist.forEach(function(todo){
            if(todo.textContent.toLocaleLowerCase().trim().includes(filtervalue)){
                todo.setAttribute("style","display : block") // burada css ozelliklerini kullandik block derse ekranda gozukecek yani filtrelenecek displayi none oldugunda ise gozukmeyecek
            }else{
                todo.setAttribute("style","display : none !important") // burada normalde calisir fakat bizim bu importanti yazmamizin sebebi proje boostrapten alindigi icin orada bir nevi !important diyerek sen benim yazmis oldugum kodu uygula dedim boostrapin degil 
            }
        })
    }else{
        showAlert("warning", "filtreleme yapmak icin en az bir todo olmasi lazim")
    }
}



function alllistscleaned(){
    const list = document.querySelectorAll(".list-group-item")
    if(list.length>0){
        list.forEach(function(li){
            li.remove()
        })

        todos = []
        localStorage.setItem("todos",JSON.stringify(todos))
        showAlert("success", "basarili bir sekilde butun todolariniz silindi ")
    }else{
        showAlert("warning","silmek icin en az 1 todo lazim")
    }
    


}


function removetodofromUI(e) {
    //console.log(e.target)
    //ekrandan silme
    if (e.target.className == "fa fa-remove") {
        const todo = e.target.parentElement.parentElement // aslinda burada parentin parentini alarak li yi almis olduk cunku li var a var en sonda i var biz suan i den islem yapiyoruz
        todo.remove()
        // storagedan silme
        removetodofromstorage(todo.textContent)
        showAlert("success", "Todo basariyla silindi")
    }
}

function removetodofromstorage(removetodo){
    chechtodosfromstorage() // once degerleri kontrol ettik valuelerini aldik 
    todos.forEach(function(todo,index){ // mesela basta 0 indexi oluyor kitap okumak todo oluyor 
        if(removetodo === todo ){
            todos.splice(index,1) //index ile baslangic numarasini verirsin 1 ile baslangic numarassindan sonra kactane silsin dersin 1 kendisini siler mesela iki deseydim kendisini ve bir sonraki indexide silerdi 
        }
    })
    localStorage.setItem("todos",JSON.stringify(todos))

}

function pageloaded() {
    chechtodosfromstorage() // valuelerimi almaya yarar
    todos.forEach(function (todo) {
        addtodotoUI(todo)
    })
}

function addtodo(e) {
    const textinput = addinput.value.trim()
    if (textinput == null || textinput == "") {
        showAlert("warning", "Lutfen Bos Birakmayiniz")
    } else {
        addtodotoUI(textinput)
        adtodotoStorage(textinput)
        showAlert("success", "Todo Eklendi")
    }
    e.preventDefault()
}


function addtodotoUI(textinput) {
    /*
                      <li class="list-group-item d-flex justify-content-between">Todo 1
                          <a href="#" class="delete-item">
                              <i class="fa fa-remove"></i>
                          </a>
                      </li>
                    */
    const li = document.createElement("li")
    li.className = "list-group-item d-flex justify-content-between"
    li.textContent = textinput

    const a = document.createElement("a")
    a.href = "#"
    a.className = "delete-item"

    const i = document.createElement("i")
    i.className = "fa fa-remove"

    a.appendChild(i)
    li.appendChild(a)
    todolist.appendChild(li)

    addinput.value = ""

}

function adtodotoStorage(textinput) {
    chechtodosfromstorage()
    todos.push(textinput)
    localStorage.setItem("todos", JSON.stringify(todos))

}

function chechtodosfromstorage() {
    if (localStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
        // console.log(todos) get item methodu value leri return ediyor return edilen onceden olan degerlerim var ve o degerleri  = deki todos sayesinde tutabiliyorum 
    }
}

function showAlert(type, message) {
    const div = document.createElement("div")
    div.className = "alert alert-" + type // burada alert alert yada yukaridaki success gibi durumlar bootstrapden geldi 
    div.textContent = message
    firstcardbody.appendChild(div)
    div.style.marginTop = "20px"
    div.style.fontWeight = "bold"

    setTimeout(function () {
        div.remove()
    }, 2000)
}