// Constants
const prefixes = {
  singer:'s',
  electric:'e',
  guitar:'g',
  drummer:'d',
  backstage:'b'
};

const roleNames = {
  singer:'Singer',
  electric:'Electric guitar',
  guitar:'Guitar',
  drummer:'Drummer',
  backstage:'Backstage crew'
};

let currentRole = null;
let isSubmitting = false;

// DOM Elements
const formView = document.getElementById('formView');
const successScreen = document.getElementById('successScreen');
const errorBanner = document.getElementById('errorBanner');
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');
const buttonText = submitBtn.querySelector('.button-text');
const spinner = submitBtn.querySelector('.spinner');
const questionsSection = document.getElementById('questionsSection');
const successTitle = document.getElementById('successTitle');
const successMessage = document.getElementById('successMessage');

// Initialize form on load
document.addEventListener('DOMContentLoaded', () => {
  // Add keyboard navigation for role cards
  document.querySelectorAll('.role-option').forEach(option => {
    option.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectRole(option);
      }
    });

    // Add focus indicator
    option.addEventListener('focus', () => {
      option.style.boxShadow = '0 0 0 3px var(--accent-dim)';
    });

    option.addEventListener('blur', () => {
      option.style.boxShadow = '';
    });
  });

  // Add input validation styling
  document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', () => {
      if (input.value.trim()) {
        input.classList.add('has-value');
        input.classList.remove('error');
      } else {
        input.classList.remove('has-value');
      }
    });

    // Add visual feedback for empty required fields on blur
    input.addEventListener('blur', () => {
      if (input.hasAttribute('aria-required') && !important', () => {
      if (input.hasAttribute('aria-required') && !input.value.trim()) {
        input.classList.add('error');
        input.style.borderColor = 'var(--error)';
      }
    });

    input.addEventListener('focus', () => {
      if (input.hasAttribute('aria-required') && !input.value.trim()) {
        input.style.borderColor = '';
        input.classList.remove('error');
      }
    });
  });
});

// Role selection
function selectRole(option) {
  // Don't allow interaction during submission
  if (isSubmitting) return;

  // Update ARIA states
  document.querySelectorAll('.role-option').forEach(opt => {
    opt.classList.remove('active');
    const isSelected = opt === option;
    opt.setAttribute('aria-checked', String(isSelected));
    opt.setAttribute('aria-label', `${roleNames[opt.dataset.role]} role, ${isSelected ? 'selected' : 'not selected'}`);
  });

  // Hide all question sections
  questionsSection.innerHTML = '';
  questionsSection.classList.remove('show');

  // Show selected role card
  option.classList.add('active');
  currentRole = option.dataset.role;
  loadQuestionsForRole(currentRole);

  // Smooth scroll to the question section
  setTimeout(() => {
    questionsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    // Focus first textarea in the section
    setTimeout(() => {
      const firstInput = questionsSection.querySelector('input, textarea');
      if (firstInput) {
        firstInput.focus();
      }
    }, 100);
  }, 60);
}

// Load questions based on role
function loadQuestionsForRole(role) {
  const questions = getQuestionsForRole(role);

  questions.forEach((q, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question-row';
    questionDiv.innerHTML = `
      <div class="question-label">
        <span class="question-number" aria-hidden="${index + 1}">${index + 1}</span>
        ${q.question}
      </div>
      <textarea
        id="${prefixes[role]}${index + 1}"
        placeholder="Your answer..."
        aria-label="${q.description}"
        rows="3"
      ></textarea>
    `;
    questionsSection.appendChild(questionDiv);
  });

  questionsSection.classList.add('show');
}

// Get questions for each role
function getQuestionsForRole(role) {
  switch(role) {
    case 'singer':
      return [
        { question: "What vocal range do you have and how long have you been singing?", description: "Vocal range and experience" },
        { question: "Name a song you could perform right now and why you chose it.", description: "Song choice" },
        { question: "Have you performed live before? Describe the experience.", description: "Live performance experience" },
        { question: "How do you warm up before a performance?", description: "Warmup routine" },
        { question: "What genres do you feel most comfortable singing?", description: "Preferred genres" }
      ];
    case 'electric':
      return [
        { question: "How many years have you been playing and are you self-taught or trained?", description: "Years playing and training" },
        { question: "What genres or styles can you play?", description: "Genres and styles" },
        { question: "Describe your current gear — guitar and amp.", description: "Current gear" },
        { question: "Can you read tabs or sheet music? How do you learn new songs?", description: "Reading music and learning method" },
        { question: "What's your favorite guitar technique and why?", description: "Favorite guitar technique" }
      ];
    case 'guitar':
      return [
        { question: "How many years have you been playing guitar?", description: "Years playing guitar" },
        { question: "What types of guitars do you play?", description: "Types of guitars" },
        { question: "Describe your playing style.", description: "Playing style" },
        { question: "Can you read sheet music or tabs?", description: "Reading music" },
        { question: "What's your favorite song to play and why?", description: "Favorite song" }
      ];
    case 'drummer':
      return [
        { question: "How many years have you been playing drums?", description: "Years playing drums" },
        { question: "What styles of drumming do you play?", description: "Drumming styles" },
        { question: "Describe your drum kit setup.", description: "Drum kit setup" },
        { question: "How do you practice timing and rhythm?", description: "Timing practice" },
        { question: "Who are your drumming influences and why?", description: "Drumming influences" }
      ];
    case 'backstage':
      return [
        { question: "What experience do you have with wardrobe or costumes?", description: "Wardrobe experience" },
        { question: "How do you handle quick changes during performances?", description: "Quick changes" },
        { question: "What's your experience with stage management?", description: "Stage management" },
        { question: "How do you stay organized during busy show periods?", description: "Organization skills" },
        { question: "What do you enjoy most about working behind the scenes?", description: "Backstage enjoyment" }
      ];
    default:
      return [];
  }
}

// Form submission
async function submitForm() {
  // Prevent multiple submissions
  if (isSubmitting) return;

  // Get form values
  const name = document.getElementById('fullName').value.trim();
  const room = document.getElementById('roomNum').value.trim();

  // Reset error state
  errorBanner.classList.remove('show');

  // Validate required fields
  if (!name) {
    showError('Please enter your full name.');
    document.getElementById('fullName').focus();
    document.getElementById('fullName').classList.add('error');
    return;
  }

  if (!room) {
    showError('Please enter your room number.');
    document.getElementById('roomNum').focus();
    document.getElementById('roomNum').classList.add('error');
    return;
  }

  if (!currentRole) {
    showError('Please pick a role first.');
    return;
  }

  // Validate role-specific questions
  const p = prefixes[currentRole];
  for (let i = 1; i <= 5; i++) {
    const textarea = document.getElementById(p + i);
    if (!textarea.value.trim()) {
      showError('Please answer all 5 questions for your role.');
      textarea.focus();
      textarea.classList.add('error');
      return;
    }
  }

  // Set submitting state
  isSubmitting = true;
  setSubmittingState(true);

  // Prepare payload
  const payload = {
    'Full name': name,
    'Room number': room,
    'Role': roleNames[currentRole]
  };

  for (let i = 1; i <= 5; i++) {
    const textarea = document.getElementById(p + i);
    payload[textarea.getAttribute('aria-label')] = textarea.value.trim();
  }

  try {
    // Submit to Formspree
    const response = await fetch('https://formspree.io/f/xrewpzny', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      // Show success state
      successMessage.textContent = `Thanks ${name} — your ${roleNames[currentRole]} audition for room ${room} is in. We'll be in touch.`;
      formView.style.display = 'none';
      successScreen.classList.add('show');

      // Reset form after delay for next submission
      setTimeout(() => {
        resetForm();
      }, 5000);
    } else {
      throw new Error('Submission failed');
    }
  } catch (error) {
    // Show error state
    showError('Failed to submit. Please check your connection and try again.');
    setSubmittingState(false);
  }
}

// Show error message
function showError(message) {
  errorBanner.textContent = message;
  errorBanner.classList.add('show');

  // Auto-hide after 5 seconds
  setTimeout(() => {
    errorBanner.classList.remove('show');
  }, 5000);
}

// Set submitting state UI
function setSubmittingState(isSubmitting) {
  if (isSubmitting) {
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    buttonText.style.visibility = 'hidden';
    spinner.style.display = 'block';
  } else {
    submitBtn.disabled = false;
    submitBtn.classList.remove('loading');
    buttonText.style.visibility = 'visible';
    spinner.style.display = 'none';
  }
}

// Reset form
function resetForm() {
  // Reset form fields
  document.getElementById('fullName').value = '';
  document.getElementById('roomNum').value = '';
  document.getElementById('fullName').classList.remove('error', 'has-value');
  document.getElementById('roomNum').classList.remove('error', 'has-value');

  // Reset role selection
  document.querySelectorAll('.role-option').forEach(option => {
    option.classList.remove('active');
    option.setAttribute('aria-checked', 'false');
    option.setAttribute('aria-label', `${roleNames[option.dataset.role]} role, not selected`);
  });

  // Hide all question sections and clear textareas
  questionsSection.innerHTML = '';
  questionsSection.classList.remove('show');

  currentRole = null;
  isSubmitting = false;
  setSubmittingState(false);

  // Hide success screen, show form
  formView.style.display = '';
  successScreen.classList.remove('show');

  // Scroll to top and focus first field
  window.scrollTo({ top: 0, behavior: 'smooth' });
  document.getElementById('fullName').focus();
}

// Handle Enter key in form fields
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !isSubmitting) {
    const activeElement = document.activeElement;

    // If Enter is pressed in a textarea, submit if Ctrl+Enter
    if (activeElement.tagName === 'TEXTAREA' && e.ctrlKey) {
      e.preventDefault();
      submitForm();
    }

    // If Enter is pressed on submit button or in a field (but not textarea for new line)
    if ((activeElement === submitBtn ||
         (activeElement.tagName === 'INPUT' || activeElement.tagName === 'SELECT')) &&
        !(activeElement.tagName === 'TEXTAREA' && !e.ctrlKey)) {
      e.preventDefault();
      submitForm();
    }
  }
});

// Prevent form submission on Enter in textarea (allow new lines)
document.querySelectorAll('textarea').forEach(textarea => {
  textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.ctrlKey) {
      // Allow natural newline behavior
      return;
    }
  });
});

// Attach event listeners
submitBtn.addEventListener('click', submitForm);
resetBtn.addEventListener('click', resetForm);