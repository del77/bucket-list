import dreamsList from "./dreamsList.js";

export class Dream {
  id;
  title;
  imgUrl;
  isTracked;
  isFinished;
  trackBtn;
  finishBtn;

  constructor(id, title, imgUrl, isTracked = false, isFinished = false) {
    this.id = id;
    this.title = title;
    this.imgUrl = imgUrl;
    this.isTracked = isTracked;
    this.isFinished = isFinished;
  }

  render(isUserView) {
    const el = document.createElement("div");

    el.id = this.id;
    el.className = "dream";
    el.innerHTML = `
            <img src="${this.imgUrl}" alt="dream logo" class="dream-logo">
            <div class="dream-title">
                <h3>${this.title}</h3>
            </div>
        `;

    const dreamNavigationEl = document.createElement("div");
    dreamNavigationEl.className = "dream-navigation";

    if (isUserView && this.isTracked) {
      this.finishBtn = document.createElement("div");
      this.finishBtn.className = "btn";
      this.finishBtn.addEventListener("click", this.toggleFinishedHandler.bind(this));
      this.finishBtn.textContent = this.isFinished ? "Mark as unfinished" : "Mark as finished";

      dreamNavigationEl.appendChild(this.finishBtn);
    } else {

    }
    this.trackBtn = document.createElement("div");
    this.trackBtn.className = "btn";
    this.trackBtn.addEventListener("click", this.toggleTrackHandler.bind(this));
    this.trackBtn.textContent = this.isTracked ? "Remove" : "Track";

    dreamNavigationEl.appendChild(this.trackBtn);

    el.append(dreamNavigationEl);

    return el;
  }

  toggleTrackHandler() {
    if (this.isTracked) {
      this.trackBtn.textContent = "Track";
    } else {
      this.trackBtn.textContent = "Remove";
    }

    this.isTracked = !this.isTracked;
    dreamsList.persist(this);
  }

  toggleFinishedHandler() {
    if(this.isFinished) {
      this.finishBtn.textContent = "Mark as finished";
    } else {
      this.finishBtn.textContent = "Mark as unfinished";
    }

    this.isFinished = !this.isFinished;
    dreamsList.persist(this);
  }
}
