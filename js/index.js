// device invoking function declared from html file
const searchTechDevice = () => {
  const searchTechDevice = document.getElementById('search');
  const searchTechDeviceText = searchTechDevice.value.toLowerCase();
  if (searchTechDeviceText == '') {
    return messageToClientSection(
      'flex',
      `<h1>Sorry! to bother you dear. Please, try to search tech device!</h1>`
    );
  }
  searchTechDevice.value = '';
  loadDevices(searchTechDeviceText);
  toggleSpinner('flex', 'center');
  messageToClientSection('none', '');
  toggleSingleSearchResult('none');
};

// toggle spinner
const toggleSpinner = (displayStyle, displayStyleAlign) => {
  const spinner = document.getElementById('spinner-section');
  spinner.style.display = displayStyle;
  spinner.style.alignItems = displayStyleAlign;
};

const messageToClientSection = (message, messgeText) => {
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

const loadDevices = async (searchDevice) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchDevice}`;
  try {
    const res = await fetch(url);
    const searchDeviceData = await res.json();
    displaySearchResult(searchDeviceData?.data.slice(0, 20));
  } catch (error) {
    console.log(error.message);
  }
};

const displaySearchResult = (techDevices) => {
  const parentSection = document.getElementById('search-result-card');
  parentSection.textContent = '';
  if (techDevices.length === 0) {
    return (
      messageToClientSection(
        'flex',
        `<h1>Sorry! your search device is not available right now!</h1>`
      ) || toggleSpinner('none')
    );
  } else {
    techDevices.forEach((device) => {
      const childSection = document.createElement('section');
      childSection.classList.add('col-12', 'col-lg-4');
      childSection.innerHTML = `
        <section class="card h-100">
            <img class="card-img-top img-fluid" src="${device?.image}" alt="pic">
            <section class="card-body card-body-text">
                <h2 class="card-title">${device?.brand}</h2>
                <h4 class="card-text text-muted">${device?.phone_name}</h4>
                <button onclick="techDeviceDetails('${device?.slug}')" class="btn btn-primary">Details</button>
            </section>
        </section>    
        `;
      parentSection.appendChild(childSection);
    });
  }
  toggleSpinner('none', '');
};

const techDeviceDetails = async (techDeviceId) => {
  const url = `https://openapi.programming-hero.com/api/phone/${techDeviceId}`;
  try {
    const res = await fetch(url);
    const techDeviceDetailsData = await res.json();
    displayTechDeviceDetails(techDeviceDetailsData?.data);
  } catch (error) {
    console.log(error.message);
  }
};

const displayTechDeviceDetails = (techDeviceDetails) => {
  const parentSection = document.getElementById('single-result-card');
  parentSection.textContent = '';
  const childSection = document.createElement('section');
  childSection.innerHTML = `
      <section class="card">
            <img class="img-fluid h-25 w-50 ms-5" src="${
              techDeviceDetails?.image
            }">
            <section class="card-header card-heading-text">
                <h2 class="card-title">${techDeviceDetails?.brand}</h2>
                <h4 class="card-subtitle mb-2">${techDeviceDetails?.name}</h4>
                <h5 class="card-subtitle mb-2 text-muted">${
                  techDeviceDetails?.releaseDate
                    ? techDeviceDetails?.releaseDate
                    : 'Release date information is not available at the moment'
                }</h5>
            </section>
            <section class="card-body card-body-text">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><span class="fw-bolder">Chip:</span> ${
                      techDeviceDetails?.mainFeatures?.chipSet
                        ? techDeviceDetails?.mainFeatures?.chipSet
                        : 'Information is not available at the moment'
                    }</li>
                    <li class="list-group-item"><span class="fw-bolder">Display:</span> ${
                      techDeviceDetails?.mainFeatures?.displaySize
                        ? techDeviceDetails?.mainFeatures?.displaySize
                        : 'Information is not available at the moment'
                    }</li>
                    <li class="list-group-item"><span class="fw-bolder">Memory:</span> ${
                      techDeviceDetails?.mainFeatures?.memory
                        ? techDeviceDetails?.mainFeatures?.memory
                        : 'Information is not available at the moment'
                    }</li>
                    <li class="list-group-item"><span class="fw-bolder">Storage:</span> ${
                      techDeviceDetails?.mainFeatures?.storage
                        ? techDeviceDetails?.mainFeatures?.storage
                        : 'Information is not available at the moment'
                    }</li>
                    <li class="list-group-item"><span class="fw-bolder">Sensors:</span> ${
                      techDeviceDetails?.mainFeatures?.sensors
                        ? techDeviceDetails?.mainFeatures?.sensors
                        : 'Information is not available at the moment'
                    }</li>
                    <li class="list-group-item"><span class="fw-bolder">Bluetooth:</span> 
                    ${
                      techDeviceDetails?.others?.Bluetooth
                        ? techDeviceDetails?.others?.Bluetooth
                        : 'Information is not available at the moment'
                    }
                    </li>
                    <li class="list-group-item"><span class="fw-bolder">USB:</span> 
                        ${
                          techDeviceDetails?.others?.USB
                            ? techDeviceDetails?.others?.USB
                            : 'Information is not available at the moment'
                        }
                    </li>
                    <li class="list-group-item"><span class="fw-bolder">GPS:</span> 
                    ${
                      techDeviceDetails?.others?.GPS
                        ? techDeviceDetails?.others?.GPS
                        : 'Information is not available at the moment'
                    }
                    </li>
                    <li class="list-group-item"><span class="fw-bolder">NFC:</span> 
                    ${
                      techDeviceDetails?.others?.NFC
                        ? techDeviceDetails?.others?.NFC
                        : 'Information is not available at the moment'
                    }
                    </li>  
                    <li class="list-group-item"><span class="fw-bolder">Radio:</span> 
                    ${
                      techDeviceDetails?.others?.Radio
                        ? techDeviceDetails?.others?.Radio
                        : 'Information is not available at the moment'
                    }
                    </li>
                    <li class="list-group-item"><span class="fw-bolder">WLAN:</span> ${
                      techDeviceDetails?.others?.WLAN
                        ? techDeviceDetails?.others?.WLAN
                        : 'Information is not available at the moment'
                    }
                    </li>

                </ul>
            </section>
        </section>
    `;
  parentSection.appendChild(childSection);
  toggleSingleSearchResult('block');
};
