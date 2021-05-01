// import { DnD } from './dnd';


class Note {

  data = [];
  editNoteClass = 'card_edit';

  constructor(wrapSelector = null, buttonSelector = null, inputColorElement = null) {
    this.wrapElement = document.querySelector(wrapSelector) || document.body;
    this.buttonElement = document.querySelector(buttonSelector);
    this.inputColorElement = document.querySelector('#colorCard');

    this.#init();

  }

  #init() {
    if (!this.buttonElement) {
      const error = new Error('Вы не указали кнопку!');
      console.error(error);

      return;
    }

    this.#eventListeners()
  };

  #eventListeners() {
    this.buttonElement.addEventListener('click', this.#handleButtonAddNote.bind(this)); // Добавление заметки
    document.addEventListener('dblclick', this.#handleDoubleClick.bind(this)); // редактирование заметки
  };

  #handleButtonAddNote() {
    this.#addNote()
    this.render()
  };

  #handleDoubleClick(event) {
    const { target } = event
    const cardElement = target.closest('.card')

    if (cardElement) {
      cardElement.classList.add(this.editNoteClass)
      // const { id } = cardElement.dataset;
      // const index = this.#getIndexSelectedNote(id);

      // console.log(index)
      // console.log(id)
    }

  }

  #addNote() {
    const noteData = {
      id: new Date().getTime(),
      content: 'text',
      bg: this.inputColorElement.value
    }
    console.log(noteData)
    this.data.push(noteData);
  }

  #templateNote(noteData) {
    const { id, content, bg } = noteData;

    const template = `
      <div data-id="${id}" class="card mt-2" style="background-color: ${bg}">
        <div class="card__content">${content}</div>
        <form class="card__form mt-1">
          <textarea class="w-170 me-4" rows="7" value="${content}"></textarea>
          <button id="submit" type="button" class="btn btn-sm btn-success">Save</button>
        </form>
        <button class="btn btn-sm btn-primary card__close">Close</button>
      </div>
    `

    return template;
  };

  #getIndexSelectedNote(id) {
    let index = 0;

    this.data.forEach((item, i) => {
      if (item.id == id) {
        index = i;
      }
    })

    return index;
  }

  #editNote(index, content){
    this.data[index].content = content;
  }

  render() {
    let templateNotes = '';

    this.data.forEach((item) => {
      templateNotes += this.#templateNote(item);
    });

    this.wrapElement.innerHTML = templateNotes;
  };

  // closeNote() {
  //   this.cardElement.remove()
  // }
}



// new DnD(card)
export { Note };