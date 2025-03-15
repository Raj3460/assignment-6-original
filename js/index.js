const loadCategories = () =>{
       
       const url = `https://openapi.programming-hero.com/api/levels/all`
       fetch (url)
       .then(res => res.json())
       .then(data => displayCategories(data.data))


} 
const displayCategories= (categories)=>{
       const section = document.getElementById("vocabularies");
       
       for (let category of categories){
              console.log(category.level_no)
              const createDiv = document.createElement('div');
              createDiv.innerHTML = `
              
                                   <button class="group btn flex gap-1 border-blue-600 border-2 text-blue-600 font-bold hover:bg-[#3D26C7] hover:text-white">
                                    <img class = " group-hover:invert group-hover:brightness-0 " src="assets/fa-book-open.png" alt="">
                                    lesson ${category.level_no}</button>
                                   
              `
              section.append(createDiv)
       }
              

}
loadCategories()