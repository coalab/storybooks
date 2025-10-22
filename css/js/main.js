// ...existing code...
document.addEventListener("DOMContentLoaded", () => {
  const books = [
    {
      title: "받칫고리의 밤",
      description: "AI가 만든 따뜻한 단추들의 이야기",
      cover: "./images/danchu.jpg",
      link: "https://buttonbox.my.canva.site/"
    },
    {title: "호랑이와 빨강 망토",
      description: "아단향의 옛이야기 창작시",
      cover: "./images/sister.jpg",
      link: "https://www.canva.com/design/DAGxb882hR0/uYSkLJXn0vCtvkS5M1YBbA/edit"
    },
    {title: "나는 어쩌면 스무살에 바보가 될거야",
      description: "나는 어쩌면 스무살에 바보가 될거야",
      cover: "./images/mom.jpg",
      link: "https://www.canva.com/design/DAGs9NAYVQU/7V02D0N31HaoBt4L1ZmiKQ/edit"
    },
    {
      title: "빅히어로",
      description: "빅히어로",
      cover: "./images/big.jpg",
      link: "https://gemini.google.com/share/61fd1dbccbf3"
    },
    {title: "가족이란 무엇인가",
      description: "가족이란 무엇인가",
      cover: "./images/family.jpg",
      link: "https://buttonbox.my.canva.site/dag2exxdcsi"
    },
    {title: "한복을 입은 고양이",
      description: "한복을 입은 고양이",
      cover: "./images/cat.jpg",
      link: "https://gemini.google.com/share/0df5235c4e78"
    },
    {title: "토리와 마음의 목소리",
      description: "토리와 마음의 목소리",
      cover: "./images/tori.jpg",
      link: "https://gemini.google.com/share/c6bc5b524dba"
    },
    {title: "엄마는 자유다",
      description: "엄마는 자유다",
      cover: "./images/mom3.jpg",
      link: "https://gemini.google.com/share/fa001b946264"
    },
     {title: "노른자 요정 요요의 대모험",
      description: "노른자 요정 요요의 대모험",
      cover: "./images/yellow.jpg",
      link: "https://gemini.google.com/share/62cda7b104b0"
    },
     {title: "엄마라는 기계",
      description: "엄마라는 기계",
      cover: "./images/mom2.jpg",
      link: "https://www.canva.com/design/DAGuDFgOsHg/4sqoslEShjXV5fBENAdKWA/edit"
    }
    
  ];

  const gallery = document.getElementById("gallery");
  const modal = document.getElementById("modal");
  const modalCover = document.getElementById("modal-cover");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-desc");
  const modalLink = document.getElementById("modal-link");
  const closeBtn = document.querySelector(".close");

  // Canva 링크 안전하게 설정
  function setCanvaLink(url) {
    if (!url || url === '#' || !String(url).trim()) {
      modalLink.href = '#';
      modalLink.classList.add('disabled');
      modalLink.setAttribute('aria-disabled', 'true');
      modalLink.removeAttribute('target');
      modalLink.removeAttribute('rel');
      return;
    }

    try {
      let normalized = String(url).trim();
      if (!/^https?:\/\//i.test(normalized)) normalized = 'https://' + normalized;
      const parsed = new URL(normalized);

      // (선택) canva 도메인 체크 — 필요시 제한하려면 조건 추가
      if (!parsed.hostname.includes('canva.com') && !parsed.hostname.includes('my.canva.site')) {
        console.warn('설정된 링크가 Canva 도메인이 아닙니다:', parsed.hostname);
      }

      modalLink.href = parsed.href;
      modalLink.classList.remove('disabled');
      modalLink.setAttribute('target', '_blank');
      modalLink.setAttribute('rel', 'noopener noreferrer');
      modalLink.removeAttribute('aria-disabled');
    } catch (e) {
      console.error('잘못된 URL:', url, e);
      modalLink.href = '#';
      modalLink.classList.add('disabled');
      modalLink.setAttribute('aria-disabled', 'true');
      modalLink.removeAttribute('target');
      modalLink.removeAttribute('rel');
    }
  }

  // 카드 생성
  books.forEach(book => {
    const card = document.createElement("div");
    card.className = "book-card";
    card.innerHTML = `
      <img src="${book.cover}" alt="${book.title}">
      <h3>${book.title}</h3>
      <p>${book.description}</p>
    `;
    gallery.appendChild(card);

    // 클릭 시 모달 열기 (Canva 링크 설정 포함)
    card.addEventListener("click", () => {
      modalCover.src = book.cover;
      modalTitle.textContent = book.title;
      modalDesc.textContent = book.description;
      setCanvaLink(book.link);
      modal.style.display = "block";
    });
  });

  // 모달 닫기
  closeBtn.addEventListener("click", () => (modal.style.display = "none"));
  window.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
  });

  // 비활성된 링크 클릭 방지
  modalLink.addEventListener('click', function (e) {
    if (modalLink.getAttribute('href') === '#' || modalLink.classList.contains('disabled')) {
      e.preventDefault();
    }
  });
});
// ...existing code...