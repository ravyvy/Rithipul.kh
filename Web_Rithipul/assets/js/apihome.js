
const api = "http://localhost:1000/api/service/getlist";
const apivaluse = "http://localhost:1000/api/values/getlist";
const apiMilestone = "http://localhost:1000/api/Milestone/getlist";
const apimision = "http://localhost:1000/api/mision/getlist";
const apicurriculum = "http://localhost:1000/api/curriculum/getlist";
const apiachievement = "http://localhost:1000/api/achievement/getlist";

var currentLanguage = 'en';
const languageSelect = document.getElementById('languageSelect');

// Fetch services and render cards
function loadServices() {
  const serviceList = document.getElementById("serviceList");
  if (!serviceList) return;

  fetch(api)
    .then(res => {
      if (!res.ok) throw new Error("API not found");
      return res.json();
    })
    .then(result => {
      const services = Array.isArray(result.data) ? result.data : [];
      if (!services.length) {
        serviceList.innerHTML = "<p>No services found</p>";
        return;
      }

      serviceList.innerHTML = "";
      services.forEach(item => {
        // Split description into list
        const descriptions = item.description ? item.description.split('-').filter(i => i.trim() !== "") : [];
        const descHtml = '<ul style="list-style: none; padding: 0;">' +
          descriptions.map(text => `<li>- ${text.trim()}</li>`).join('') +
          '</ul>';

        // Render card with data-en and data-kh
        serviceList.innerHTML += `
            <div class="col-lg-4">
              <div class="feature-card">
                <div class="feature-icon">
                  <i class="${item.icon_path || 'bi bi-easel'}"></i>
                </div>
                <div class="feature-content title-font">
                  <h3 data-en="${item.category_en}" data-kh="${item.category_kh}">${item.category_en}</h3>
                  <div class="desc-text" data-en="${item.description}" data-kh="${item.description_kh}">
                    ${descHtml}
                  </div>
                </div>
              </div>
            </div>
          `;
      });

      // Apply saved language after rendering
      switchLanguage(currentLanguage);
    })
    .catch(err => {
      console.error("API Error:", err);
      serviceList.innerHTML = `<p style="color:red">${err.message}</p>`;
    });
}
// loadServices();
//   values
function loadValues() {
  const valueList = document.getElementById("valueList");
  if (!valueList) return;

  fetch(apivaluse)
    .then(res => {
      if (!res.ok) throw new Error("API not found");
      return res.json();
    })
    .then(result => {
      const values = Array.isArray(result.data) ? result.data : [];
      if (!values.length) {
        valueList.innerHTML = "<p>No values found</p>";
        return;
      }
      valueList.innerHTML = "";
      values.forEach(value => {
        valueList.innerHTML += `
          <div class="col">
            <div class="value-card">
              <div class="value-icon">
                <i class="${value.icon_path || 'bi bi-award-fill'}"></i>
              </div>
              <h4 data-en="${value.category_en}" data-kh="${value.category_kh}" style="color: rgb(19, 73, 138);">
              ${value.category_en}
              </h4>
              <p data-en="${value.description_en}" data-kh="${value.description_kh}">
                ${value.description_en}
              </p>
            </div>
          </div>
        `;
      });

      // Apply current language after rendering
      switchLanguage(currentLanguage);
    })
    .catch(err => {
      console.error("API Error:", err);
      valueList.innerHTML = `<p style="color:red">${err.message}</p>`;
    });
}
loadValues();

// Milestone
function loadMilestone() {
  const Milestone = document.getElementById("timeline");
  if (!Milestone) return;

  fetch(apiMilestone)
    .then(res => {
      if (!res.ok) throw new Error("API not found");
      return res.json();
    })
    .then(result => {
      const Mileston = Array.isArray(result.data) ? result.data : [];
      if (!Mileston.length) {
        Milestone.innerHTML = "<p>No values found</p>";
        return;
      }

      Milestone.innerHTML = "";

      Mileston.forEach(Mileston => {
        Milestone.innerHTML += `
                     <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <div class="timeline-content">
                            <h4 data-en="${Mileston.year}">${Mileston.year}</h4>
                            <p data-kh="${Mileston.text_kh}" data-en="${Mileston.text}">${Mileston.text}( YFDF)
                            </p>
                  </div>
        `;
      });
      // Apply current language after rendering
      switchLanguage(currentLanguage);
    })
    .catch(err => {
      console.error("API Error:", err);
      valueList.innerHTML = `<p style="color:red">${err.message}</p>`;
    });
}
loadMilestone();

// api mision _ vision 
function loadmision() {
  const mision_vision = document.getElementById("mision_vision");
  if (!mision_vision) return;

  fetch(apimision)
    .then(res => {
      if (!res.ok) throw new Error("API not found");
      return res.json();
    })
    .then(result => {
      const mision = Array.isArray(result.data) ? result.data : [];
      if (!mision.length) {
        mision_vision.innerHTML = "<p>No values found</p>";
        return;
      }
      mision_vision.innerHTML = "";
      mision.forEach(itemmision => {
        mision_vision.innerHTML += `
                <img src="${itemmision.img}" alt="Campus" class="img-fluid rounded">
              <div class="mission-vision title-font text-center" data-aos="fade-up" data-aos-delay="400">
                <div class="mission">
                  <h3 style="color: rgb(19, 73, 138);" class="fw-bold" data-kh="${itemmision.title_mision_kh}"  data-en="${itemmision.title_mision}">${itemmision.title_mision}</h3>
                  <p style="color: rgb(19, 73, 138);"data-kh="${itemmision.mision_kh}"  data-en="${itemmision.mision}">${itemmision.mision}</p>
                  <a href="about.html" class="ms-3" data-kh="មើលបន្ថែម....."> See more.....</a>
                </div>
                <div class="vision text-center">
                  <h3 style="color: rgb(19, 73, 138);" class="fw-bold"data-kh="${itemmision.title_vision_kh}"  data-en="${itemmision.title_vision}">${itemmision.title_vision}</h3>
                  <p style="color: rgb(19, 73, 138);"data-kh="${itemmision.vision_kh}"  data-en="${itemmision.vision}">${itemmision.vision}</p>
                  <a href="about.html" class="ms-3" data-kh="មើលបន្ថែម....."> See more.....</a>
                </div>
              </div>
        `;
      });

      // Apply current language after rendering
      switchLanguage(currentLanguage);
    })
    .catch(err => {
      console.error("API Error:", err);
      valueList.innerHTML = `<p style="color:red">${err.message}</p>`;
    });
}
loadmision();
// api apicurriculum
function loadcurriculum() {
  const curriculums = document.getElementById("curriculum");
  if (!curriculums) return;

  fetch(apicurriculum)
    .then(res => {
      if (!res.ok) throw new Error("API not found");
      return res.json();
    })
    .then(result => {
      const curriculum = Array.isArray(result.data) ? result.data : [];
      if (!curriculum.length) {
        curriculums.innerHTML = "<p>No values found</p>";
        return;
      }
      curriculums.innerHTML = "";
      curriculum.forEach(itemcurriculums => {
        curriculums.innerHTML += `
                <div class="col-xl-6 " data-aos="fade-up" data-aos-delay="100">
              <article class="post-item d-flex " style="background-color: rgb(182, 135, 45);">
                <div class="post-img">
                  <img src="${itemcurriculums.img}"
                    alt="" class="img-fluid" loading="lazy">
                </div>

                <div class="post-content flex-grow-1">
                  <p class="post-description text-white "
                    data-kh="${itemcurriculums.text_kh}" data-en="${itemcurriculums.text}">
                 ${itemcurriculums.text}
                  </p>

                </div>
              </article>
            </div>
        `;
      });

      // Apply current language after rendering
      switchLanguage(currentLanguage);
    })
    .catch(err => {
      console.error("API Error:", err);
      valueList.innerHTML = `<p style="color:red">${err.message}</p>`;
    });
}
loadcurriculum();
function loadAchievement() {
  const Achievements = document.getElementById("Achievement");
  if (!Achievements) return;

  fetch(apiachievement)
    .then(res => {
      if (!res.ok) throw new Error("API not found");
      return res.json();
    })
    .then(result => {
      const achievement = Array.isArray(result.data) ? result.data : [];
      if (!achievement.length) {
        Achievements.innerHTML = "<p>No values found</p>";
        return;
      }
      Achievements.innerHTML = "";
      achievement.forEach(itemaciment => {
        Achievements.innerHTML += `
                <div class="col-lg-6 col-md-6" data-aos="zoom-in" data-aos-delay="200">
                <div class="event-item">
                  <div class="event-image">
                    <img src="${itemaciment.img}" alt="Workshop" class="img-fluid">
                    <div class="event-date-overlay">
                      <span class="date"><img src="assets/img/achiment/youth.png" style="width: 40px;"></span>
                    </div>
                  </div>
                  <div class="event-details">
                    <p class="" data-kh="${itemaciment.text_kh} " data-en="${itemaciment.text}">${itemaciment.text}</p>
                  </div>
                </div>
          </div>
        `;
      });

      // Apply current language after rendering
      switchLanguage(currentLanguage);
    })
    .catch(err => {
      console.error("API Error:", err);
      valueList.innerHTML = `<p style="color:red">${err.message}</p>`;
    });
}
loadAchievement();

