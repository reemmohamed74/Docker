document.addEventListener('DOMContentLoaded', () => {
    // API URL - update with your backend URL
    const API_URL = 'http://localhost:5501/api';
  
    // Elements
    const instructorsSection = document.querySelector('.instructors-section');
    const activeStudentsEl = document.getElementById('active-students-count');
    const expertInstructorsEl = document.getElementById('expert-instructors-count');
    const availableCoursesEl = document.getElementById('available-courses-count');
    const courseContainer = document.querySelector('.courses-container');
    const instructorsContainer = document.querySelector('.instructors-container');
    const categoryButtons = document.querySelectorAll('.category-button');
  
    // Stats counters
    let stats = {
      activeStudents: 0,
      expertInstructors: 0,
      availableCourses: 0
    };
  
    // Fetch all data on page load
    async function init() {
      await Promise.all([
        fetchStats(),
        fetchCourses(),
        fetchInstructors()
      ]);
  
      // Initialize category filters
      if (categoryButtons) {
        categoryButtons.forEach(button => {
          button.addEventListener('click', () => {
            const category = button.dataset.category;
            fetchCoursesByCategory(category);
          });
        });
      }
    }
  
    // Fetch statistics
    async function fetchStats() {
      try {
        const [courses, instructors] = await Promise.all([
          fetch(`${API_URL}/courses`).then(res => res.json()),
          fetch(`${API_URL}/instructors`).then(res => res.json())
        ]);
  
        stats.availableCourses = courses.length;
        stats.expertInstructors = instructors.length;
        stats.activeStudents = courses.reduce((total, course) => total + course.totalStudents, 0);
  
        // Update DOM
        if (activeStudentsEl) activeStudentsEl.textContent = stats.activeStudents.toLocaleString();
        if (expertInstructorsEl) expertInstructorsEl.textContent = stats.expertInstructors.toLocaleString();
        if (availableCoursesEl) availableCoursesEl.textContent = stats.availableCourses.toLocaleString();
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    }
  
    // Fetch all courses
    async function fetchCourses() {
      try {
        const response = await fetch(`${API_URL}/courses`);
        const courses = await response.json();
        displayCourses(courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    }
  
    // Fetch courses by category
    async function fetchCoursesByCategory(category) {
      try {
        const response = await fetch(`${API_URL}/courses/category/${category}`);
        const courses = await response.json();
        displayCourses(courses);
      } catch (error) {
        console.error(`Error fetching ${category} courses:`, error);
      }
    }
  
    // Fetch all instructors
    async function fetchInstructors() {
      try {
        const response = await fetch(`${API_URL}/instructors`);
        const instructors = await response.json();
        displayInstructors(instructors);
      } catch (error) {
        console.error('Error fetching instructors:', error);
      }
    }
  
    // Display courses
    function displayCourses(courses) {
      if (!courseContainer) return;
      
      courseContainer.innerHTML = '';
      
      courses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        courseCard.innerHTML = `
          <div class="course-image">
            <img src="${course.imageUrl}" alt="${course.title}">
          </div>
          <div class="course-info">
            <h3>${course.title}</h3>
            <p class="course-category">${course.category}</p>
            <p class="course-description">${course.description.substring(0, 100)}...</p>
            <div class="course-meta">
              <span class="course-rating">
                <i class="fas fa-star"></i> ${course.rating}
              </span>
              <span class="course-students">
                <i class="fas fa-user"></i> ${course.totalStudents} students
              </span>
            </div>
            <a href="#" class="btn btn-primary" data-course-id="${course._id}">View Course</a>
          </div>
        `;
        courseContainer.appendChild(courseCard);
      });
  
      // Add event listeners to course buttons
      document.querySelectorAll('[data-course-id]').forEach(button => {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          const courseId = button.dataset.courseId;
          // Navigate to course details page or show modal
          console.log('View course:', courseId);
        });
      });
    }
  
    // Display instructors
    function displayInstructors(instructors) {
      if (!instructorsContainer) return;
      
      instructorsContainer.innerHTML = '';
      
      instructors.forEach(instructor => {
        const instructorCard = document.createElement('div');
        instructorCard.className = 'instructor-card';
        instructorCard.innerHTML = `
          <div class="instructor-image">
            <img src="${instructor.imageUrl}" alt="${instructor.name}">
          </div>
          <h3>${instructor.name}</h3>
          <p class="instructor-expertise">${instructor.expertise}</p>
          <div class="instructor-rating">
            <i class="fas fa-star"></i> ${instructor.rating}
          </div>
        `;
        instructorsContainer.appendChild(instructorCard);
      });
    }
  
    // Initialize
    init();
  });