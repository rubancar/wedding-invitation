import '../css/main.css'

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Add animation when sections come into view
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('.content-section').forEach(section => {
  observer.observe(section);
});

const firstBg = document.getElementsByClassName("fixed-bg")[0];
function checkScroll() {
  const scrollPosition = window.scrollY;
  const viewportHeight = window.innerHeight;
  firstBg.style.opacity = `${1 - scrollPosition / viewportHeight}`;
}

let isScrolling;
window.addEventListener('scroll', function() {
  window.clearTimeout(isScrolling);
  isScrolling = setTimeout(checkScroll, 5);
}, false);

checkScroll();

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
  const latitude = event.target.getAttribute("location-latitude");
  const longitude = event.target.getAttribute("location-longitude");
  const place = {
    name: name,
    latitude: latitude,
    longitude: longitude,
  };

  // Check if iOS (iPhone/iPad)
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  // iOS: Open Apple Maps
  if (isIOS) {
    const url = `maps://?q=${encodeURIComponent(place.name)}&ll=${place.latitude},${place.longitude}`;
    window.location.href = url;

    // Fallback to Apple Maps web link if deep link fails
    setTimeout(() => {
      window.open(`https://maps.apple.com/?q=${encodeURIComponent(place.name)}&ll=${place.latitude},${place.longitude}`, '_blank');
    }, 500);
  }
  // Android/Desktop: Open Google Maps
  else {
    const url = `https://www.google.com/maps/search/?api=1&query=${place.latitude},${place.longitude}`;
    window.open(url, '_blank');
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////
