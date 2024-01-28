closeSideNav();
$(document).ready(function(){
    searchMealByName("");
    $('.loading i').fadeOut(400,function(){
        $('.loading').fadeOut(400,function(){
            $('body').css('overflow','auto');
        })
    });
    
})


//~ Functions
async function searchMealByName(name){
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    const data = await response.json();
    displayMeals(data.meals);
}
async function searchMealsByFirstLetter(letter){
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    const data = await response.json();
    displayMeals(data.meals);
}
async function getMealsByArea(area){
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    const data = await response.json();
    displayMeals(data.meals.slice(0, 20));
}
async function getAreas(){
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    const data = await response.json();
    displayAreas(data.meals);
}
async function getMealsByCategory(cat){
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`);
    const data = await response.json();
    displayMeals(data.meals.slice(0, 20));
}
async function getCategories(){
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    const data = await response.json();
    displayCategories(data.categories);
}
async function getMealsByIngredient(ing){
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`);
    const data = await response.json();
    displayMeals(data.meals.slice(0, 20));
}
async function getIngredients(){
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    const data = await response.json();
    displayIngredients(data.meals.slice(0,20));
}
function closeSideNav(){
    const _left = $('.side-nav-content').innerWidth();
    $('.side-nav').css('left', -_left);
    $('.side-nav .side-nav-icon i.pointer').removeClass('fa-xmark');
    $('.side-nav .side-nav-icon i.pointer').addClass('fa-bars');
    $('.side-nav .links li').removeClass('animate__backInUp');

}
function openSideNav(){
    $('.side-nav').css('left', 0);
    $('.side-nav .side-nav-icon i.pointer').addClass('fa-xmark');
    $('.side-nav .side-nav-icon i.pointer').removeClass('fa-bars');
    $('.side-nav .links li').addClass('animate__backInUp');
}
$('.side-nav .side-nav-icon i').click(function(){
    if($('.side-nav').css('left') === '0px'){
        closeSideNav();
    }else{
        openSideNav();
    }
    
})
function displayCategories(arr){
    let content = "";
    for (let i = 0; i < arr.length; i++) {
        content += `
        <div class="col-3">
                    <div onclick="getMealsByCategory('${arr[i].strCategory}')" class="meal position-relative pointer overflow-hidden rounded-3 ">
                        <img class="w-100" src="${arr[i].strCategoryThumb}" alt="${arr[i.strCategory]}">
                        <div class="desc-layer text-center p-4 position-absolute text-black">
                            <h3 class="ps-2">${arr[i].strCategory}</h3>
                            <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                        </div>
                    </div>
                </div>
        `
    }
    console.log(content);
    $('#row-content').html(content);
};
$('.side-nav .links li#cat').click(async function(){
    $('#search-content').empty()
    $('#row-content').empty();
    closeSideNav();
    await getCategories();
})
function displayAreas(arr){
    let content = "";
    for (let i = 0; i < arr.length; i++) {
        content += `
        <div class="col-3 ">
                    <div onclick="getMealsByArea('${arr[i].strArea}')"  class="area pointer py-3 fs-2 text-white rounded-3 text-center ">
                        <i class="fa-solid fa-house-laptop fa-2x"></i>
                        <p>${arr[i].strArea}</p>
                    </div>
                </div>
        `
    }
    console.log(content);
    $('#row-content').html(content);
}
$('.side-nav .links li#area').click(async function(){
    $('#search-content').empty();
    $('#row-content').empty();
    closeSideNav();
    await getAreas();
})
function displayIngredients(arr){
    let content = "";
    for (let i = 0; i < arr.length; i++) {
        content += `<div class="col-3">
        <div onclick="getMealsByIngredient('${arr[i].strIngredient}')" class="meal pointer p-2 text-white rounded-3 text-center ">
            <i class="fa-solid fa-drumstick-bite fa-5x"></i>
            <h4 class="fs-3 my-3">${arr[i].strIngredient}</h4>
            <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
        </div>
    </div>
    `
    }
    console.log(content);
    $('#row-content').html(content);
}
$('.side-nav .links li#ing').click(async function(){
    $('#search-content').empty();
    $('#row-content').empty();
    closeSideNav();
    await getIngredients();
})
$('.side-nav .links li#search').click(async function(){
    closeSideNav();
    $('#search-content').html(`
    <div class="col-md-6 ">
                    <input oninput="searchMealByName(this.value)" class="bg-transparent form-control text-white" placeholder="Search By Name" type="text">
                </div>
                <div class="col-md-6 ">
                    <input oninput="searchMealsByFirstLetter(this.value)" class="bg-transparent form-control text-white" maxlength="1" placeholder="Search By First Letter" type="text">
                </div>
    `);
                $('#row-content').empty();            
})
function displayMeals(arr){
    let content = "";
    for (let i = 0; i < arr.length; i++) {
        content += `
        <div class="col-md-3">
                    <div onclick="getMealById(${arr[i].idMeal})" class="meal position-relative pointer overflow-hidden rounded-3 ">
                        <img class="w-100" src="${arr[i].strMealThumb}" alt="${arr[i].strMeal}">
                        <div class="desc-layer d-flex align-items-center position-absolute text-black">
                            <h3 class="ps-2">${arr[i].strMeal}</h3>
                        </div>
                    </div>
                </div>
        `
    }
    $('#row-content').html(content);
};
async function getMealById(mealId){
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    const data = await response.json();
    displayMealDesc(data.meals[0]);
}
function displayMealDesc(meal){
    $('#search-content').empty()
    $('#row-content').empty();
    let mealIngredients = ``;
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            mealIngredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",");
    if (!tags) {
        tags = []
    }

    let tagsStr = '';
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }
    let content = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${mealIngredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
    </div>`
    $('#row-content').html(content);
}
$('.side-nav .links li#contact').click(async function(){
    closeSideNav();
    $('#search-content').empty();
    $('#row-content').html(`
    <div class="contact-form min-vh-100 d-flex justify-content-center align-items-center">
                    <div class=" text-center container w-75">
                        <div class="row g-4">
                            <div class="col-md-6">
                                <input id="nameInput" placeholder="Enter Your Name" class="form-control" type="text">
                                <div id="nameAlert" class="alert alert-danger w-100 mt-1 d-none">
                                    Special Characters and Numbers Not Allowed
                                </div>
                            </div>
                            <div class="col-md-6">
                                <input id="emailInput" placeholder="Enter Your Email" class="form-control" type="email">
                                <div id="emailAlert" class="alert alert-danger w-100 mt-1 d-none">
                                    Email not Valid *exemple@yyy.zzz
                                </div>
                            </div>
                            <div class="col-md-6">
                                <input id="telInput" placeholder="Enter Your Phone" class="form-control" type="tel">
                                <div id="phoneAlert" class="alert alert-danger w-100 mt-1 d-none">
                                    Enter Valid Phone Number
                                </div>
                            </div>
                            <div class="col-md-6">
                                <input id="ageInput" placeholder="Enter Your Age" class="form-control" type="number">
                                <div  id="ageAlert" class="alert alert-danger w-100 mt-1 d-none">
                                    Enter Valid Age
                                </div>
                            </div>
                            <div class="col-md-6">
                                <input id="passInput" placeholder="Enter Your Password" class="form-control" type="password">
                                <div id="passwordAlert" class="alert alert-danger w-100 mt-1 d-none">
                                    Enter Valid Password *Minimum 8 characters, at least 1 Letter and 1 Number:*
                                </div>
                            </div>
                            <div class="col-md-6">
                                <input id="repassInput" placeholder="Repasswoed" class="form-control" type="password">
                                <div id="repasswordAlert" class="alert alert-danger w-100 mt-1 d-none">
                                    Enter Valid Repassword 
                                </div>
                            </div>
                        </div>
                        <button disabled class="btn btn-outline-danger my-5" id="submit">Submit</button>
                    </div>
                </div>
    `);
})


function validName(){
    let nameRegex = /^[a-zA-Z]{1,}$/;
    return (nameRegex.test($('#nameInput').val()))
}
function validEmail(){
    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return (emailRegex.test($('#emailInput').val()))
}
function validPhone(){
    let phoneRegex = /^01(1|2|0|5)[0-9]{8}$/;
    return (phoneRegex.test($('#telInput').val()))
}
function validAge(){
    let ageRegex = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
    return (ageRegex.test($('#ageInput').val()))
}
function validPass(){
    let passRegex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
    return (passRegex.test($('#passInput').val()))
}
function validRepass(){
    return ($('#passInput').val() === $('#repassInput').val());
}