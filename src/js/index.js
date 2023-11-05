const destinationItems = document.querySelectorAll('.destination-items');
const navbarItems = document.querySelectorAll('.navbar-item');

function activateItem(items) {
  items.forEach(item => {
    item.addEventListener('click', () => {
      items.forEach(item => item.classList.remove('active'));
      item.classList.add('active');

      const textWidth = item.offsetWidth;
      console.log(textWidth);
      const line = item.querySelector('::after');
      if (line) {
        line.style.width = `${textWidth}px`;
      }
    });
  });
} 

activateItem(destinationItems);
activateItem(navbarItems);

  // Підключення JSON файлу
  
document.addEventListener('DOMContentLoaded', function() {
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      function updateContent(page, index) {
        if (page === 'home') {
          const destination = data.destinations[index];
                            
          const destinationTitle = document.querySelector('.destination-title');
          destinationTitle.textContent = destination.name;

          const destinationText = document.querySelector('.destination-text');
          destinationText.textContent = destination.description;

          const distance = document.querySelector('.info-distance');
          distance.textContent = destination.distance;

          const travelTime = document.querySelector('.info-travel-time');
          travelTime.textContent = destination.travel;

          const imgPlanet = document.querySelector('.img-planet');
          imgPlanet.src = destination.images.webp;
          imgPlanet.alt = `img-${destination.name.toLowerCase()}`;

          } else if (page === 'crew') {
          const crewMember = data.crew[index];
                   
          // Оновлюєм вміст сторінки з екіпажем за допомогою crewMember
          const crewTitle = document.querySelector('.crew-title');
          crewTitle.textContent = crewMember.name;

          const crewText = document.querySelector('.crew-text');
          crewText.textContent = crewMember.bio;

          const role = document.querySelector('.crew-h2');
          role.textContent = crewMember.role;

          const imgCrew = document.querySelector('.img-crew');
          imgCrew.src = crewMember.images.webp;
          imgCrew.alt = `img-${crewMember.name.toLowerCase()}`;
                    
        } else if (page === 'technology') {
          const technology = data.technology[index];
          
          // Оновлюєм вміст сторінки з технологією за допомогою technology
          const techTitle = document.querySelector('.tech-title');
          techTitle.textContent = technology.name;

          const techText = document.querySelector('.tech-text');
          techText.textContent = technology.description;

          const imgTech = document.querySelector('.img-tech');
          imgTech.src = technology.images.landscape;
          imgTech.alt = `img-${technology.name.toLowerCase()}`;
          imgTech.style.backgroundImage = `url(${technology.images.portrait})`;
         
        }
      }
      function setupPageClickHandlers(page) {
        document.querySelectorAll(`[data-page="${page}"]`).forEach(i => {
          i.addEventListener('click', function(event) {
            event.preventDefault();
            const index = this.getAttribute('data-index');
            if (page && index !== null) {
              updateContent(page, parseInt(index));
            }
          });
        });
      }
      
   // Викликємо функцію для кожної сторінки
      setupPageClickHandlers('home');
      setupPageClickHandlers('crew');
      setupPageClickHandlers('technology');

    document.querySelectorAll('li').forEach((li, index) => {
      li.addEventListener('click', function() {
        const page = this.getAttribute('data-page');
        if (page) {
          updateContent(page, index);
        }
      });
    });
      


    });

});

  