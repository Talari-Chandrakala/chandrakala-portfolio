// modal & tab logic
const modal = document.getElementById('codeModal');
const backdrop = document.getElementById('backdrop');
const closeBtn = document.getElementById('closeBtn');
const codeBlock = document.getElementById('codeBlock');
const modalTitle = document.getElementById('modalTitle');
const copyBtn = document.getElementById('copyBtn');
const tabs = Array.from(document.querySelectorAll('.tab'));

let currentSnippets = { html: '', css: '', js: '' };
let currentTab = 'html';

function openModalForSkill(skillName, snippets){
  modal.setAttribute('aria-hidden','false');
  modalTitle.textContent = skillName;
  currentSnippets = snippets;
  showTab('html');
  document.body.style.overflow = 'hidden';
}

function closeModal(){
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}

// set content for tab
function showTab(tab){
  currentTab = tab;
  tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  let text = currentSnippets[tab] ?? '';
  // if text is JSON-escaped string, keep it safe
  codeBlock.textContent = text;
}

// copy
async function copyCode(){
  try{
    await navigator.clipboard.writeText(codeBlock.textContent);
    copyBtn.textContent = 'Copied';
    setTimeout(()=> copyBtn.textContent = 'Copy', 1400);
  }catch(e){
    copyBtn.textContent = 'Failed';
    setTimeout(()=> copyBtn.textContent = 'Copy', 1400);
  }
}

// wire skill buttons
document.querySelectorAll('.skill-card').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const skill = btn.dataset.skill || 'Skill';
    // data-snippets is a JSON string (escaped in HTML). Parse safely:
    const raw = btn.dataset.snippets || '{}';
    let parsed = {};
    try{
      parsed = JSON.parse(raw);
    }catch(e){
      // fallback empty
      parsed = { html: '', css: '', js: '' };
    }
    // ensure all keys present
    parsed.html = parsed.html ?? '';
    parsed.css = parsed.css ?? '';
    parsed.js = parsed.js ?? '';
    openModalForSkill(skill, parsed);
  });
});

// close actions
closeBtn.addEventListener('click', closeModal);
backdrop.addEventListener('click', closeModal);
document.addEventListener('keydown', (e)=> {
  if(e.key === 'Escape') closeModal();
});

// tab buttons
tabs.forEach(t => t.addEventListener('click', ()=> showTab(t.dataset.tab)));
copyBtn.addEventListener('click', copyCode);
