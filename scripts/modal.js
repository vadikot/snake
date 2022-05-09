'use strict';

let modal = {
    modalEl: document.getElementById("modal"),
    modalBodyHTML: '',
    createNew(title, bodyText, footerText, state) {

        if (state == 'start') {
            this.startTemplate(title, bodyText, footerText);
        }
        else {
            this.endTemplate(title, bodyText, footerText);
        }

        return this;
    },
    startTemplate(title, bodyText, footerText) {
        this.modalBodyHTML = `<div class="modal-content">
                                <div class="modal-header">
    <!--                                <span class="close" onclick="modal.close();">&times;</span>-->
                                    <h2>${title}</h2>
                                </div>
                                <div class="modal-body start">
                                    <div class="container">
                                        <p>${bodyText}</p>
                                        <div class="modal-btn start" onclick="game.start(snake)">Enter to start</div>
                                    </div>
                                    <div class="container">
                                        <p>Control buttons</p>
                                        <img class="control-buttons" src="img/arrows.png" alt="arrows">
                                    </div>
                                </div>
                                <div class="modal-footer">${footerText}</div>
                              </div>`;
    },
    endTemplate(title, bodyText, footerText) {

        this.modalBodyHTML = `<div class="modal-content">
                                  <div class="modal-header">
    <!--                                <span class="close" onclick="modal.close();">&times;</span>-->
                                    <h2>${title}</h2>
                                  </div>
                                  <div class="modal-body">
                                    <p>${bodyText}</p>
                                    <div class="modal-btn start" onclick="game.restart(snake)">Enter to restart</div>
                                  </div>
                                  <div class="modal-footer">
                                    <h3>${footerText}</h3>
                                  </div>
                              </div>`;
    },
    show() {
        this.modalEl.innerHTML = this.modalBodyHTML;
        this.modalEl.style.display = "flex";
    },
    close() {
        this.modalEl.style.display = "none";
    },
};