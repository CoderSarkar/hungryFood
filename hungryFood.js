
const foodDetails = document.getElementById('foodDetails');

document.getElementById('searchFood').addEventListener('click', function(){
    const food = document.getElementById('foodName');
    const foodName = food.value;

    const foodType = document.getElementById('foodType');
    const searchField = document.getElementById('searchField');
    const errorMassage = document.getElementById('errorMassage');

    if(foodName == ''){
      alert('Please Just Enter a Single Letter');
    }else{
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${foodName}`)
      .then(res => res.json())
      .then(data => {
          let foodItem="";
          if(data.meals){
              data.meals.forEach(meals => {
                foodItem +=` 
                  <div class="col-md-3 mb-3" onclick="food(${meals.idMeal});">
                  <div class="card h-100 shadow  p-3" >
                    <img src="${meals.strMealThumb}" class="card-img-top">
                    <div class="card-body">
                      <h5 class="card-title textColor fw-bold">${meals.strMeal}</h5>
                    </div>
                  </div>
                </div>
                  ` ; 
              });
              foodType.innerHTML=foodItem; 
              errorMassage.style.display="none";
              searchField.style.display="block";
              
  
          }else{
            foodItem =`
             <h3>Sorry This Food Is Not Available Now</h3>
            `;
            errorMassage.innerHTML=foodItem; 
            searchField.style.display="none";
            errorMassage.style.display="block";
          } 
           
      } )
      .catch(error => {
          let foodItem =`
            <h3>Please just search with the first letter of food name </h3>
          `;
          errorMassage.innerHTML = foodItem;
          searchField.style.display="none";
          errorMassage.style.display="block";
          foodDetails.style.display="none";  
      })
    }
})

const food=(idMeal)=>{
  const mealId = idMeal;
   fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
  .then(res=> res.json())
  .then(data =>{
     const foodObject = data.meals[0];
    let ingredient = `
    <div class="card h-100  shadow card_radius p-3 ">
    <img src="${foodObject.strMealThumb}" class="card-img-top card-bg " alt="...">
    <div class="card-body">
      <h5 class="card-title orangeColor fw-bold ">${foodObject.strMeal}</h5>
      <h6>Ingredient</h6>
      <li><span><i class="fas fa-hand-point-right"></i></span> ${foodObject.strIngredient1} </li>
      <li><span><i class="fas fa-hand-point-right"></i></span> ${foodObject.strIngredient2} </li>
      <li><span><i class="fas fa-hand-point-right"></i></span> ${foodObject.strIngredient3} </li>
      <li><span><i class="fas fa-hand-point-right"></i></span> ${foodObject.strIngredient4} </li>
      <li><span><i class="fas fa-hand-point-right"></i></span> ${foodObject.strIngredient5} </li>
    </div>
  </div>
    `
    foodDetails.innerHTML = ingredient;
  })
}