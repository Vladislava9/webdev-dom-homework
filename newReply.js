const commentElements = document.querySelectorAll('.comment');

export const newReply = () => {
    const textInputElement = document.getElementById("text-input");
    commentElements.forEach((commentElement, index) => {
      commentElement.addEventListener('click', (event) => {
        event.stopPropagation();
        const originalText = `${users[index].author.name} : ${users[index].text
          .replaceAll('<div class="quote">', '')
          .replaceAll('</div', '')}`;
        textInputElement.value = originalText;
      })
    });
  };