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
    childSection.classList.add('col');
    // console.log(mobile);
    childSection.innerHTML = `
        <section class="card h-100">
            <img class="card-img-top" src="${mobile?.image}" alt="pic">
            <section class="card-body">
                <h2 class="card-title">${mobile?.brand}</h2>
                <h3 class="card-text">${mobile?.phone_name}</h3>
                <button onclick="phoneDetails('${mobile?.slug}')" class="btn btn-primary">Details</button>
            </section>
        </section>    
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
      <div class="card">
            <img src="${details?.image}">
            <h2 class="card-title">${details?.brand}</h2>
            <h3 class="card-subtitle mb-2 text-muted">${details?.name}</h3>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">${
                  details?.releaseDate
                    ? details?.releaseDate
                    : 'Release date unknown'
                }</li>
                <li class="list-group-item">${
                  details?.mainFeatures?.chipSet
                    ? details?.mainFeatures?.chipSet
                    : 'ji'
                }</li>
                <li class="list-group-item">${
                  details?.mainFeatures?.displaySize
                    ? details?.mainFeatures?.displaySize
                    : 'ji'
                }</li>
                <li class="list-group-item">${
                  details?.mainFeatures?.memory
                    ? details?.mainFeatures?.memory
                    : 'ji'
                }</li>
                <li class="list-group-item">${
                  details?.mainFeatures?.storage
                    ? details?.mainFeatures?.storage
                    : 'ji'
                }</li>
                <li class="list-group-item">${
                  details?.mainFeatures?.sensors
                    ? details?.mainFeatures?.sensors
                    : 'Iformation not found'
                }</li>
                <li class="list-group-item">
                    ${
                      details?.others?.Bluetooth
                        ? details?.others?.Bluetooth
                        : 'Iformation not found'
                    }
                </li>
                <li class="list-group-item">
                    ${
                      details?.others?.USB
                        ? details?.others?.USB
                        : 'Iformation not found'
                    }
                </li>
                <li class="list-group-item">
                    ${
                      details?.others?.GPS
                        ? details?.others?.GPS
                        : 'Iformation not found'
                    }
                </li>
                <li class="list-group-item">
                    ${
                      details?.others?.NFC
                        ? details?.others?.NFC
                        : 'Iformation not found'
                    }
                </li>
                <li class="list-group-item">
                    ${
                      details?.others?.Radio
                        ? details?.others?.Radio
                        : 'Iformation not found'
                    }
                </li>
                <li class="list-group-item">${
                  details?.others?.WLAN
                    ? details?.others?.WLAN
                    : 'Iformation not found'
                }
                </li>
            </ul>    
        </div>
    `;
  parentSection.appendChild(childSection);
};
