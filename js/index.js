// header er faq butter kaj kormo 
document.getElementById("faq").addEventListener("click",
       function(event){
              event.preventDefault();
              document.getElementById("faq").classList.add("active1");
              document.getElementById("logout").classList.remove("active1");
              document.getElementById("learn").classList.remove("active1");
              
              document.getElementById("faqSection").style.display = "block"
              document.getElementById("dynamicSection").style.display = "none"
              document.getElementById("thambnelSection").style.display = "none"
       }
)
// header er learn button er kaj kormo
document.getElementById("learn").addEventListener("click",
       function(event){
              event.preventDefault();
              document.getElementById("learn").classList.add("active1");
              document.getElementById("logout").classList.remove("active1");
              document.getElementById("faq").classList.remove("active1");


              document.getElementById("faqSection").style.display = "none"
              document.getElementById("dynamicSection").style.display = "block"
              document.getElementById("thambnelSection").style.display = "none"
              
       }
)
// logout button er kaj kormo
document.getElementById("logout").addEventListener("click",
       function(event){
              event.preventDefault();
              document.getElementById("logout").classList.add("active1");
              document.getElementById("faq").classList.remove("active1");
              document.getElementById("learn").classList.remove("active1");


              document.getElementById("faqSection").style.display = "none"
              document.getElementById("dynamicSection").style.display = "none"
              document.getElementById("thambnelSection").style.display = "block"
              
              
       }
)


























// ***************remove class
const removeClass = ()=>{
       const classes = document.getElementsByClassName('active')
       // console.log(classes)
       for (let btn of classes ){
              // console.log(btn)
              btn.classList.remove("active")

       }
}







// fetch lesson fetch
const loadCategories = () =>{
       
       const url = `https://openapi.programming-hero.com/api/levels/all`
       fetch (url)
       .then(res => res.json())
       .then(data => displayCategories(data.data))


}
// lesson button 
const displayCategories= (categories)=>{
       const section = document.getElementById("vocabularies");
       
       for (let category of categories){
              // console.log(category.level_no)
              const createDiv = document.createElement('div');
              
              createDiv.innerHTML = `
              
                                   <button id="btn-${category.level_no}"
                                    onclick="apiTwoForLessonCard(${category.level_no})" 
                                    class=" group btn flex gap-1 border-blue-600 border-2 text-blue-600 font-bold hover:bg-[#3D26C7] hover:text-white">
                                    <img class = " group-hover:invert group-hover:brightness-0 " src="assets/fa-book-open.png" alt="">
                                    lesson ${category.level_no}</button>
                                   
              `
              section.append(createDiv)
       }
              

}

// lesson button words fetch
const apiTwoForLessonCard = (level) =>{
       const urls = `https://openapi.programming-hero.com/api/level/${level}`
       fetch(urls)
       .then(res => res.json())
       .then(data => {
              removeClass()
              const click = document.getElementById(`btn-${level}`);
              // console.log(click)
              click.classList.add("active")
              wordContainerShowDisplay(data.data)
       })
}

// display container
const wordContainerShowDisplay = (words) =>{
       // console.log(words)
       const wordContainerHtml = document.getElementById("wordContainer");
       wordContainerHtml.innerHTML="";
       if(words.length===0){
              wordContainerHtml.innerHTML=`

              <div class=" bg-slate-100 text-center py-16 space-y-2 col-span-full  flex flex-col justify-center items-center">
                            <img class="w-[100px]" src="assets/alert-error.png" alt="">
                            <p class="text-[10px] text-gray-700">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                            <h1  class="text-2xl font-medium">নেক্সট Lesson এ যান</h1>

                      </div>
              
              
              `
       }
       

       words.forEach(element => {
              // console.log(element.id)
              const div = document.createElement('div');
              div.innerHTML=`
              
              
                                          <div class="card  bg-base-100 shadow-sm p-3  lg:w-full lg:h-[230px] lg:object-cover">
                                   <div class="hover:bg-sky-50 p-3 rounded-md">
                                          <div class="card-body text-center ">
                                     <h1 class="font-semibold text-xl">${element.word}</h1>
                                     <p class="text-[0.7rem] text-gray-800 font-semibold">Meaning / pronunciation</p>

                                     <h2 class="font-semibold">"${element.meaning} / ${element.pronunciation}"</h2> 
                                     </div>
                                     <div class="flex justify-between items-centler">
                                     <button onclick = "loadWords(${element.id})" class="btn bg-green-500" >
                                                 <i   class=" w-3/4 fa-solid fa-circle-info "></i>
                                          </button>
                                     <i  class="fa-solid fa-volume-high border border-red-100 p-2 bg-gray-100 rounded-sm"></i>
                                     </div>
                                     </div>
                                   </div>
                                     
                                     
                                     `
                                     
                                     
                                     wordContainerHtml.appendChild(div)




                                     

                                   
       });

}


// ai 2 ta word er
const loadWords = (synonymWordsId) =>{
     
       // console.log(synonymWordsId)
       const urls = `https://openapi.programming-hero.com/api/word/${synonymWordsId}`

       fetch(urls)
       .then(res => res.json())
       .then(data=> displayLoadWords(data))

}
const displayLoadWords =(symWords)=>{
       
       document.getElementById("wordDetails").showModal();
       const detailsContainer = document.getElementById("wordDetailsContainer");

       detailsContainer.innerHTML=`

       <h2 class="text-2xl font-bold">${symWords.data.word} (<i class="fa-solid fa-microphone"></i> : ${symWords.data.pronunciation})</h2>
              <h3 class=" font-semibold"> Meaning <br>
              ${symWords.data.meaning}
              </h3>

              <h3 class=" font-semibold"> Example <br>
              <span class="font-normal">${symWords.data.sentence}</span>
              </h3>
              

              <div class=" font-semibold">  
              <p>সমার্থক শব্দ গুলো</p>
              <div class="flex gap-3">
                     <h3 class="border-1 p-1 px-2 bg-sky-200 rounded-sm">${symWords.data.synonyms[0]}</h3>
                     <h3 class="border-1 p-1 px-2 bg-sky-200 rounded-sm">${symWords.data.synonyms[1]}</h3>
                     <h3 class="border-1 p-1 px-2 bg-sky-200 rounded-sm">${symWords.data.synonyms[2]}</h3>
                     
              </div>
               </div>
       
       `

}































loadCategories()

