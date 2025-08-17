//================ header =====================

// Nav Active State
document.querySelectorAll(".navbar li").forEach(li => {
  li.addEventListener("click", function () {
    document.querySelector(".navbar li.active").classList.remove("active");
    this.classList.add("active");
  });
});



//=====================================
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  let index = 0;
  slides[index].classList.add("active");

  function showSlide(newIndex) {
    slides[index].classList.remove("active");
    index = (newIndex + slides.length) % slides.length;
    slides[index].classList.add("active");
  }

  document.getElementById("heroNext").addEventListener("click", () => {
    showSlide(index + 1);
  });

  document.getElementById("heroPrev").addEventListener("click", () => {
    showSlide(index - 1);
  });

  setInterval(() => {
    showSlide(index + 1);
  }, 4000);
});


// ============= footer 

 
  const scrollBtn = document.getElementById("scrollTopBtn");

  window.onscroll = function() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      scrollBtn.style.display = "block";
    } else {
      scrollBtn.style.display = "none";
    }
  };

  scrollBtn.onclick = function() {
    window.scrollTo({top: 0, behavior: "smooth"});
  };
 


