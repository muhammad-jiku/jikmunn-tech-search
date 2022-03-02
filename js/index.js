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
    console.log(searchMobileData?.data);
  } catch (error) {
    console.log(error);
  }
};
