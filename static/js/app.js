const state = { profile: null }
async function fetchProfile() {
    try {
        const res = await fetch('/api/profile')
        state.profile = await res.json()
        applyProfile()
    } catch (e) {
        console.error('Не удалось загрузить профиль', e)
    }
}


function applyProfile() {
    if (!state.profile) return
    document.getElementById('name').textContent = state.profile.name
    document.getElementById('role').textContent = state.profile.role
    document.getElementById('intro-text').textContent = state.profile.intro
    document.getElementById('year').textContent = new Date().getFullYear()
    buildSkills(state.profile.skills)
}


function buildSkills(skills) {
    const container = document.getElementById('skills-list')
    container.innerHTML = ''
    skills.forEach(s => {
        const el = document.createElement('div'); el.className = 'skill'
        el.innerHTML = `
<div class="meta"><span>${s.name}</span><span>${s.level}%</span></div>
<div class="bar"><div class="progress" style="background:linear-gradient(90deg,var(--accent),#60a5fa);width:0%"></div></div>
`
        container.appendChild(el)
        // анимация при добавлении
        requestAnimationFrame(() => {
            const prog = el.querySelector('.progress')
            setTimeout(() => prog.style.width = s.level + '%', 80)
        })
    })
}


// Тайпрайтер для роли
function typeWriter(el, text, speed = 60) {
    el.textContent = '';
    let i = 0
    const id = setInterval(() => {
        el.textContent += text[i++] || ''
        if (i >= text.length) clearInterval(id)
    }, speed)
}


// Тема
const themeBtn = document.getElementById('theme-toggle')
themeBtn?.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme')
    document.documentElement.setAttribute('data-theme', cur === 'light' ? '' : 'light')
})


// Контактная форма — демонстрационная (не отправляет email)
document.getElementById('contact-form')?.addEventListener('submit', async (e) => {
    e.preventDefault()
    const form = e.target
    const data = Object.fromEntries(new FormData(form))
    // имитация отправки
    const result = document.getElementById('form-result')
    result.textContent = 'Отправка…'
    await new Promise(r => setTimeout(r, 800))
    result.textContent = 'Спасибо! Сообщение получено (демо).'
    form.reset()
})


// Инициализация
window.addEventListener('DOMContentLoaded', () => {
    fetchProfile()
    // легкий тайп
    const roleEl = document.getElementById('role')
    setTimeout(() => typeWriter(roleEl, roleEl.textContent, 60), 400)
})