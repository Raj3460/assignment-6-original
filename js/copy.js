const removeActiveClass=() => {
       const actives = document.getElementsByClassName("active")

//      console.log(actives)
     for(let btn of actives){
       // console.log(btn)
       btn.classList.remove("active")
     }  

}
// removeActiveClass()




const loadCategories = () =>{
       
       // fetch
       fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
       .then( res => res.json())
       .then( data=> displayCategories(data.categories))

}

// 2nd function categories
const displayCategories = (categories) => {
       // console.log(categories)
       // get the container 
       const nav = document.getElementById("category-container");
       // for loop up in categories
       for (let cat of categories){
              
              // create element
              const createCategoriesDiv = document.createElement("div");
              
              createCategoriesDiv.innerHTML = `
              <button id="btn-${cat.category_id}" onclick="loadCategoriesVideos(${cat.category_id})"
                class="btn btn-sm hover:bg-red-500
                 hover:text-white ">${cat.category}</button>
              
              
              `
              // append child
              nav.append(createCategoriesDiv)
              
       }
       
}

// creat id function
const loadCategoriesVideos = (id) =>{
       // console.log(id)
       fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
       .then(res=>res.json())
       .then(data => {
              removeActiveClass()
              const clickbutton = document.getElementById(`btn-${id}`);
              // console.log(clickbutton)
              clickbutton.classList.add("active")
              displayLoadVideos(data.category)})
       .catch(er=> console.log(er))
}




const loadVideos = () =>{
       // FETCH
       fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
       .then(res => res.json())
       .then(data =>  {
              removeActiveClass()
              document.getElementById("btn-all").classList.add("active")
               displayLoadVideos(data.videos)})
}




// load videos

const displayLoadVideos = (videos) =>{
       // console.log(videos)
       const videoContainer = document.getElementById("videoContainer");
       videoContainer.innerHTML = "";
       if (videos.length === 0){
              videoContainer.innerHTML = `
              <div class="col-span-full text-center flex flex-col justify-center items-center py-20">
                      <img class="w-[120px]" src="Icon.png" alt="">
                     <p class="text-2xl font-bold"> Opps!!Sorry , There is no <br> content here </p>
              </div>

              
              `  
              return; 
       }
       videos.forEach(element => {
              // console.log(element)
              const div = document.createElement("div");
              div.innerHTML=`
              <div class="card bg-base-100 ">
                     <figure class="relative">
                       <img
                       class="rounded-lg w-full h-[170px] object-cover"
                         src="${element.thumbnail}"
                         alt="Shoes" />
                         <span class="absolute bottom-2 right-2 bg-black text-white rounded-sm text-sm p-1">3hrs 56 min ago</span>
                     </figure>
                     <div class="py-4 flex gap-3">
                            <div class="">
                                   <div class="avatar">
                                          <div class="ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-2">
                                            <img src="${element.authors[0].profile_picture}" />
                                          </div>
                                        </div>
                            </div>
                            
                            <div class="">
                                   <h1 class="text-xl font-medium">${element.title}</h1>
                                   <p class=" text-sm text-gray-400 flex gap-1">
                                   ${element.authors[0].profile_name} 
                                          <img
                                          class="w-5 h-5"
                                           src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt="">
                                          </p>
                                   <p class="text-sm text-gray-400">${element.others.views} views</p>
                                   
                                   
                            </div>
                        
                       
                     </div>
                   </div>
              
              
              `
              videoContainer.appendChild(div)
       });

}


// ****************************
// {
//        "category_id": "1001",
//        "video_id": "aaaa",
//        "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//        "title": "Shape of You",
//        "authors": [
//          {
//            "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//            "profile_name": "Olivia Mitchell",
//            "verified": ""
//          }
//        ],
//        "others": {
//          "views": "100K",
//          "posted_date": "16278"
//        },
//        "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
//      },
// **************************


// 2nd function load vedioes
// 2nd display cata gories












loadCategories()