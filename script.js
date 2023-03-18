let api1="https://dummyjson.com/posts"
let api2="https://dummyjson.com/products"
let api3="https://dummyjson.com/todos"

function PromiseAPI1(api1,delay){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            fetch(api1)
            .then(Response => Response.json())
            .then(data => {
                console.log(new Date().toTimeString())
                resolve(data.posts)
            })
            .catch(error =>{
                reject(error)
            })
        },delay)
    })
}

function PromiseAPI2(api2,delay){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            fetch(api2)
            .then(Response => Response.json())
            .then(data => {
                console.log(new Date().toTimeString())
                resolve(data.products)
            })
            .catch(error =>{
                reject(error)
            })
        },delay)
    })
}

function PromiseAPI3(api3,delay){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            fetch(api3)
            .then(Response => Response.json())
            .then(data => {
                resolve(data.todos)
            })
            .catch(error =>{
                reject(error)
            })
        },delay)
    })
}

function fetchApiData(){
    const container = document.querySelector(".container");
    const api1Promise = PromiseAPI1(api1, 1000);
    const api2Promise = api1Promise.then(() => PromiseAPI2(api2, 2000));
    const api3Promise = api2Promise.then(() => PromiseAPI3(api3, 3000));

    api1Promise
          .then(api1Data => {
            const d1 = document.createElement("div");
            d1.classList.add("data1")
            const title = document.createElement("div");
            title.classList.add("title")
            title.textContent = 'API1'
            d1.appendChild(title);
            api1Data.forEach(item => {
              const data1 = document.createElement("div");
              data1.innerText = item.title;
              d1.appendChild(data1);
              container.appendChild(d1)
            });
            return true;
          })
          .then(api1Resolved => {
            if (api1Resolved) {
              return api2Promise;
            }
          })
          .then(api2Data => {
            const d1 = document.createElement("div");
            d1.classList.add("data1")
            const title = document.createElement("div");
            title.classList.add("title")
            title.textContent = 'API2'
            d1.appendChild(title);
            api2Data.forEach(item => {
              const data1 = document.createElement("div");
              data1.innerText = item.title;
              d1.appendChild(data1);
              container.appendChild(d1)
            });
            return true;
          })
          .then(api2Resolved => {
            if (api2Resolved) {
              return api3Promise;
            }
          })
          .then(api3Data => {
            const d1 = document.createElement("div");
            d1.classList.add("data1")
            const title = document.createElement("div");
            title.classList.add("title")
            title.textContent = 'API3'
            d1.appendChild(title);
            api3Data.forEach(item => {
              const data1 = document.createElement("div");
              data1.innerText = item.completed;
              d1.appendChild(data1);
              container.appendChild(d1)
            });
            return true;
          })
          .catch(error => {
            console.error(error);
          });
}

const fetchDataButton = document.querySelector(".btn");
fetchDataButton.addEventListener("click", fetchApiData);