const getColorQuery = () => matchMedia("(prefers-color-scheme: dark)");

const handleCheckColor = (e) => {
  if (e.matches) {
    document.documentElement.classList.add("dark");
    document.documentElement.setAttribute("data-bs-theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    document.documentElement.removeAttribute("data-bs-theme");
  }
};

const query = getColorQuery();
handleCheckColor(query);
query.addEventListener("change", handleCheckColor);
