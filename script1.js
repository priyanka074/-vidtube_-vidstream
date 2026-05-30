
document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const clearBtn = document.getElementById("clearSearchBtn");

  const videoLists = document.querySelectorAll(".side-video-list");

  // Search submit
  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm) {
      localStorage.setItem("searchTerm", searchTerm);
      filterVideos(searchTerm);
    }
  });

  // Clear search
  clearBtn.addEventListener("click", function () {
    searchInput.value = "";
    localStorage.removeItem("searchTerm");
    resetVideos();
  });

  // Auto reset when input is cleared manually
  searchInput.addEventListener("input", function () {
    if (this.value.trim() === "") {
      localStorage.removeItem("searchTerm");
      resetVideos();
    }
  });

  // Apply saved search on reload
  const storedTerm = localStorage.getItem("searchTerm");
  if (storedTerm) {
    searchInput.value = storedTerm;
    filterVideos(storedTerm);
  }

  function filterVideos(term) {
    let found = false;
    videoLists.forEach(video => {
      const title = video.querySelector(".vid-info a")?.textContent.toLowerCase() || "";
      const desc = video.querySelector(".vid-info p")?.textContent.toLowerCase() || "";
      if (title.includes(term) || desc.includes(term)) {
        video.style.display = "";
        found = true;
      } else {
        video.style.display = "none";
      }
    });

    if (!found) alert("No videos found matching your search.");
  }

  function resetVideos() {
    videoLists.forEach(video => {
      video.style.display = "";
    });
  }
});
