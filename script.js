const prefixes = { singer:'s', electric:'e', guitar:'g', drummer:'d', backstage:'b' };
const roleNames = { singer:'Singer', electric:'Electric guitar', guitar:'Guitar', drummer:'Drummer', backstage:'Backstage crew' };

let currentRole = null;
let isSubmitting = false;

const successScreen  = document.getElementById('successScreen');
const errorBanner    = document.getElementById('errorBanner');
const submitBtn      = document.getElementById('submitBtn');
const resetBtn       = document.getElementById('resetBtn');
const buttonText     = submitBtn.querySelector('.button-text');
const spinner        = submitBtn.querySelector('.spinner');
const questionsSection = document.getElementById('questionsSection');
const successMessage = document.getElementById('successMessage');

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.role-option').forEach(option => {
    option.addEventListener('click', () => selectRole(option));
    option.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectRole(option); }
    });
  });

  document.querySelectorAll('input[type=text]').forEach(input => {
    input.addEventListener('blur', () => {
      if (input.hasAttribute('aria-required') && !input.value.trim()) {
        input.classList.add('error');
      }
    });
    input.addEventListener('focus', () => {
      input.classList.remove('error');
    });
    input.addEventListener('input', () => {
      if (input.value.trim()) input.classList.remove('error');
    });
  });
});

function selectRole(option) {
  if (isSubmitting) return;

  document.querySelectorAll('.role-option').forEach(opt => {
    opt.classList.remove('active');
    opt.setAttribute('aria-checked', 'false');
  });

  option.classList.add('active');
  option.setAttribute('aria-checked', 'true');
  currentRole = option.dataset.role;

  questionsSection.innerHTML = '';
  questionsSection.classList.remove('show');
  loadQuestionsForRole(currentRole);

  setTimeout(() => {
    questionsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 60);
}

function loadQuestionsForRole(role) {
  const questions = getQuestionsForRole(role);
  const icons = {
    singer: '<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/>',
    electric: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    guitar: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
    drummer: '<ellipse cx="12" cy="11" rx="10" ry="4"/><path d="M2 11v5c0 2.2 4.5 4 10 4s10-1.8 10-4v-5"/>',
    backstage: '<path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H5v10a2 2 0 002 2h10a2 2 0 002-2V10h1.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"/>'
  };

  const header = document.createElement('div');
  header.className = 'questions-header';
  header.innerHTML = `
    <div class="questions-badge" aria-hidden="true">
      <svg viewBox="0 0 24 24">${icons[role]}</svg>
    </div>
    <div>
      <div class="questions-title">${roleNames[role]} questions</div>
      <div class="questions-desc">Answer all 5 below</div>
    </div>`;
  questionsSection.appendChild(header);

  questions.forEach((q, i) => {
    const row = document.createElement('div');
    row.className = 'question-row';
    row.innerHTML = `
      <div class="question-label">
        <span class="question-number" aria-hidden="true">${i + 1}</span>
        ${q.question}
      </div>
      <textarea id="${prefixes[role]}${i + 1}" placeholder="Your answer..." aria-label="${q.description}" rows="3"></textarea>`;
    questionsSection.appendChild(row);
  });

  questionsSection.classList.add('show');
}

function getQuestionsForRole(role) {
  const qs = {
    singer: [
      { question: "What vocal range do you have and how long have you been singing?", description: "Vocal range and experience" },
      { question: "Name a song you could perform right now and why you chose it.", description: "Song choice" },
      { question: "Have you performed live before? Describe the experience.", description: "Live performance experience" },
      { question: "How do you warm up before a performance?", description: "Warmup routine" },
      { question: "What genres do you feel most comfortable singing?", description: "Preferred genres" }
    ],
    electric: [
      { question: "How many years have you been playing and are you self-taught or trained?", description: "Years playing and training" },
      { question: "What genres or styles can you play?", description: "Genres and styles" },
      { question: "Describe your current gear — guitar and amp.", description: "Current gear" },
      { question: "Can you read tabs or sheet music? How do you learn new songs?", description: "Reading music and learning method" },
      { question: "Have you played in a band before? What was your role?", description: "Band experience" }
    ],
    guitar: [
      { question: "How long have you been playing and what type — acoustic, classical, or bass?", description: "Years playing and guitar type" },
      { question: "What chords, scales, or techniques are you most comfortable with?", description: "Chords and techniques" },
      { question: "Can you read tabs or sheet music, or do you play by ear?", description: "Reading music" },
      { question: "What song or riff best shows off your skill right now?", description: "Showcase song" },
      { question: "Are you open to learning new styles if the band needs it?", description: "Openness to learning" }
    ],
    drummer: [
      { question: "How long have you been drumming and are you self-taught or trained?", description: "Years drumming and training" },
      { question: "What time signatures and styles are you comfortable playing?", description: "Time signatures and styles" },
      { question: "Do you own a kit? What setup do you use?", description: "Kit and setup" },
      { question: "How do you keep time — metronome, backing track, or something else?", description: "Timing practice method" },
      { question: "Have you jammed or recorded with other musicians before?", description: "Jamming and recording experience" }
    ],
    backstage: [
      { question: "Any experience with costumes, outfits, or wardrobe styling?", description: "Wardrobe experience" },
      { question: "How would you describe your style and how it shapes performer looks?", description: "Personal style" },
      { question: "How do you handle last-minute outfit changes before a show?", description: "Wardrobe emergencies" },
      { question: "Have you ever sourced, made, or altered clothing? What did you do?", description: "Sourcing and altering" },
      { question: "How would you design outfits that match the band's vibe?", description: "Outfit design process" }
    ]
  };
  return qs[role] || [];
}

async function submitForm() {
  if (isSubmitting) return;

  const name = document.getElementById('fullName').value.trim();
  const room = document.getElementById('roomNum').value.trim();
  errorBanner.classList.remove('show');

  if (!name) { showError('Please enter your full name.'); document.getElementById('fullName').focus(); return; }
  if (!room) { showError('Please enter your room number.'); document.getElementById('roomNum').focus(); return; }
  if (!currentRole) { showError('Please pick a role first.'); return; }

  const p = prefixes[currentRole];
  for (let i = 1; i <= 5; i++) {
    const ta = document.getElementById(p + i);
    if (!ta || !ta.value.trim()) { showError('Please answer all 5 questions.'); ta && ta.focus(); return; }
  }

  isSubmitting = true;
  setSubmittingState(true);

  const payload = { 'Full name': name, 'Room number': room, 'Role': roleNames[currentRole] };
  for (let i = 1; i <= 5; i++) {
    const ta = document.getElementById(p + i);
    payload[ta.getAttribute('aria-label')] = ta.value.trim();
  }

  try {
    const res = await fetch('https://formspree.io/f/xrewpzny', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      document.getElementById('successMessage').textContent =
        `Thanks ${name} — your ${roleNames[currentRole]} audition for room ${room} is in. We'll be in touch.`;
      document.querySelector('.container').style.display = 'none';
      successScreen.classList.add('show');
    } else { throw new Error(); }
  } catch {
    showError('Failed to submit. Please check your connection and try again.');
    isSubmitting = false;
    setSubmittingState(false);
  }
}

function showError(msg) {
  errorBanner.textContent = msg;
  errorBanner.classList.add('show');
  setTimeout(() => errorBanner.classList.remove('show'), 5000);
}

function setSubmittingState(state) {
  submitBtn.disabled = state;
  submitBtn.classList.toggle('loading', state);
  buttonText.style.visibility = state ? 'hidden' : 'visible';
  spinner.style.display = state ? 'block' : 'none';
}

function resetForm() {
  document.getElementById('fullName').value = '';
  document.getElementById('roomNum').value = '';
  document.querySelectorAll('.role-option').forEach(o => { o.classList.remove('active'); o.setAttribute('aria-checked','false'); });
  questionsSection.innerHTML = '';
  questionsSection.classList.remove('show');
  currentRole = null;
  isSubmitting = false;
  setSubmittingState(false);
  document.querySelector('.container').style.display = '';
  successScreen.classList.remove('show');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

submitBtn.addEventListener('click', submitForm);
resetBtn.addEventListener('click', resetForm);

document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !isSubmitting) {
    const el = document.activeElement;
    if (el.tagName === 'INPUT') { e.preventDefault(); submitForm(); }
    if (el.tagName === 'TEXTAREA' && e.ctrlKey) { e.preventDefault(); submitForm(); }
  }
});
