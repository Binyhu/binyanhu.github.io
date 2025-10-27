document.addEventListener('DOMContentLoaded', () => {
  const searchBox = document.getElementById('searchBox');
  const dropdown = document.getElementById('categoryDropdown');
  const projects = document.querySelectorAll('.project-card');

  // Collect unique categories from span.category inside each card
  const categories = [
    ...new Set(
      [...projects]
        .flatMap(p =>
          [...p.querySelectorAll('.category')].map(c => c.textContent.trim())
        )
    )
  ];

  // ✅ Log current categories
  console.log("Current categories:", categories);

  // Create dropdown list
  categories.forEach(category => {
    const li = document.createElement('li');
    li.textContent = category;
    li.addEventListener('click', () => {
      searchBox.value = category;
      dropdown.style.display = 'none';
      filterProjects(category);
    });
    dropdown.appendChild(li);
  });

  // Show dropdown while typing
  searchBox.addEventListener('input', () => {
    const value = searchBox.value.toLowerCase().trim();
    dropdown.style.display = value ? 'block' : 'none';

    // Filter dropdown suggestions
    [...dropdown.children].forEach(li => {
      li.style.display = li.textContent.toLowerCase().includes(value) ? 'block' : 'none';
    });

    filterProjects(value);
  });

  // Hide dropdown if click outside
  document.addEventListener('click', e => {
    if (!e.target.closest('.search-wrapper')) dropdown.style.display = 'none';
  });

  // ✅ Fixed filtering logic
  function filterProjects(query) {
    query = query.toLowerCase().trim();

    // ✅ Show all if search is empty
    if (query === '') {
      projects.forEach(project => (project.style.display = 'block'));
      return;
    }

    projects.forEach(project => {
      const title = project.querySelector('h3').textContent.toLowerCase();
      const dataCategories = project.dataset.category
        ? project.dataset.category.toLowerCase().split(',').map(c => c.trim())
        : [];
      const matchCategory = dataCategories.some(c => c.includes(query));
      project.style.display =
        title.includes(query) || matchCategory ? 'block' : 'none';
    });
  }

  // ✅ Show all projects on initial load
  filterProjects('');
});
