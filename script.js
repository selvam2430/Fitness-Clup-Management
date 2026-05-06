 
const members = [
  {id:'M001',name:'Mathan',plan:'Premium',join:'Jan 15, 2025',expiry:'Jan 14, 2026',status:'active',initials:'AS',color:'#E8FF00'},
  {id:'M002',name:'Priya',plan:'Standard',join:'Feb 3, 2025',expiry:'Feb 2, 2026',status:'active',initials:'PN',color:'#38BDF8'},
  {id:'M003',name:'Ravi Kumar',plan:'Trial',join:'Apr 28, 2026',expiry:'May 5, 2026',status:'trial',initials:'RK',color:'#FF4D1C'},
  {id:'M004',name:'Divya',plan:'Premium',join:'Mar 10, 2025',expiry:'Mar 9, 2026',status:'active',initials:'DM',color:'#22C55E'},
  {id:'M005',name:'Sanjay Kumar',plan:'Standard',join:'Dec 1, 2024',expiry:'Nov 30, 2025',status:'expired',initials:'KS',color:'#888'},
  {id:'M006',name:'Aron Dhass',plan:'Premium',join:'Apr 1, 2026',expiry:'Mar 31, 2027',status:'active',initials:'AR',color:'#a78bfa'},
  {id:'M007',name:'Suresh Dev',plan:'Standard',join:'Feb 20, 2025',expiry:'Feb 19, 2026',status:'active',initials:'SD',color:'#fb923c'},
  {id:'M008',name:'Meena',plan:'Trial',join:'Apr 29, 2026',expiry:'May 6, 2026',status:'trial',initials:'MP',color:'#f472b6'},
];

const classes = [
  {name:'Power Yoga',trainer:'Anto Dass',time:'06:00',day:'Mon',spots:8,capacity:20,category:'Yoga'},
  {name:'HIIT Blast',trainer:'Vikram',time:'07:30',day:'Mon',spots:2,capacity:15,category:'Cardio'},
  {name:'Zumba Dance',trainer:'Joel Mardin',time:'09:00',day:'Tue',spots:12,capacity:25,category:'Dance'},
  {name:'Strength & Conditioning',trainer:'Adhityan',time:'18:00',day:'Wed',spots:5,capacity:12,category:'Strength'},
  {name:'Pilates Core',trainer:'Antriv',time:'10:00',day:'Thu',spots:6,capacity:15,category:'Pilates'},
  {name:'Boxing Basics',trainer:'Sugan Kumar',time:'19:30',day:'Fri',spots:3,capacity:10,category:'Combat'},
  {name:'Body Pump',trainer:'Selvam',time:'08:00',day:'Sat',spots:1,capacity:20,category:'Strength'},
  {name:'Meditation Flow',trainer:'Anita',time:'07:00',day:'Sun',spots:10,capacity:20,category:'Wellness'},
];

const checkins = [
  {time:'09:42',name:'Mathan',type:'Check-In'},
  {time:'09:38',name:'Priya',type:'Check-In'},
  {time:'09:31',name:'Aron Dhass',type:'Check-In'},
  {time:'09:15',name:'Sanjay Kumar',type:'Check-In'},
  {time:'08:55',name:'Divya',type:'Check-In'},
];

let currentFilter = 'all';
let currentDayFilter = 'all';

function showPage(name, btn) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
  if(btn) btn.classList.add('active');
  if(name === 'dashboard') renderDashboard();
  if(name === 'members') renderMembers();
  if(name === 'checkin') startClock();
  if(name === 'schedule') renderSchedule();
  if(name === 'reports') renderReports();
}

function animateCounter(id, target, prefix='', suffix='') {
  const el = document.getElementById(id);
  if(!el) return;
  let cur = 0;
  const step = Math.ceil(target / 40);
  const timer = setInterval(() => {
    cur = Math.min(cur + step, target);
    el.textContent = prefix + cur.toLocaleString() + suffix;
    if(cur >= target) clearInterval(timer);
  }, 30);
}

function renderDashboard() {
  animateCounter('counter-members', 1284);
  animateCounter('counter-active', 87);
  animateCounter('counter-revenue', 420000, '₹');
  animateCounter('counter-classes', 6);

  const list = document.getElementById('member-list-dash');
  list.innerHTML = members.slice(0,5).map(m => `
    <div class="member-row" onclick="showToast('Viewing ${m.name}')">
      <div class="member-avatar" style="background:${m.color}20;color:${m.color};">${m.initials}</div>
      <div class="member-info">
        <div class="member-name">${m.name}</div>
        <div class="member-plan">${m.plan} · ${m.id}</div>
      </div>
      <span class="badge ${m.status==='active'?'badge-green':m.status==='trial'?'badge-yellow':'badge-red'}">${m.status}</span>
    </div>
  `).join('');

  const attData = [{d:'Mon',v:120},{d:'Tue',v:98},{d:'Wed',v:145},{d:'Thu',v:110},{d:'Fri',v:130},{d:'Sat',v:178},{d:'Sun',v:95}];
  const max = Math.max(...attData.map(a=>a.v));
  document.getElementById('att-bars').innerHTML = attData.map(a => `
    <div class="att-row">
      <div class="att-day">${a.d}</div>
      <div class="att-bar-bg"><div class="att-bar-fill" style="width:${Math.round(a.v/max*100)}%"></div></div>
      <div class="att-val">${a.v}</div>
    </div>
  `).join('');

  document.getElementById('schedule-dash').innerHTML = classes.slice(0,4).map(c => `
    <div class="schedule-item" onclick="showToast('${c.name} — ${c.spots} spots left')">
      <div class="schedule-time">${c.time}</div>
      <div class="schedule-info">
        <div class="schedule-name">${c.name}</div>
        <div class="schedule-trainer">${c.trainer} · ${c.day}</div>
      </div>
      <div class="schedule-spots">${c.spots} left</div>
    </div>
  `).join('');

  document.getElementById('alerts').innerHTML = `
    <div class="alert-item warn"><div class="alert-dot"></div><div class="alert-text">8 memberships expiring this week</div><div class="alert-time">now</div></div>
    <div class="alert-item info"><div class="alert-dot"></div><div class="alert-text">Zumba Dance class is 90% full — add another batch</div><div class="alert-time">1h ago</div></div>
    <div class="alert-item success"><div class="alert-dot"></div><div class="alert-text">₹42,000 collected in billing today</div><div class="alert-time">2h ago</div></div>
    <div class="alert-item warn"><div class="alert-dot"></div><div class="alert-text">Locker 14 reported maintenance issue</div><div class="alert-time">3h ago</div></div>
  `;
}

function renderMembers(filter=currentFilter, search='') {
  let data = members;
  if(filter !== 'all') data = data.filter(m => m.status === filter);
  if(search) data = data.filter(m => m.name.toLowerCase().includes(search.toLowerCase()) || m.id.toLowerCase().includes(search.toLowerCase()));
  document.getElementById('members-tbody').innerHTML = data.map(m => `
    <tr>
      <td>
        <div style="display:flex;align-items:center;gap:10px;">
          <div class="member-avatar" style="background:${m.color}20;color:${m.color};width:32px;height:32px;font-size:12px;">${m.initials}</div>
          <div><div style="font-weight:500;">${m.name}</div><div style="font-size:12px;color:var(--muted);">${m.id}</div></div>
        </div>
      </td>
      <td>${m.plan}</td>
      <td style="color:var(--muted);font-size:13px;">${m.join}</td>
      <td style="color:var(--muted);font-size:13px;">${m.expiry}</td>
      <td><span class="badge ${m.status==='active'?'badge-green':m.status==='trial'?'badge-yellow':'badge-red'}">${m.status}</span></td>
      <td>
        <button onclick="showToast('Editing ${m.name}')" style="background:transparent;border:1px solid #3a3a3a;border-radius:6px;padding:5px 12px;color:var(--muted);font-family:'DM Sans',sans-serif;font-size:12px;cursor:pointer;">Edit</button>
      </td>
    </tr>
  `).join('');
}

function filterMembers(val) { renderMembers(currentFilter, val); }
function setFilter(f, btn) {
  currentFilter = f;
  document.querySelectorAll('.search-bar .filter-chip').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderMembers(f);
}

function renderSchedule(day=currentDayFilter) {
  let data = classes;
  if(day !== 'all') data = data.filter(c => c.day === day);
  document.getElementById('schedule-full').innerHTML = data.map(c => {
    const pct = Math.round((c.capacity - c.spots) / c.capacity * 100);
    return `
      <div class="schedule-item" onclick="showToast('Booking ${c.name}...')">
        <div class="schedule-time">${c.time}</div>
        <div class="schedule-info">
          <div class="schedule-name">${c.name} <span style="font-size:11px;color:var(--muted);margin-left:6px;">${c.day}</span></div>
          <div class="schedule-trainer">${c.trainer} · ${c.category}</div>
          <div style="margin-top:6px;background:var(--surface2);border-radius:4px;height:4px;width:200px;overflow:hidden;">
            <div style="height:100%;width:${pct}%;background:${pct>80?'var(--accent)':'var(--brand)'};border-radius:4px;"></div>
          </div>
        </div>
        <div style="text-align:right;">
          <div class="schedule-spots">${c.spots} / ${c.capacity}</div>
          <div style="font-size:11px;color:var(--muted);">spots left</div>
          <button onclick="event.stopPropagation();showToast('Booked ${c.name}!')" style="margin-top:8px;background:var(--brand);color:var(--dark);border:none;padding:5px 12px;border-radius:6px;font-size:12px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;">Book</button>
        </div>
      </div>
    `;
  }).join('');
}

function setDayFilter(d, btn) {
  currentDayFilter = d;
  document.querySelectorAll('#day-filters .filter-chip').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderSchedule(d);
}

function renderReports() {
  const revData = [{m:'Nov',v:310000},{m:'Dec',v:370000},{m:'Jan',v:340000},{m:'Feb',v:390000},{m:'Mar',v:415000},{m:'Apr',v:420000}];
  const max = Math.max(...revData.map(r=>r.v));
  document.getElementById('rev-chart').innerHTML = revData.map(r => `
    <div class="rev-bar-wrap">
      <div class="rev-bar-bg">
        <div class="rev-bar" style="height:${Math.round(r.v/max*100)}%"></div>
      </div>
      <div class="rev-month">${r.m}</div>
    </div>
  `).join('');

  document.getElementById('billing-list').innerHTML = [
    {name:'Mathan',amt:'₹4,999',date:'Apr 30'},
    {name:'Sanjay Kumar',amt:'₹4,999',date:'Apr 30'},
    {name:'Priya',amt:'₹2,999',date:'Apr 29'},
    {name:'Suresh Dev',amt:'₹2,999',date:'Apr 29'},
    {name:'Meena',amt:'₹999',date:'Apr 29'},
  ].map(b => `
    <div class="bill-row">
      <div class="bill-name">${b.name}</div>
      <div class="bill-amount">${b.amt}</div>
      <div class="bill-date">${b.date}</div>
    </div>
  `).join('');

  document.getElementById('plan-dist').innerHTML = [
    {plan:'Premium',count:486,pct:38,color:'var(--brand)'},
    {plan:'Standard',count:628,pct:49,color:'var(--info)'},
    {plan:'Trial',count:170,pct:13,color:'var(--accent)'},
  ].map(p => `
    <div>
      <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
        <span style="font-size:13px;">${p.plan}</span>
        <span style="font-size:13px;color:var(--muted);">${p.count} (${p.pct}%)</span>
      </div>
      <div style="background:var(--surface2);border-radius:4px;height:6px;overflow:hidden;">
        <div style="height:100%;width:${p.pct}%;background:${p.color};border-radius:4px;"></div>
      </div>
    </div>
  `).join('');

  document.getElementById('top-classes').innerHTML = [
    {name:'Body Pump',att:19,color:'var(--brand)'},
    {name:'Zumba Dance',att:18,color:'var(--info)'},
    {name:'HIIT Blast',att:14,color:'var(--accent)'},
    {name:'Power Yoga',att:13,color:'#a78bfa'},
  ].map(c => `
    <div style="display:flex;align-items:center;gap:10px;">
      <div style="width:8px;height:8px;border-radius:50%;background:${c.color};flex-shrink:0;"></div>
      <div style="font-size:13px;flex:1;">${c.name}</div>
      <div style="font-size:13px;font-weight:600;color:${c.color};">${c.att}</div>
    </div>
  `).join('');

  document.getElementById('trainer-perf').innerHTML = [
    {name:'Vikram',rating:'4.9',classes:12},
    {name:'Joel Mardin',rating:'4.8',classes:10},
    {name:'Adhityan',rating:'4.7',classes:8},
    {name:'Anto Dass',rating:'4.6',classes:9},
  ].map(t => `
    <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid #1e1e1e;">
      <div class="member-avatar" style="background:rgba(232,255,0,0.1);color:var(--brand);width:32px;height:32px;font-size:11px;flex-shrink:0;">${t.name.split(' ').map(n=>n[0]).join('')}</div>
      <div style="flex:1;"><div style="font-size:13px;font-weight:500;">${t.name}</div><div style="font-size:11px;color:var(--muted);">${t.classes} classes/mo</div></div>
      <div style="font-size:14px;font-weight:600;color:var(--brand);">★ ${t.rating}</div>
    </div>
  `).join('');
}

let clockTimer;
function startClock() {
  clearInterval(clockTimer);
  const update = () => {
    const now = new Date();
    document.getElementById('live-clock').textContent = now.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit',second:'2-digit'});
    document.getElementById('live-date').textContent = now.toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
  };
  update();
  clockTimer = setInterval(update, 1000);
  renderCheckins();
}

function renderCheckins() {
  document.getElementById('checkin-feed').innerHTML = checkins.map(c => `
    <div class="checkin-item">
      <div class="checkin-time">${c.time}</div>
      <div class="checkin-dot"></div>
      <div class="checkin-name">${c.name}</div>
      <div class="checkin-type badge badge-green">${c.type}</div>
    </div>
  `).join('');
}

function simulateCheckin() {
  const names = ['Sanjay Kumar','Divya','Mathan','Suresh Dev','Priya'];
  const name = names[Math.floor(Math.random() * names.length)];
  const now = new Date();
  const time = now.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'});
  checkins.unshift({time, name, type:'Check-In'});
  if(checkins.length > 8) checkins.pop();
  renderCheckins();
  showToast(`✅ ${name} checked in!`);
}

const modals = {
  addMember: `
    <div class="modal-title">ADD MEMBER</div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">First Name</label><input class="form-input" placeholder="Arjun" /></div>
      <div class="form-group"><label class="form-label">Last Name</label><input class="form-input" placeholder="Sharma" /></div>
    </div>
    <div class="form-group"><label class="form-label">Email</label><input class="form-input" placeholder="arjun@email.com" /></div>
    <div class="form-group"><label class="form-label">Phone</label><input class="form-input" placeholder="+91 98765 43210" /></div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Plan</label><select class="form-input"><option>Premium</option><option>Standard</option><option>Trial</option></select></div>
      <div class="form-group"><label class="form-label">Duration</label><select class="form-input"><option>1 Month</option><option>3 Months</option><option>6 Months</option><option>1 Year</option></select></div>
    </div>
    <div class="modal-actions">
      <button class="btn-primary" style="flex:1;" onclick="closeModalDirect();showToast('Member added successfully!')">Add Member</button>
      <button class="btn-outline" onclick="closeModalDirect()">Cancel</button>
    </div>
  `,
  addClass: `
    <div class="modal-title">SCHEDULE CLASS</div>
    <div class="form-group"><label class="form-label">Class Name</label><input class="form-input" placeholder="e.g. Power Yoga" /></div>
    <div class="form-group"><label class="form-label">Trainer</label><select class="form-input"><option>Anita Reddy</option><option>Vikram Joshi</option><option>Rahul Singh</option></select></div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Day</label><select class="form-input"><option>Mon</option><option>Tue</option><option>Wed</option><option>Thu</option><option>Fri</option><option>Sat</option><option>Sun</option></select></div>
      <div class="form-group"><label class="form-label">Time</label><input class="form-input" type="time" value="07:00" /></div>
    </div>
    <div class="form-group"><label class="form-label">Capacity</label><input class="form-input" type="number" placeholder="20" /></div>
    <div class="modal-actions">
      <button class="btn-primary" style="flex:1;" onclick="closeModalDirect();showToast('Class scheduled!')">Schedule</button>
      <button class="btn-outline" onclick="closeModalDirect()">Cancel</button>
    </div>
  `,
  billing: `
    <div class="modal-title">BILLING</div>
    <div class="form-group"><label class="form-label">Member ID / Name</label><input class="form-input" placeholder="Search member..." /></div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Amount (₹)</label><input class="form-input" type="number" placeholder="4999" /></div>
      <div class="form-group"><label class="form-label">Payment Mode</label><select class="form-input"><option>UPI</option><option>Card</option><option>Cash</option><option>Net Banking</option></select></div>
    </div>
    <div class="form-group"><label class="form-label">Notes</label><input class="form-input" placeholder="e.g. Annual Premium renewal" /></div>
    <div class="modal-actions">
      <button class="btn-primary" style="flex:1;" onclick="closeModalDirect();showToast('Payment recorded! ₹4,999')">Record Payment</button>
      <button class="btn-outline" onclick="closeModalDirect()">Cancel</button>
    </div>
  `
};

function showModal(type) {
  document.getElementById('modal-body').innerHTML = modals[type] || '';
  document.getElementById('modal-overlay').classList.add('open');
}

function closeModal(e) {
  if(e.target === document.getElementById('modal-overlay')) closeModalDirect();
}

function closeModalDirect() {
  document.getElementById('modal-overlay').classList.remove('open');
}

let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2500);
}

renderDashboard();
