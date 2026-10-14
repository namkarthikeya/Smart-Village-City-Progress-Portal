const STORAGE_KEY = 'smartVillagePortalState';
const DEFAULT_VILLAGE = {
  name: 'Rampur',
  pincode: '500001'
};

const defaultState = {
  currentUser: null,
  activeTab: 'updates',
  users: [
    {
      id: 'admin-village-default',
      role: 'admin',
      name: 'Village Admin',
      email: 'village@gmail.com',
      password: 'admin',
      villageName: DEFAULT_VILLAGE.name,
      mandal: 'Central',
      district: 'North',
      pincode: DEFAULT_VILLAGE.pincode,
    },
    {
      id: 'resident-rampur-demo',
      role: 'resident',
      name: 'Ananya Nair',
      email: 'ananya@example.com',
      password: 'resident',
      villageName: DEFAULT_VILLAGE.name,
      streetName: 'Green Park Lane',
      mobile: '9876543210',
      pincode: DEFAULT_VILLAGE.pincode,
    }
  ],
  updates: [
    {
      id: 'upd-1',
      title: 'Monthly Gram Sabha Meeting',
      category: 'Meeting',
      date: '2026-10-20T10:00',
      location: 'Community Hall, Rampur',
      description: 'Residents are invited to review project updates, local welfare schemes, and upcoming works.',
      villageName: DEFAULT_VILLAGE.name,
      pincode: DEFAULT_VILLAGE.pincode,
    },
    {
      id: 'upd-2',
      title: 'Water Supply Scheme Launch',
      category: 'Scheme',
      date: '2026-10-28T09:30',
      location: 'Water Tank Complex',
      description: 'New pipeline distribution and purification improvements will begin in the western wards.',
      villageName: DEFAULT_VILLAGE.name,
      pincode: DEFAULT_VILLAGE.pincode,
    },
    {
      id: 'upd-3',
      title: 'Health Camp for Senior Citizens',
      category: 'Announcement',
      date: '2026-11-03T08:30',
      location: 'Primary Health Center',
      description: 'Free health screening and medicine distribution camp for elders, women, and children.',
      villageName: DEFAULT_VILLAGE.name,
      pincode: DEFAULT_VILLAGE.pincode,
    }
  ],
  problems: [
    {
      id: 'prob-1',
      title: 'Water pipeline damage near market road',
      description: 'Pipeline burst in the market area causing low pressure and muddy water for residents.',
      status: 'In Progress',
      villageName: DEFAULT_VILLAGE.name,
      pincode: DEFAULT_VILLAGE.pincode,
      suggestions: [
        { id: 'sug-1', author: 'Ramesh', text: 'Install a temporary emergency pipeline and repair the damaged stretch immediately.' },
        { id: 'sug-2', author: 'Sita', text: 'Add a public notification board so residents know the repair schedule.' }
      ]
    },
    {
      id: 'prob-2',
      title: 'Street light repair on Main Road',
      description: 'Several street lights are non-functional, creating safety concerns after sunset.',
      status: 'Pending',
      villageName: DEFAULT_VILLAGE.name,
      pincode: DEFAULT_VILLAGE.pincode,
      suggestions: [
        { id: 'sug-3', author: 'Kiran', text: 'Replace damaged units with LED lights to reduce electricity consumption.' }
      ]
    },
    {
      id: 'prob-3',
      title: 'Potholes near school junction',
      description: 'Deep potholes are affecting safe travel for students and two-wheelers.',
      status: 'Resolved',
      villageName: DEFAULT_VILLAGE.name,
      pincode: DEFAULT_VILLAGE.pincode,
      suggestions: [
        { id: 'sug-4', author: 'Meena', text: 'The road repair work completed successfully, but routine checks should continue.' }
      ]
    }
  ],
  complaints: [
    {
      id: 'comp-1',
      title: 'Stagnant drainage near park',
      category: 'Sanitation',
      street: 'Lake View Street',
      description: 'Drainage water is collecting near the park causing odor and mosquito breeding.',
      status: 'Under Review',
      villageName: DEFAULT_VILLAGE.name,
      pincode: DEFAULT_VILLAGE.pincode,
      residentName: 'Ananya Nair',
      residentEmail: 'ananya@example.com'
    },
    {
      id: 'comp-2',
      title: 'Street light outage',
      category: 'Electricity',
      street: 'Main Road',
      description: 'A power outage for the lamp post near the bus stand has continued for over two days.',
      status: 'Received',
      villageName: DEFAULT_VILLAGE.name,
      pincode: DEFAULT_VILLAGE.pincode,
      residentName: 'Ananya Nair',
      residentEmail: 'ananya@example.com'
    }
  ],
  budget: [
    {
      id: 'budget-1',
      title: 'Road Widening & Repair',
      sector: 'Infrastructure',
      totalBudget: 1800000,
      spent: 720000,
      status: 'Ongoing',
      villageName: DEFAULT_VILLAGE.name,
      pincode: DEFAULT_VILLAGE.pincode,
    },
    {
      id: 'budget-2',
      title: 'Drainage and Sanitation Upgrade',
      sector: 'Sanitation',
      totalBudget: 950000,
      spent: 430000,
      status: 'Planned',
      villageName: DEFAULT_VILLAGE.name,
      pincode: DEFAULT_VILLAGE.pincode,
    },
    {
      id: 'budget-3',
      title: 'School Infrastructure Support',
      sector: 'Education',
      totalBudget: 1250000,
      spent: 980000,
      status: 'Completed',
      villageName: DEFAULT_VILLAGE.name,
      pincode: DEFAULT_VILLAGE.pincode,
    },
    {
      id: 'budget-4',
      title: 'Community Health Center Equipment',
      sector: 'Healthcare',
      totalBudget: 650000,
      spent: 290000,
      status: 'Ongoing',
      villageName: DEFAULT_VILLAGE.name,
      pincode: DEFAULT_VILLAGE.pincode,
    }
  ]
};

const appState = loadState();

const authScreen = document.getElementById('authScreen');
const dashboard = document.getElementById('dashboard');
const authForm = document.getElementById('authForm');
const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');
const roleButtons = Array.from(document.querySelectorAll('.role-btn'));
const modalLayer = document.getElementById('modalLayer');
const navButtons = Array.from(document.querySelectorAll('.nav-btn'));
const villageBadge = document.getElementById('villageBadge');
const userName = document.getElementById('userName');
const userRole = document.getElementById('userRole');

let authMode = 'login';
let selectedRole = 'admin';

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultState));
    return structuredClone(defaultState);
  }

  try {
    const parsed = JSON.parse(raw);
    return parsed;
  } catch (error) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultState));
    return structuredClone(defaultState);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
}

function getCurrentVillage() {
  if (!appState.currentUser) return DEFAULT_VILLAGE;
  return {
    name: appState.currentUser.villageName || DEFAULT_VILLAGE.name,
    pincode: appState.currentUser.pincode || DEFAULT_VILLAGE.pincode,
  };
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
}

function getCurrentVillageItems(collectionKey) {
  const user = appState.currentUser;
  if (!user) return [];

  return (appState[collectionKey] || []).filter((item) => {
    const sameVillage = item.villageName === user.villageName;
    const samePincode = item.pincode === user.pincode;
    return sameVillage && samePincode;
  });
}

function getVisibleComplaints() {
  const user = appState.currentUser;
  if (!user) return [];

  return (appState.complaints || []).filter((item) => {
    const sameVillage = item.villageName === user.villageName;
    const samePincode = item.pincode === user.pincode;
    return sameVillage && samePincode && (user.role === 'admin' || item.residentEmail === user.email);
  });
}

function initLucide() {
  if (window.lucide) {
    lucide.createIcons();
  }
}

function setAuthMode(mode) {
  authMode = mode;
  loginTab.classList.toggle('bg-slate-900', mode === 'login');
  loginTab.classList.toggle('text-white', mode === 'login');
  loginTab.classList.toggle('shadow-sm', mode === 'login');
  registerTab.classList.toggle('bg-slate-900', mode === 'register');
  registerTab.classList.toggle('text-white', mode === 'register');
  registerTab.classList.toggle('shadow-sm', mode === 'register');
  renderAuthForm();
}

function setRole(role) {
  selectedRole = role;
  roleButtons.forEach((button) => {
    const active = button.dataset.role === role;
    button.classList.toggle('active', active);
    button.classList.toggle('bg-white', active);
    button.classList.toggle('shadow-sm', active);
    button.classList.toggle('text-slate-600', !active);
    button.classList.toggle('text-slate-800', active);
  });
  renderAuthForm();
}

function renderAuthForm() {
  if (authMode === 'login') {
    authForm.innerHTML = `
      <div class="space-y-4">
        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700">Email</label>
          <input type="email" id="loginEmail" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-800" placeholder="Enter email" required />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700">Password</label>
          <input type="password" id="loginPassword" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-800" placeholder="Enter password" required />
        </div>
      </div>
      <div class="mt-6 flex items-center justify-between gap-3">
        <div class="text-xs text-slate-500">Demo admin: village@gmail.com / admin</div>
        <button type="submit" class="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-700">Login</button>
      </div>
    `;

    authForm.onsubmit = (event) => {
      event.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value.trim();
      loginUser(email, password, selectedRole);
    };
    return;
  }

  if (selectedRole === 'admin') {
    authForm.innerHTML = `
      <div class="grid gap-4 sm:grid-cols-2">
        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700">Village Email</label>
          <input type="email" id="regAdminEmail" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm" required />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700">Village Name</label>
          <input type="text" id="regVillageName" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm" value="Rampur" required />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700">Mandal / Sub-district</label>
          <input type="text" id="regMandal" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm" value="Central" required />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700">District</label>
          <input type="text" id="regDistrict" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm" value="North" required />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700">Pincode</label>
          <input type="text" id="regPincode" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm" value="500001" required />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700">Password</label>
          <input type="password" id="regAdminPassword" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm" required />
        </div>
      </div>
      <div class="mt-6 flex items-center justify-end">
        <button type="submit" class="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-medium text-white hover:bg-emerald-500">Create Admin Account</button>
      </div>
    `;

    authForm.onsubmit = (event) => {
      event.preventDefault();
      const payload = {
        email: document.getElementById('regAdminEmail').value.trim(),
        villageName: document.getElementById('regVillageName').value.trim(),
        mandal: document.getElementById('regMandal').value.trim(),
        district: document.getElementById('regDistrict').value.trim(),
        pincode: document.getElementById('regPincode').value.trim(),
        password: document.getElementById('regAdminPassword').value.trim(),
      };
      registerUser('admin', payload);
    };
    return;
  }

  authForm.innerHTML = `
    <div class="grid gap-4 sm:grid-cols-2">
      <div class="sm:col-span-2">
        <label class="mb-1 block text-sm font-medium text-slate-700">Full Name</label>
        <input type="text" id="regResidentName" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm" required />
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium text-slate-700">Village Name</label>
        <input type="text" id="regVillage" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm" value="Rampur" required />
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium text-slate-700">Street Name</label>
        <input type="text" id="regStreet" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm" required />
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium text-slate-700">Mobile Number</label>
        <input type="tel" id="regMobile" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm" required />
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium text-slate-700">Email ID</label>
        <input type="email" id="regResidentEmail" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm" required />
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium text-slate-700">Pincode</label>
        <input type="text" id="regResidentPincode" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm" value="500001" required />
      </div>
      <div class="sm:col-span-2">
        <label class="mb-1 block text-sm font-medium text-slate-700">Password</label>
        <input type="password" id="regResidentPassword" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm" required />
      </div>
    </div>
    <div class="mt-6 flex items-center justify-end">
      <button type="submit" class="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-medium text-white hover:bg-emerald-500">Create Resident Account</button>
    </div>
  `;

  authForm.onsubmit = (event) => {
    event.preventDefault();
    const payload = {
      name: document.getElementById('regResidentName').value.trim(),
      villageName: document.getElementById('regVillage').value.trim(),
      streetName: document.getElementById('regStreet').value.trim(),
      mobile: document.getElementById('regMobile').value.trim(),
      email: document.getElementById('regResidentEmail').value.trim(),
      pincode: document.getElementById('regResidentPincode').value.trim(),
      password: document.getElementById('regResidentPassword').value.trim(),
    };
    registerUser('resident', payload);
  };
}

function loginUser(email, password, role) {
  const user = appState.users.find((item) => {
    return item.role === role && item.email.toLowerCase() === email.toLowerCase() && item.password === password;
  });

  if (!user) {
    alert('Invalid credentials. Please try again.');
    return;
  }

  appState.currentUser = user;
  saveState();
  renderApp();
}

function registerUser(role, payload) {
  const normalizedEmail = payload.email?.toLowerCase();
  const exists = appState.users.some((item) => item.email.toLowerCase() === normalizedEmail);

  if (exists) {
    alert('An account already exists with this email. Please log in instead.');
    return;
  }

  const newUser = {
    id: `user-${Date.now()}`,
    role,
    name: payload.name || payload.villageName || 'Village Official',
    email: normalizedEmail,
    password: payload.password,
    villageName: payload.villageName,
    mandal: payload.mandal,
    district: payload.district,
    pincode: payload.pincode,
    streetName: payload.streetName,
    mobile: payload.mobile,
  };

  appState.users.push(newUser);
  appState.currentUser = newUser;
  saveState();
  renderApp();
}

function logout() {
  appState.currentUser = null;
  saveState();
  renderApp();
}

function renderHeader() {
  const user = appState.currentUser;
  if (!user) {
    villageBadge.textContent = `${DEFAULT_VILLAGE.name} • ${DEFAULT_VILLAGE.pincode}`;
    userName.textContent = 'Village Admin';
    userRole.textContent = 'ADMIN';
    return;
  }

  const village = getCurrentVillage();
  villageBadge.textContent = `${village.name} • ${village.pincode}`;
  userName.textContent = user.name;
  userRole.textContent = user.role.toUpperCase();
}

function renderTabs() {
  navButtons.forEach((button) => {
    const isActive = button.dataset.tab === appState.activeTab;
    button.classList.toggle('active', isActive);
    button.classList.toggle('bg-white', isActive);
    button.classList.toggle('text-slate-800', isActive);
    button.classList.toggle('shadow-sm', isActive);
    button.classList.toggle('text-slate-600', !isActive);
  });
}

function renderPageUpdates() {
  const user = appState.currentUser;
  const updates = getCurrentVillageItems('updates');

  const adminControls = user?.role === 'admin' ? `
    <button data-action="add-update" class="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500">
      <i data-lucide="plus" class="h-4 w-4"></i>
      Add Update
    </button>
  ` : '';

  document.getElementById('page-updates').innerHTML = `
    <div class="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p class="text-sm font-medium uppercase tracking-[0.2em] text-emerald-700">Village Updates</p>
        <h2 class="mt-1 text-3xl font-bold text-slate-800">Meetings & Openings</h2>
      </div>
      ${adminControls}
    </div>

    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      ${updates.length ? updates.map((item) => `
        <article class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div class="mb-4 flex items-start justify-between gap-3">
            <div class="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700">${item.category}</div>
            ${user?.role === 'admin' ? `
              <div class="flex gap-2">
                <button data-action="edit-update" data-id="${item.id}" class="rounded-xl border border-slate-200 bg-slate-50 p-2 text-slate-600 hover:bg-slate-100">
                  <i data-lucide="pencil" class="h-4 w-4"></i>
                </button>
                <button data-action="delete-update" data-id="${item.id}" class="rounded-xl border border-red-200 bg-red-50 p-2 text-red-600 hover:bg-red-100">
                  <i data-lucide="trash-2" class="h-4 w-4"></i>
                </button>
              </div>
            ` : ''}
          </div>
          <h3 class="text-xl font-bold text-slate-800">${item.title}</h3>
          <div class="mt-3 space-y-2 text-sm text-slate-600">
            <div class="flex items-center gap-2"><i data-lucide="calendar" class="h-4 w-4 text-slate-400"></i> ${new Date(item.date).toLocaleString([], {dateStyle:'medium', timeStyle:'short'})}</div>
            <div class="flex items-center gap-2"><i data-lucide="map-pin" class="h-4 w-4 text-slate-400"></i> ${item.location}</div>
          </div>
          <p class="mt-4 text-sm leading-6 text-slate-600">${item.description}</p>
        </article>
      `).join('') : `
        <div class="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500 md:col-span-2 xl:col-span-3">
          No village updates available for this area yet.
        </div>
      `}
    </div>
  `;

}

function renderPageProblems() {
  const user = appState.currentUser;
  const problems = getCurrentVillageItems('problems');

  const adminControls = user?.role === 'admin' ? `
    <button data-action="add-problem" class="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500">
      <i data-lucide="plus" class="h-4 w-4"></i>
      Add Problem
    </button>
  ` : '';

  document.getElementById('page-problems').innerHTML = `
    <div class="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p class="text-sm font-medium uppercase tracking-[0.2em] text-emerald-700">Village Problems</p>
        <h2 class="mt-1 text-3xl font-bold text-slate-800">Public Issues & Suggestions</h2>
      </div>
      ${adminControls}
    </div>

    <div class="grid gap-5 lg:grid-cols-2">
      ${problems.length ? problems.map((problem) => `
        <article class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div class="mb-4 flex items-start justify-between gap-3">
            <div>
              <h3 class="text-xl font-bold text-slate-800">${problem.title}</h3>
              <p class="mt-1 text-sm text-slate-500">${problem.description}</p>
            </div>
            ${user?.role === 'admin' ? `
              <div class="flex items-center gap-2">
                <select data-action="status-change" data-id="${problem.id}" class="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs text-slate-700">
                  ${['Pending','In Progress','Resolved'].map((status) => `<option value="${status}" ${status === problem.status ? 'selected' : ''}>${status}</option>`).join('')}
                </select>
              </div>
            ` : ''}
          </div>

          <div class="mb-4 flex items-center justify-between gap-3">
            <span class="status-pill ${statusClass(problem.status)}">${problem.status}</span>
            <span class="text-xs uppercase tracking-wide text-slate-500">${problem.suggestions.length} suggestions</span>
          </div>

          <div class="rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <div class="mb-2 text-sm font-semibold text-slate-700">Suggestions / Ideas</div>
            <div class="space-y-2">
              ${problem.suggestions.length ? problem.suggestions.map((suggestion) => `
                <div class="rounded-xl bg-white p-2 text-sm text-slate-600">
                  <div class="mb-1 font-semibold text-slate-700">${suggestion.author}</div>
                  <div>${suggestion.text}</div>
                </div>
              `).join('') : '<div class="text-sm text-slate-500">No suggestions yet.</div>'}
            </div>
            <form data-action="add-suggestion" data-id="${problem.id}" class="mt-3 flex flex-col gap-2 sm:flex-row">
              <input type="text" name="author" value="${user?.role === 'resident' ? user.name : 'Official'}" class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm" required />
              <input type="text" name="text" placeholder="Share your suggestion" class="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm" required />
              <button type="submit" class="whitespace-nowrap rounded-xl bg-sky-600 px-3 py-2 text-sm font-medium text-white hover:bg-sky-500">Add</button>
            </form>
          </div>
        </article>
      `).join('') : `
        <div class="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500 lg:col-span-2">
          No active village problems recorded for this area.
        </div>
      `}
    </div>
  `;

}

function renderPageComplaints() {
  const user = appState.currentUser;
  const complaints = getVisibleComplaints();

  const residentForm = user?.role === 'resident' ? `
    <div class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div class="mb-4">
        <p class="text-sm font-medium uppercase tracking-[0.2em] text-emerald-700">New Complaint</p>
        <h3 class="mt-1 text-2xl font-bold text-slate-800">File a grievance</h3>
      </div>
      <form id="complaint-form" class="grid gap-4 md:grid-cols-2">
        <div class="md:col-span-2">
          <label class="mb-1 block text-sm font-medium text-slate-700">Complaint Title</label>
          <input type="text" name="title" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm" required />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700">Department / Category</label>
          <select name="category" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm">
            <option>Sanitation</option>
            <option>Electricity</option>
            <option>Water</option>
            <option>Roads</option>
            <option>Security</option>
          </select>
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700">Street / Landmark</label>
          <input type="text" name="street" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm" required />
        </div>
        <div class="md:col-span-2">
          <label class="mb-1 block text-sm font-medium text-slate-700">Detailed Description</label>
          <textarea name="description" rows="4" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm" required></textarea>
        </div>
        <div class="md:col-span-2 flex justify-end">
          <button type="submit" class="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-500">Submit Complaint</button>
        </div>
      </form>
    </div>
  ` : '';

  document.getElementById('page-complaints').innerHTML = `
    <div class="mb-6">
      <p class="text-sm font-medium uppercase tracking-[0.2em] text-emerald-700">Public Complaint Box</p>
      <h2 class="mt-1 text-3xl font-bold text-slate-800">Citizen Grievance Desk</h2>
    </div>
    <div class="grid gap-5 xl:grid-cols-[1.1fr_1.9fr]">
      ${residentForm}
      <div class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div class="mb-4 flex items-center justify-between gap-3">
          <div>
            <h3 class="text-2xl font-bold text-slate-800">Complaint History</h3>
          </div>
          ${user?.role === 'admin' ? `
            <select id="complaintFilter" class="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
              <option value="all">All Departments</option>
              <option value="Sanitation">Sanitation</option>
              <option value="Electricity">Electricity</option>
              <option value="Water">Water</option>
              <option value="Roads">Roads</option>
              <option value="Security">Security</option>
            </select>
          ` : ''}
        </div>
        <div class="space-y-4">
          ${complaints.length ? complaints.map((complaint) => `
            <div class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div class="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div class="text-lg font-bold text-slate-800">${complaint.title}</div>
                  <div class="mt-1 text-sm text-slate-500">${complaint.category} • ${complaint.street}</div>
                </div>
                <span class="status-pill ${statusClass(complaint.status, true)}">${complaint.status}</span>
              </div>
              <p class="text-sm leading-6 text-slate-600">${complaint.description}</p>
              ${user?.role === 'admin' ? `
                <div class="mt-4 flex items-center gap-2">
                  <label class="text-xs font-medium uppercase tracking-wide text-slate-500">Status</label>
                  <select data-action="complaint-status" data-id="${complaint.id}" class="rounded-xl border border-slate-200 bg-white px-2 py-1.5 text-sm text-slate-700">
                    ${['Received','Under Review','Resolved'].map((status) => `<option value="${status}" ${status === complaint.status ? 'selected' : ''}>${status}</option>`).join('')}
                  </select>
                </div>
              ` : ''}
            </div>
          `).join('') : `
            <div class="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
              No complaints found for this location.
            </div>
          `}
        </div>
      </div>
    </div>
  `;

  if (user?.role === 'resident') {
    document.getElementById('complaint-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const newComplaint = {
        id: `comp-${Date.now()}`,
        title: formData.get('title'),
        category: formData.get('category'),
        street: formData.get('street'),
        description: formData.get('description'),
        status: 'Received',
        residentName: user.name,
        residentEmail: user.email,
        villageName: user.villageName,
        pincode: user.pincode,
      };
      appState.complaints.push(newComplaint);
      saveState();
      renderPageComplaints();
      renderApp();
    });
  }

}

function renderPageBudget() {
  const user = appState.currentUser;
  const budgetItems = getCurrentVillageItems('budget');
  const totalAllocated = budgetItems.reduce((sum, item) => sum + Number(item.totalBudget || 0), 0);
  const totalSpent = budgetItems.reduce((sum, item) => sum + Number(item.spent || 0), 0);
  const remaining = totalAllocated - totalSpent;

  const adminControls = user?.role === 'admin' ? `
    <button data-action="add-budget" class="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500">
      <i data-lucide="plus" class="h-4 w-4"></i>
      Add Budget Item
    </button>
  ` : '';

  document.getElementById('page-budget').innerHTML = `
    <div class="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p class="text-sm font-medium uppercase tracking-[0.2em] text-emerald-700">Budget Planning</p>
        <h2 class="mt-1 text-3xl font-bold text-slate-800">Financial Transparency Dashboard</h2>
      </div>
      ${adminControls}
    </div>

    <div class="mb-6 grid gap-4 md:grid-cols-3">
      <div class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <p class="text-sm uppercase tracking-[0.15em] text-slate-500">Total Allocated</p>
        <h3 class="mt-3 text-3xl font-bold text-slate-800">${formatCurrency(totalAllocated)}</h3>
      </div>
      <div class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <p class="text-sm uppercase tracking-[0.15em] text-slate-500">Total Spent</p>
        <h3 class="mt-3 text-3xl font-bold text-slate-800">${formatCurrency(totalSpent)}</h3>
      </div>
      <div class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <p class="text-sm uppercase tracking-[0.15em] text-slate-500">Remaining Balance</p>
        <h3 class="mt-3 text-3xl font-bold text-emerald-700">${formatCurrency(remaining)}</h3>
      </div>
    </div>

    <div class="space-y-4">
      ${budgetItems.length ? budgetItems.map((item) => {
        const percent = Math.min(100, Math.round((item.spent / item.totalBudget) * 100));
        return `
          <article class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div class="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 class="text-xl font-bold text-slate-800">${item.title}</h3>
                <p class="text-sm text-slate-500">${item.sector}</p>
              </div>
              <div class="flex items-center gap-2">
                <span class="status-pill ${statusClass(item.status)}">${item.status}</span>
                ${user?.role === 'admin' ? `
                  <button data-action="edit-budget" data-id="${item.id}" class="rounded-xl border border-slate-200 bg-slate-50 p-2 text-slate-600 hover:bg-slate-100"><i data-lucide="pencil" class="h-4 w-4"></i></button>
                  <button data-action="delete-budget" data-id="${item.id}" class="rounded-xl border border-red-200 bg-red-50 p-2 text-red-600 hover:bg-red-100"><i data-lucide="trash-2" class="h-4 w-4"></i></button>
                ` : ''}
              </div>
            </div>

            <div class="mb-2 flex items-center justify-between text-sm text-slate-600">
              <span>Spent ${formatCurrency(item.spent)}</span>
              <span>${percent}%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width:${percent}%"></div>
            </div>
            <div class="mt-4 flex items-center justify-between text-sm text-slate-600">
              <span>Allocated: ${formatCurrency(item.totalBudget)}</span>
              <span>Remaining: ${formatCurrency(item.totalBudget - item.spent)}</span>
            </div>
          </article>
        `;
      }).join('') : `
        <div class="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
          No budget items are available for this village yet.
        </div>
      `}
    </div>
  `;

}

function statusClass(status, complaintMode = false) {
  const normalized = status.toLowerCase().replace(/\s/g, '-');
  const allowed = {
    pending: 'status-pending',
    'in-progress': 'status-in-progress',
    resolved: 'status-resolved',
    received: 'status-received',
    'under-review': 'status-under-review',
    completed: 'status-resolved',
    planned: 'status-pending',
    ongoing: 'status-in-progress',
  };

  return complaintMode ? allowed[normalized] || 'status-pending' : allowed[normalized] || 'status-pending';
}

function renderApp() {
  const user = appState.currentUser;
  if (!user) {
    authScreen.classList.remove('hidden');
    dashboard.classList.add('hidden');
    renderAuthForm();
    renderHeader();
    return;
  }

  authScreen.classList.add('hidden');
  dashboard.classList.remove('hidden');
  renderHeader();
  renderTabs();
  renderPageUpdates();
  renderPageProblems();
  renderPageComplaints();
  renderPageBudget();
  bindRoleActions();
  setActiveTab(appState.activeTab);
  initLucide();
}

function setActiveTab(tab) {
  appState.activeTab = tab;
  document.querySelectorAll('.page-section').forEach((section) => {
    const show = section.id === `page-${tab}`;
    section.classList.toggle('hidden', !show);
  });
  renderTabs();
}

function bindRoleActions() {
  document.querySelectorAll('[data-action="add-update"]').forEach((button) => {
    button.addEventListener('click', () => openUpdateModal());
  });
  document.querySelectorAll('[data-action="edit-update"]').forEach((button) => {
    button.addEventListener('click', () => openUpdateModal(button.dataset.id));
  });
  document.querySelectorAll('[data-action="delete-update"]').forEach((button) => {
    button.addEventListener('click', () => {
      appState.updates = appState.updates.filter((item) => item.id !== button.dataset.id);
      saveState();
      renderApp();
    });
  });

  document.querySelectorAll('[data-action="add-problem"]').forEach((button) => {
    button.addEventListener('click', () => openProblemModal());
  });
  document.querySelectorAll('[data-action="status-change"]').forEach((select) => {
    select.addEventListener('change', (event) => {
      const problem = appState.problems.find((item) => item.id === event.target.dataset.id);
      if (!problem) return;
      problem.status = event.target.value;
      saveState();
      renderApp();
    });
  });
  document.querySelectorAll('[data-action="add-suggestion"]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const problem = appState.problems.find((item) => item.id === form.dataset.id);
      if (!problem) return;
      problem.suggestions.push({
        id: `sug-${Date.now()}`,
        author: formData.get('author'),
        text: formData.get('text'),
      });
      saveState();
      renderApp();
    });
  });

  document.querySelectorAll('[data-action="complaint-status"]').forEach((select) => {
    select.addEventListener('change', (event) => {
      const complaint = appState.complaints.find((item) => item.id === event.target.dataset.id);
      if (!complaint) return;
      complaint.status = event.target.value;
      saveState();
      renderApp();
    });
  });

  document.querySelectorAll('[data-action="add-budget"]').forEach((button) => {
    button.addEventListener('click', () => openBudgetModal());
  });
  document.querySelectorAll('[data-action="edit-budget"]').forEach((button) => {
    button.addEventListener('click', () => openBudgetModal(button.dataset.id));
  });
  document.querySelectorAll('[data-action="delete-budget"]').forEach((button) => {
    button.addEventListener('click', () => {
      appState.budget = appState.budget.filter((item) => item.id !== button.dataset.id);
      saveState();
      renderApp();
    });
  });

  document.getElementById('complaintFilter')?.addEventListener('change', (event) => {
    const filterValue = event.target.value;
    const receipts = [...document.querySelectorAll('[data-action="complaint-status"]')].map((el) => el.closest('.rounded-2xl'));
    receipts.forEach((card) => {
      const cardText = card.textContent;
      if (filterValue === 'all' || cardText.includes(filterValue)) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
}

function openUpdateModal(id = null) {
  const existing = id ? appState.updates.find((item) => item.id === id) : null;
  const formHtml = `
    <form id="update-modal-form" class="space-y-4 p-6">
      <div class="flex items-center justify-between">
        <h3 class="text-2xl font-bold text-slate-800">${existing ? 'Edit' : 'Add'} Village Update</h3>
        <button type="button" data-close="modal" class="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-100">
          <i data-lucide="x" class="h-4 w-4"></i>
        </button>
      </div>
      <div class="grid gap-4 md:grid-cols-2">
        <div class="md:col-span-2">
          <label class="mb-1 block text-sm font-medium text-slate-700">Title</label>
          <input name="title" value="${existing ? existing.title : ''}" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm" required />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700">Category</label>
          <select name="category" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm">
            ${['Meeting','Opening','Announcement','Scheme'].map((category) => `<option value="${category}" ${existing && existing.category === category ? 'selected' : ''}>${category}</option>`).join('')}
          </select>
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700">Date & Time</label>
          <input name="date" type="datetime-local" value="${existing ? existing.date.slice(0, 16) : '2026-10-16T09:00'}" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm" required />
        </div>
        <div class="md:col-span-2">
          <label class="mb-1 block text-sm font-medium text-slate-700">Location</label>
          <input name="location" value="${existing ? existing.location : ''}" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm" required />
        </div>
        <div class="md:col-span-2">
          <label class="mb-1 block text-sm font-medium text-slate-700">Description</label>
          <textarea name="description" rows="4" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm" required>${existing ? existing.description : ''}</textarea>
        </div>
      </div>
      <div class="flex justify-end gap-3 pt-2">
        <button type="button" data-close="modal" class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">Cancel</button>
        <button type="submit" class="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500">Save</button>
      </div>
    </form>
  `;

  openModal(formHtml, (formData) => {
    const payload = {
      title: formData.get('title'),
      category: formData.get('category'),
      date: new Date(formData.get('date')).toISOString(),
      location: formData.get('location'),
      description: formData.get('description'),
    };

    if (existing) {
      Object.assign(existing, payload);
    } else {
      appState.updates.push({
        id: `upd-${Date.now()}`,
        ...payload,
        villageName: appState.currentUser.villageName,
        pincode: appState.currentUser.pincode,
      });
    }

    saveState();
    renderApp();
  });
}

function openProblemModal() {
  const formHtml = `
    <form id="problem-modal-form" class="space-y-4 p-6">
      <div class="flex items-center justify-between">
        <h3 class="text-2xl font-bold text-slate-800">Add Village Problem</h3>
        <button type="button" data-close="modal" class="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-100">
          <i data-lucide="x" class="h-4 w-4"></i>
        </button>
      </div>
      <div class="space-y-4">
        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700">Problem Title</label>
          <input name="title" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm" required />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700">Description</label>
          <textarea name="description" rows="4" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm" required></textarea>
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700">Status</label>
          <select name="status" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm">
            <option>Pending</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>
        </div>
      </div>
      <div class="flex justify-end gap-3 pt-2">
        <button type="button" data-close="modal" class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">Cancel</button>
        <button type="submit" class="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500">Save</button>
      </div>
    </form>
  `;

  openModal(formHtml, (formData) => {
    const problem = {
      id: `prob-${Date.now()}`,
      title: formData.get('title'),
      description: formData.get('description'),
      status: formData.get('status'),
      villageName: appState.currentUser.villageName,
      pincode: appState.currentUser.pincode,
      suggestions: [],
    };
    appState.problems.push(problem);
    saveState();
    renderApp();
  });
}

function openBudgetModal(id = null) {
  const existing = id ? appState.budget.find((item) => item.id === id) : null;
  const formHtml = `
    <form id="budget-modal-form" class="space-y-4 p-6">
      <div class="flex items-center justify-between">
        <h3 class="text-2xl font-bold text-slate-800">${existing ? 'Edit' : 'Add'} Budget Item</h3>
        <button type="button" data-close="modal" class="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-100">
          <i data-lucide="x" class="h-4 w-4"></i>
        </button>
      </div>
      <div class="grid gap-4 md:grid-cols-2">
        <div class="md:col-span-2">
          <label class="mb-1 block text-sm font-medium text-slate-700">Project Title</label>
          <input name="title" value="${existing ? existing.title : ''}" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm" required />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700">Sector</label>
          <select name="sector" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm">
            ${['Infrastructure','Sanitation','Education','Healthcare'].map((sector) => `<option value="${sector}" ${existing && existing.sector === sector ? 'selected' : ''}>${sector}</option>`).join('')}
          </select>
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700">Status</label>
          <select name="status" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm">
            ${['Planned','Ongoing','Completed'].map((status) => `<option value="${status}" ${existing && existing.status === status ? 'selected' : ''}>${status}</option>`).join('')}
          </select>
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700">Total Budget</label>
          <input name="totalBudget" type="number" value="${existing ? existing.totalBudget : '0'}" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm" required />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700">Spent Amount</label>
          <input name="spent" type="number" value="${existing ? existing.spent : '0'}" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm" required />
        </div>
      </div>
      <div class="flex justify-end gap-3 pt-2">
        <button type="button" data-close="modal" class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">Cancel</button>
        <button type="submit" class="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500">Save</button>
      </div>
    </form>
  `;

  openModal(formHtml, (formData) => {
    const payload = {
      title: formData.get('title'),
      sector: formData.get('sector'),
      totalBudget: Number(formData.get('totalBudget')),
      spent: Number(formData.get('spent')),
      status: formData.get('status'),
    };

    if (existing) {
      Object.assign(existing, payload);
    } else {
      appState.budget.push({
        id: `budget-${Date.now()}`,
        ...payload,
        villageName: appState.currentUser.villageName,
        pincode: appState.currentUser.pincode,
      });
    }

    saveState();
    renderApp();
  });
}

function openModal(formHtml, onSubmit) {
  modalLayer.classList.remove('hidden');
  modalLayer.innerHTML = `
    <div class="modal-backdrop">
      <div class="modal-card">
        ${formHtml}
      </div>
    </div>
  `;

  const form = modalLayer.querySelector('form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    onSubmit(new FormData(form));
    closeModal();
  });

  modalLayer.querySelectorAll('[data-close="modal"]').forEach((button) => {
    button.addEventListener('click', closeModal);
  });

  initLucide();
}

function closeModal() {
  modalLayer.classList.add('hidden');
  modalLayer.innerHTML = '';
}

loginTab.addEventListener('click', () => setAuthMode('login'));
registerTab.addEventListener('click', () => setAuthMode('register'));
roleButtons.forEach((button) => button.addEventListener('click', () => setRole(button.dataset.role)));
document.getElementById('logoutBtn').addEventListener('click', logout);
navButtons.forEach((button) => button.addEventListener('click', () => setActiveTab(button.dataset.tab)));

setAuthMode('login');
setRole('admin');
renderApp();
