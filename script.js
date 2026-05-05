function filterGambar(kategori) {
    const gambar = document.querySelectorAll(".gallery img");

    gambar.forEach(img => {
        if (kategori === "all") {
            img.style.display = "block";
        } else {
            if (img.classList.contains(kategori)) {
                img.style.display = "block";
            } else {
                img.style.display = "none";
            }
        }
    });
}