// Toggle sidebar
const menuicon = document.querySelector(".menu-icon");
const sidebar = document.querySelector(".sidebar");
const container = document.querySelector(".container");

menuicon.onclick = function () {
    sidebar.classList.toggle("small-sidebar");
    container.classList.toggle("large-container");
};

// Search functionality
document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("searchInput");
    const clearBtn = document.getElementById("clearSearchBtn");
    const listContainer = document.querySelector(".list-container");

    // Search form submit handler
    if (searchForm) {
        searchForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const searchTerm = searchInput.value.trim().toLowerCase();

            if (searchTerm) {
                localStorage.setItem("searchTerm", searchTerm);
                filterVideos(searchTerm, listContainer);
            }
        });
    }

    // Clear Search Button
    if (clearBtn) {
        clearBtn.addEventListener("click", function () {
            localStorage.removeItem("searchTerm");
            searchInput.value = "";
            resetVideoDisplay(listContainer);
        });
    }

    // Reset videos if input is cleared manually
    if (searchInput) {
        searchInput.addEventListener("input", function () {
            if (this.value.trim() === "") {
                localStorage.removeItem("searchTerm");
                resetVideoDisplay(listContainer);
            }
        });
    }

    // Load stored search term
    const storedSearchTerm = localStorage.getItem("searchTerm");
    if (storedSearchTerm) {
        searchInput.value = storedSearchTerm;
        filterVideos(storedSearchTerm, listContainer);
    }
});

// Function to filter videos
function filterVideos(searchTerm, container) {
    const videos = container.querySelectorAll(".vid-list");
    let foundResults = false;

    // First reset all to default display
    resetVideoDisplay(container);

    // Then filter
    videos.forEach((video) => {
        const title = video.querySelector(".vid-info a")?.textContent.toLowerCase() || "";
        const description = video.querySelector(".vid-info p")?.textContent.toLowerCase() || "";

        if (!title.includes(searchTerm) && !description.includes(searchTerm)) {
            video.classList.add("hidden");
        } else {
            foundResults = true;
        }
    });

    if (!foundResults) {
        alert("No videos found matching your search.");
        resetVideoDisplay(container);
        document.getElementById("searchInput").value = "";
        localStorage.removeItem("searchTerm");
    }
}

// Function to reset video display
function resetVideoDisplay(container) {
    const videos = container.querySelectorAll(".vid-list");
    videos.forEach((video) => {
        video.classList.remove("hidden");
    });
}
