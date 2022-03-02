const searchMobile = () => {
  const searchInput = document.getElementById('search');
  const searchInputText = searchInput.value;
  if (searchInputText == '') {
    return messageSection(
      'flex',
      'Sorry! to bother you dear. Please, try to search tech device!'
    );
  }
  searchInput.value = '';
  loadMobiles(searchInputText);
  toggleSpinner('flex', 'center');
  messageSection('none', '');
  toggleSingleSearchResult('none');
};

// toggle spinner
const toggleSpinner = (displayStyle, displayStyleAlign) => {
  const spinner = document.getElementById('spinner-section');
  spinner.style.display = displayStyle;
  spinner.style.alignItems = displayStyleAlign;
};

const messageSection = (message, messgeText) => {
  const textMessage = document.getElementById('message-section');
  textMessage.classList.add(
    'message-section-heading',
    'message-section-heading-highlight'
  );
  textMessage.style.display = message;
  textMessage.innerHTML = messgeText;
};

// toggle single search result
const toggleSingleSearchResult = (displaySingleResult) => {
  document.getElementById('single-result-card').style.display =
    displaySingleResult;
};

// toggle single search result
// const toggleSeeMore = (displaySeeMore) => {
//   document.getElementById('see-more').style.display = displaySeeMore;
// };

const loadMobiles = async (searchInputText) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchInputText}`;
  try {
    const res = await fetch(url);
    const searchMobileData = await res.json();
    // if (Object.keys(searchMobileData).length <= 20) {
    // console.log(Object.keys(searchMobileData?.data).length);
    displaySearchResult(searchMobileData?.data.slice(0, 20));
    // } else {
    //   displaySearchResult(searchMobileData?.data.slice(20));
    //   toggleSeeMore('block');
    // }
  } catch (error) {
    console.log(error.message);
  }
};

const displaySearchResult = (mobiles) => {
  const parentSection = document.getElementById('search-result-card');
  // parentSection.
  parentSection.textContent = '';
  if (mobiles.length === 0) {
    return (
      messageSection(
        'flex',
        'Sorry! your search device is not available right now!'
      ) || toggleSpinner('none')
    );
  } else {
    mobiles.forEach((mobile) => {
      const childSection = document.createElement('section');
      childSection.classList.add('col');
      console.log(mobile.length);
      childSection.innerHTML = `
        <section class="card h-100">
            <img class="card-img-top" src="${mobile?.image}" alt="pic">
            <section class="card-body card-body-text">
                <h2 class="card-title">${mobile?.brand}</h2>
                <h3 class="card-text">${mobile?.phone_name}</h3>
                <button onclick="phoneDetails('${mobile?.slug}')" class="btn btn-primary">Details</button>
            </section>
        </section>    
        `;
      parentSection.appendChild(childSection);
    });
  }
  toggleSpinner('none', '');
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
      <section class="card">
            <img class="img-fluid h-25 w-25 ms-5" src="${details?.image}">
            <section class="card-header card-heading-text">
                <h2 class="card-title">${details?.brand}</h2>
                <h3 class="card-subtitle mb-2">${details?.name}</h3>
                <h3 class="card-subtitle mb-2 text-muted">${
                  details?.releaseDate
                    ? details?.releaseDate
                    : 'Release date unknown'
                }</h3>
            </section>
            <section class="card-body card-body-text">
                <ul class="list-group list-group-flush">
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
            </section>
        </section>
    `;
  parentSection.appendChild(childSection);
  toggleSingleSearchResult('block');
};
