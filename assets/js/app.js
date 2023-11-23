const cl = console.log;

const card = document.getElementById("card-post")
const titleControl = document.getElementById("title")
const postform = document.getElementById("postForm")
const bodyControl = document.getElementById("body")
const userIdControl = document.getElementById("userId")


let baseUrl = `https://jsonplaceholder.typicode.com`

let posts = `${baseUrl}/posts`

let postArr = []
// config 

let postHandle = () => {
    let xhr = new XMLHttpRequest();

     xhr.open("GET", posts)
     
     xhr.send()
     
     xhr.onload = function () {
         // cl(xhr.response)
         if(xhr.status === 200){
             postArr = JSON.parse(xhr.response)
             // cl(data)
             templating(postArr)
         }else{
             alert(`something went wrong`)
         }
}
}

postHandle()

const onSubmitPost = (eve) => {
    eve.preventDefault()
    let postObj = {
        title : titleControl.value,
        body : bodyControl.value,
        userId : userIdControl.value
    }
    cl(postObj)

    let xhr1 = new XMLHttpRequest()

    xhr1.open("post", posts, true)

    xhr1.send(JSON.stringify(postObj))

    xhr1.onload = function () {
        if(xhr1.status === 200 || xhr1.status === 201){
            postObj.id = JSON.parse(xhr1.response).id
            postArr.push(postObj)
            templating(postArr)
        }
    }
    postform.reset()
}


postform.addEventListener("submit", onSubmitPost)


const templating = (arr) => {
    let result = ``;
    arr.forEach(post => {
        result += `<div class="col-md-6 offset-md-3">
                    <div class="card mb-5">
                      <div class="card-header">
                          <h2>${post.title}</h2>
                      </div>
                      <div class="card-body">
                          <p>${post.body}</p>
                      </div>
                      <div class="card-footer d-flex justify-content-between">
                          <Button class="btn btn-outline-primary">Edit</Button>
                          <Button class="btn btn-outline-danger">Delete</Button>
                      </div>
                    </div>
                   </div>
        
                     `
    });
    card.innerHTML = result;
}



