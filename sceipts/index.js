


function showLoader() {
    document.getElementById("loader").classList.remove("hidden");
    document.getElementById("card_container").classList.add("hidden");
  }
  
  function hideLoader() {
    document.getElementById("loader").classList.add("hidden");
    document.getElementById("card_container").classList.remove("hidden");
  }
  
  function removeActiveClass() {
    const activeButtons = document.getElementsByClassName("active");
    for (let btn of activeButtons) {
      btn.classList.remove("active");
    }
  }
  
  // login functionlity
  
  document.getElementById("nav-section").style.display = "none";
  document.getElementById("faq").style.display = "none";
  document.getElementById("banner").style.display = "block";
  document.getElementById("Learn_Vocabularies").style.display="none"
  document.getElementById("child_text").style.display="none"
  


  
  document.getElementById("card_container").style.display = "none";
  document.getElementById("category-container").style.display = "none";
  
  document
    .getElementById("login-btn")
    .addEventListener("click", function (event) {
      event.preventDefault();
  
      const name = document.getElementById("user_name").value;
      const password = document.getElementById("user_password").value;
    //   console.log(name);
  
      if (name === "" || name == null) {
        alert("please fill the form");
        return;
      }
      if (password == "123456") {
        alert("login successfull ");
  
        document.getElementById("nav-section").style.display = "block";
        document.getElementById("banner").style.display = "none";
        document.getElementById("faq").style.display = "block";
        document.getElementById("card_container").style.display = "grid";
        document.getElementById("category-container").style.display = "flex";
         document.getElementById("Learn_Vocabularies").style.display="block"
         document.getElementById("child_text").style.display="block"
        return;
      } else alert("not login please check password and name");
  
      document.getElementById("user_name").value = "";
      document.getElementById("user_password").value = "";
    });
  
  document.getElementById("logout-btn").addEventListener("click", function () {
    document.getElementById("nav-section").style.display = "none";
    document.getElementById("banner").style.display = "flex";
    document.getElementById("faq").style.display = "none";
    document.getElementById("card_container").style.display = "none";
    document.getElementById("category-container").style.display = "none";
  });
  ////////////////////////////// functiond ///////////////////////
  
  function loadLevels() {
    fetch("https://openapi.programming-hero.com/api/levels/all")
      .then((res) => res.json())
      .then((data) => {
        removeActiveClass();
        // console.log(data.data);
        displayLevel(data.data);
      });
  }
  
  function displayLevel(levels) {
    const Category_container = document.getElementById("category-container");
     
    for (const element of levels) {
        
      const div = document.createElement("div");
      div.innerHTML = `
      <button id="btn-${element.level_no}" onclick="loadwords('${element.level_no}')" class="btn border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"><i class="fa-solid fa-book-open"></i>Lession ${element.level_no}</button>
      `;
  
      Category_container.appendChild(div);
    }
  }
  
  function loadwords(categoryName) {
    const activeButton = document.getElementById(`btn-${categoryName}`);
    const buttons = document.querySelectorAll("button");
    for (const button of buttons) {
      if (button.id != `btn-${categoryName}`) {
        button.classList.remove("active");
      }
    }
  
    activeButton.classList.add("active");
  
    showLoader();
    if (categoryName) {
      fetch(`https://openapi.programming-hero.com/api/level/${categoryName}`)
        .then((res) => res.json())
        .then((data) => {
          displaywords(data.data);
        });
    }
  }
  
  function loadword_detail(wordiId) {
    // console.log(wordiId);
    const url = `https://openapi.programming-hero.com/api/word/${wordiId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displaywordDetail(data.data));
  }
  


  
  // function displaywordDetail(data){
  //   console.log(data)
  //   document.getElementById('word_detail').showModal()
  //   const detailContainer = document.getElementById('detail_container')
  //   detailContainer.innerHTML = `
  //   <h1 class="text-3xl font-bold">${data.word}(<i class="fa-solid fa-microphone"></i> ${data.pronunciation})</h1>
  //   <h1 class="text-2xl">Meaning</h1>
  //   <h1 class="text-2xl">${data.meaning}</h1>
  
  //   <h1 class="mt-2 text-2xl">Example</h1>
  //   <h1>${data.sentence}</h1>
  
  //   <h1 class="text-3xl mt-2">সমার্থক শব্দ গুলো</h1>
  
  //  ${for(const keys of data.)}
  
  function displaywordDetail(data) {
    console.log(data);
    document.getElementById("word_detail").showModal();
    const detailContainer = document.getElementById("detail_container");
  
    let htmlContent = `
  
          <h1 class="text-3xl font-bold">${data.word}(<i class="fa-solid fa-microphone"></i> ${data.pronunciation})</h1>
          <h1 class="text-2xl">Meaning</h1>
          <h1 class="text-2xl">${data.meaning}</h1>
          
          <h1 class="mt-2 text-2xl">Example</h1>
          <h1>${data.sentence}</h1>
          
          <h1 class="text-3xl mt-2">সমার্থক শব্দ গুলো</h1>
          `;
  
    if (data.synonyms && data.synonyms.length > 0) {
      htmlContent += `<div class="synonyms-buttons">`;
      data.synonyms.forEach((synonym) => {
        htmlContent += `
                  <button class="synonym-btn bg-blue-500 text-white px-4 py-2 m-1 rounded">
                      ${synonym}
                  </button>
                  `;
      });
      htmlContent += `</div>`;
    } else {
      htmlContent += `<p class="text-2xl font-bold">কোন প্রতিশব্দ উপলব্ধ নেই.</p>`;
    }
  
    detailContainer.innerHTML = htmlContent;
  }
  
  function displaywords(words) {
    const cardContainer = document.getElementById("card_container");
      document.getElementById("child_text").style.display="none"
    // console.log(words);
    cardContainer.innerHTML = "";
  
    if (words.length == 0) {
      cardContainer.innerHTML = `
  
       <div class="px-auto flex flex-col justify-center items-center bg-gray-100 p-4 rounded-md">
 
    <div class= "flex justify-center">
        <img src="./assets/alert-error.png" alt="">
      </div>
      
        <p class="text-gray-600 mb-5 text-sm">ar kono data nai</p>
        <h1 class="font-semibold text-3xl">No data is found</h1>
 
</div>
          `;
      hideLoader();
      return;
    }
    for (const w of words) {
        
      const card = document.createElement("div");
     
      card.innerHTML = `

          <div class="card  bg-gray-100 p-5 rounded-md w-96 h-[250px] shadow-sm">
      <div class="card-body shadow-md p-3 rounded-md ">
        <h2 class="text-3xl font-bold text-center items-center">${w.word}</h2>
        <p class="mt-2 text-center items-center">Meaning /Pronounciation</p>
        <p class="mt-2 text-3xl text-center items-center">${w.meaning} /${w.pronunciation}</p>
        <div class="flex justify-between">
         <button  onclick="loadword_detail('${w.id}')" class="btn bg-blue-100"><i class="fa-solid fa-circle-info"></i></button>
            <button class="btn bg-blue-100"><i class="fa-solid fa-volume-low"></i></button>
  
        </div>
        <div class="card-actions justify-end">
        </div>
      </div>
        
    </div>
          
          `;
      cardContainer.appendChild(card);
    }
    hideLoader();
  }
  // loadwords()
  loadLevels();
  
