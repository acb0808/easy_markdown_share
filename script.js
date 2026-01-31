const input = document.getElementById('markdown-input');
const preview = document.getElementById('preview-area');
const qrcodeDiv = document.getElementById('qrcode');
const urlCode = document.getElementById('generated-url');

// QR 객체 생성 (초기 1회)
const qrcode = new QRCode(qrcodeDiv, { width: 200, height: 200, colorDark: "#1e293b" });

function update() {
    const val = input.value;
    
    if(val.trim()) {
        // 기존 btoa 방식 대신 압축(compressToEncodedURIComponent) 사용
        const compressed = LZString.compressToEncodedURIComponent(val);
        const finalUrl = window.location.origin + window.location.pathname.replace('qr_maker.html', 'show.html') + '#' + compressed;
        
        urlCode.innerText = finalUrl;
        qrcode.makeCode(finalUrl);
    }
}
function insertText(type) {
    const start = input.selectionStart;
    const end = input.selectionEnd;
    let tag = "";

    const snippets = {
        h1: "# 제목\n",
        bold: "**텍스트**",
        italic: "*텍스트*",
        link: "[이름](https://)",
        image: "![설명](이미지주소)",
        table: "\n| 제목 | 내용 |\n|---|---|\n|  |  |\n",
        check: "\n- [ ] 항목"
    };

    input.setRangeText(snippets[type], start, end, 'select');
    update();
}

function showTab(name) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('content-visible'));
    document.querySelectorAll('.tab-link').forEach(l => l.classList.remove('active'));
    
    document.getElementById(name + '-area').classList.add('content-visible');
    event.currentTarget.classList.add('active');
}

function copyUrl() {
    navigator.clipboard.writeText(urlCode.innerText);
    alert('QR 연결 주소가 복사되었습니다!');
}

input.addEventListener('input', update);