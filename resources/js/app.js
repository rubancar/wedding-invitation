import '../css/main.css'
import wedding_music_mp3 from '../music/i_just_want_to_be_your_everything.mp3?url'
import vestimenta_itinario_pdf from '../files/vestimenta_itinerario.pdf?url'
import play_svg from '../images/svgs/play_button.svg?raw'
import pause_svg from '../images/svgs/pause_button.svg?raw'

////********** SAVE TO CALENDAR ACTION BUTTON **********////////////
document.getElementById('wedding-day-btn').addEventListener('click', addToCalendar);

function addToCalendar() {
  const eventDetails = {
    title: "Boda Andrés y Tamara",
    description: "Ceremonia religiosa: Iglesia Nuestra Señora de la Alborada; Recepción: Iguanazú",
    location: "Alborada / Iguanazú",
    startTime: "2026-01-03T12:00:00",
    endTime: "2026-01-03T20:00:00",
  };

  // For iOS (Web Share API)
  if (navigator.share) {
    navigator.share({
      title: eventDetails.title,
      text: `${eventDetails.description}\nLocation: ${eventDetails.location}`,
      url: generateGoogleCalendarLink(eventDetails), // Fallback URL
    }).catch(err => {
      console.error("Error sharing:", err);
      openFallbackCalendarLink(eventDetails);
    });
  }
  // For Android & Desktop (Google Calendar Link)
  else {
    openFallbackCalendarLink(eventDetails);
  }
}

// Generates a Google Calendar link (works on Android & Desktop)
function generateGoogleCalendarLink(event) {
  const start = new Date(event.startTime).toISOString().replace(/-|:|\.\d+/g, '');
  const end = new Date(event.endTime).toISOString().replace(/-|:|\.\d+/g, '');

  return encodeURI(
    `https://www.google.com/calendar/render?action=TEMPLATE` +
    `&text=${event.title}` +
    `&details=${event.description}` +
    `&location=${event.location}` +
    `&dates=${start}/${end}`
  );
}

// Opens the calendar link in a new tab
function openFallbackCalendarLink(event) {
  window.open(generateGoogleCalendarLink(event), '_blank');
}
/////////////////////////////////////////////////////////////////////////////////////////


//////////////********* OPEN LOCATION OF SITES ON MAPS APPLICATION *********/////////////
document.querySelectorAll('.location-site').forEach(element => {
  element.addEventListener('click', openMaps);
});

function openMaps(event) {

  const name = event.target.getAttribute("location-name");
 /* const latitude = event.target.getAttribute("location-latitude");
  const longitude = event.target.getAttribute("location-longitude");*/

  const googleMapsIglesiaURL = "https://www.google.com/maps/search/?api=1&query=-2.1394773%2C-79.9014029&query_place_id=ChIJ5YYfE21tLZARQWMtdWL9Q9Q"
  const googleMapsIguanazuURL = "https://www.google.com/maps/search/?api=1&query=-2.1677502%2C-79.9265392&query_place_id=ChIJO2-SYnRyLZARg6Vq7bcRetY"

  let url;
  if (name.includes("Alborada")) {
    url = googleMapsIglesiaURL;
  } else {
    url = googleMapsIguanazuURL;
  }
  window.open(url, '_blank');

}
////////////////////////////////////////////////////////////////////////////////////////////////////
const audio = new Audio(wedding_music_mp3);
const playButton = document.getElementById('play-button');
function playBackgroundMusic() {
  audio.loop = true;
  audio.volume = 1; // Set volume to 50% (adjust as needed)

  audio.play().catch(e => {
    console.error('Audio playback failed:', e);
  });
  playButton.innerHTML = pause_svg;
  playButton.removeEventListener('click', playBackgroundMusic);
  playButton.addEventListener('click', pauseBackgroundMusic);
}

function pauseBackgroundMusic() {
  audio.pause();
  playButton.innerHTML = play_svg;
  playButton.removeEventListener('click', pauseBackgroundMusic);
  playButton.addEventListener('click', playBackgroundMusic);
}

playButton.addEventListener('click', playBackgroundMusic);
playButton.innerHTML = play_svg;


/////////////////////////////////////////////////////////////////////////////////////////////////
document.querySelectorAll(".slide-open:checked").forEach(slide => {
  const initialChecked = slide.getAttribute("id");
  document.getElementById(`${initialChecked}-text`).classList.add("display");
  console.log(initialChecked)
})
document.querySelectorAll(".slide-open").forEach(element => {
  element.addEventListener("change", (event) => {
    document.querySelectorAll(".slide-text > p").forEach(element => {
      element.classList.remove("display");
    })
      const target = event.target;
      const targetId = target.getAttribute("id");
      document.getElementById(`${targetId}-text`).classList.add("display");
      console.log(targetId);
  });
})

////////////////////////// VESTIMENTA BUTTON ////////////////////////////////////////////////////

/*document.getElementById("vestimentaItinerarioPdf").addEventListener('click', () => {
  window.open(vestimenta_itinario_pdf, '_blank');
})*/

///////////////////////////////// COUNTDOWN FUNCTIONALITY ///////////////////////////////////////
function startCountdown(targetDate) {
  // Get all the countdown elements
  const daysElement = document.getElementById('countdown-days');
  const hoursElement = document.getElementById('countdown-hours');
  const minutesElement = document.getElementById('countdown-minutes');

  function updateCountdown() {
    // Get current date and time
    const now = new Date();
    // Calculate the difference between target and now
    const diff = targetDate - now;

    // If countdown is finished
    if (diff <= 0) {
      daysElement.textContent = '0';
      hoursElement.textContent = '0';
      minutesElement.textContent = '0';
      clearInterval(countdownInterval);
      return;
    }

    // Calculate days, hours, minutes
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    // Update the DOM elements
    daysElement.textContent = days.toString();
    hoursElement.textContent = hours.toString().padStart(2, '0');
    minutesElement.textContent = minutes.toString().padStart(2, '0');
  }

  // Initial update
  updateCountdown();

  // Update every minute (60000 milliseconds)
  const countdownInterval = setInterval(updateCountdown, 60000);
}


document.addEventListener('DOMContentLoaded', () => {
  // 0 = January
  const targetDate = new Date(2026, 0, 3, 12, 0); // December 31, 2024 at 23:59
  startCountdown(targetDate);

  //////////////////////// ACCORDION EFFECTS //////////////////////////////////////////////////////
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const item = this.parentNode;
      const content = this.nextElementSibling;

      // Check if the clicked item is already active
      const isActive = item.classList.contains('active');

      // Close all accordion items
      document.querySelectorAll('.accordion-item').forEach(accItem => {
        accItem.classList.remove('active');
        accItem.querySelector('.accordion-content').style.maxHeight = '0';
      });

      // If it wasn't active, open it
      if (!isActive) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // Close all accordions by default on page load
  document.querySelectorAll('.accordion-content').forEach(content => {
    content.style.maxHeight = '0';
  });
});


/////////////////////////// CONFIRM INVITATION ////////////////////////////////////////////////////
function confirmRequest() {
  const currentUrl = window.location.href;
  const urlParts = currentUrl.split('/');
  const idToSend = urlParts[urlParts.length - 1];

  if (!idToSend) {
    console.error('Error: No ID found in the URL');
    return;
  }

  const jsonData = {
    id: idToSend
  };

  fetch('/confirm', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jsonData)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      if (data === 'ok') {
        console.log('Request successful: Everything went OK');
        updateInviteButton();
      } else {
        console.error(`Error: Unexpected response: ${data}`);
      }
    })
    .catch(error => {
      console.error('Error making request:', error);
    });
}

function updateInviteButton() {
  const confirmBtn = document.getElementById('confirm-button')
  confirmBtn.removeEventListener('click', confirmRequest);
  confirmBtn.innerHTML = 'has confirmado';
}

document.getElementById('confirm-button')?.addEventListener('click', confirmRequest);
