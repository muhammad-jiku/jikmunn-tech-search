const searchMobile = () => {
  const searchInput = document.getElementById('search');
  const searchInputText = searchInput.value;
  if (searchInputText == '') {
    return alert('xcfgvhbj');
  }
  searchInput.value = '';
  loadMobiles(searchInputText);
};

const loadMobiles = async (searchInputText) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchInputText}`;
  try {
    const res = await fetch(url);
    const searchMobileData = await res.json();
    displaySearchResult(searchMobileData?.data.slice(0, 20));
  } catch (error) {
    console.log(error.message);
  }
};

const displaySearchResult = (mobiles) => {
  const parentSection = document.getElementById('search-result-card');
  parentSection.textContent = '';
  mobiles.forEach((mobile) => {
    const childSection = document.createElement('section');
    // console.log(mobile);
    childSection.innerHTML = `
            <img onclick="phoneDetails('${mobile?.slug}')" src="${mobile?.image}">
            <h2>${mobile?.brand}</h2>
            <h3>${mobile?.phone_name}</h3>
        `;
    parentSection.appendChild(childSection);
  });
};

const phoneDetails = async (phoneId) => {
  const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
  try {
    const res = await fetch(url);
    const phoneDetailsData = await res.json();
    displayPhoneDetails(phoneDetailsData?.data);
  } catch (error) {
    console.log(error.message);
  }
};

const displayPhoneDetails = (details) => {
  const parentSection = document.getElementById('single-result-card');
  parentSection.textContent = '';
  const childSection = document.createElement('section');
  console.log(details);
  childSection.innerHTML = `
      <img src="${details?.image}">
      <h2>${details?.brand}</h2>
      <h3>${details?.name}</h3>
      <h4>${
        details?.releaseDate ? details?.releaseDate : 'Release date unknown'
      }</h4>
      <h4>${
        details?.mainFeatures?.chipSet ? details?.mainFeatures?.chipSet : 'ji'
      }</h4>
      <h4>${
        details?.mainFeatures?.displaySize
          ? details?.mainFeatures?.displaySize
          : 'ji'
      }</h4>
      <h4>${
        details?.mainFeatures?.memory ? details?.mainFeatures?.memory : 'ji'
      }</h4>
      <h4>${
        details?.mainFeatures?.storage ? details?.mainFeatures?.storage : 'ji'
      }</h4>
      <h4>${
        details?.mainFeatures?.sensors
          ? details?.mainFeatures?.sensors
          : 'Iformation not found'
      }</h4>
        <h4>
            ${
              details?.others?.Bluetooth
                ? details?.others?.Bluetooth
                : 'Iformation not found'
            }
        </h4>
        <h4>
            ${
              details?.others?.USB
                ? details?.others?.USB
                : 'Iformation not found'
            }
        </h4>
        <h4>
            ${
              details?.others?.GPS
                ? details?.others?.GPS
                : 'Iformation not found'
            }
        </h4>
        <h4>
            ${
              details?.others?.NFC
                ? details?.others?.NFC
                : 'Iformation not found'
            }
        </h4>
        <h4>
            ${
              details?.others?.Radio
                ? details?.others?.Radio
                : 'Iformation not found'
            }
        </h4>
        <h4>${
          details?.others?.WLAN ? details?.others?.WLAN : 'Iformation not found'
        }
        </h4>
    `;
  parentSection.appendChild(childSection);
};
