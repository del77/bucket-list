import { Dream } from "./dream.js";

export default class dreamsList {
  dreams = [];
  static userDreams = [];
  static isUserView;
  static dreamsContainer;

  static persist(dream) {
    const userDream = this.userDreams.find((d) => d.title === dream.title);
    console.log(dream);

    if (dream.isTracked) {
      if (userDream) {
        userDream.isTracked = dream.isTracked;
        userDream.isFinished = dream.isFinished;
      } else {
        this.userDreams.push(dream);
      }
    } else {
      if (userDream) {
        this.userDreams.splice(this.userDreams.indexOf(userDream), 1);

        if (this.isUserView) {
          this.removeFromView(dream.id);
        }
      }
    }
    console.log(this.userDreams);
    localStorage.setItem("userDreams", JSON.stringify(this.userDreams));
  }

  static removeFromView(id) {
    const element = document.getElementById(id);
    element.remove();

    this.adjustNoDreamsInfo();
  }

  static adjustNoDreamsInfo() {
    const dreams = document.querySelectorAll(".dream");
    console.log(dreams);
    if (dreams.length == 0) {
      console.log(this.dreamsContainer);

      const infoElement = document.createElement("div");
      infoElement.className = "no-dreams";
      infoElement.innerHTML = `
        <p>Looks like you haven't added any objectives yet...</p>
        <p>
          <a href="/catalogue.html">Check out our catalogue</a> and make your dreams come
          true!
        </p>
        `;
      this.dreamsContainer.appendChild(infoElement);
    } else {
      console.log("test");
      const noDreamsEl = document.querySelector(".no-dreams");

      if (noDreamsEl) {
        noDreamsEl.remove();
      }
    }
  }

  static loadUserDreams() {
    let dreams = JSON.parse(localStorage.getItem("userDreams"));

    if (!dreams) {
      dreams = [];
    }

    for (const dream of dreams) {
      const d = new Dream(
        dream.id,
        dream.title,
        dream.imgUrl,
        dream.isTracked,
        dream.isFinished
      );
      this.userDreams.push(d);
    }
  }

  static renderDreamsCatalogue() {
    this.dreams = [
      new Dream("1", "Go to Africa", "/img/dreams/africa.jpg"),
      new Dream("2", "Go to Africa2", "/img/dreams/africa.jpg"),
      new Dream("3", "Go to Africa3", "/img/dreams/africa.jpg"),
      new Dream("4", "Go to Africa4", "/img/dreams/africa.jpg"),
      new Dream("5", "Go to Africa5", "/img/dreams/africa.jpg"),
      new Dream("6", "Go to Africa6", "/img/dreams/africa.jpg"),
    ];

    this.dreamsContainer = document.querySelector("div.dreams");
    this.isUserView = false;

    this.loadUserDreams();

    for (const dream of this.dreams) {
      const userDream = this.userDreams.find((d) => d.title === dream.title);
      if (userDream && userDream.isTracked) {
        dream.isTracked = true;
        dream.isFinished = userDream.isFinished;
      }

      this.dreamsContainer.appendChild(dream.render(false));
    }
  }

  static renderUserDreams() {
    this.loadUserDreams();
    this.isUserView = true;

    this.dreamsContainer = document.querySelector("div.dreams");

    for (const dream of this.userDreams) {
      this.dreamsContainer.appendChild(dream.render(true));
    }

    this.adjustNoDreamsInfo();
  }
}
