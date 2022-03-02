const searchMobile = () => {
  const searchInput = document.getElementById('search');
  const searchInputText = searchInput.value;
  searchInput.value = '';
  loadMobiles(searchInputText);
};

const loadMobiles = async (searchInputText) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchInputText}`;
  try {
    const res = await fetch(url);
    const searchMobileData = await res.json();
    displaySearchResult(searchMobileData?.data);
  } catch (error) {
    console.log(error);
  }
};

const displaySearchResult = (mobiles) => {
  const parentSection = document.getElementById('search-result-card');
  parentSection.textContent = '';
  mobiles.forEach((mobile) => {
    const childSection = document.createElement('section');
    console.log(mobile);
    childSection.innerHTML = `Sorry this mobile is not available now!`;
    childSection.innerHTML = `
            <img src="${mobile?.image}">
            <h2>${mobile?.brand}</h2>
            <h3>${mobile?.phone_name}</h3>
        `;
    parentSection.appendChild(childSection);
  });
  //   }
};
