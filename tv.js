class Tv {
  constructor(brand, channel, volume) {
    this.brand = brand;
    this.channel = channel;
    this.volume = volume;
  }

  increase(amount) {
    this.volume += amount;
    if (this.volume >= 100) {
      this.volume = 100;
    }
  }

  decrease(amount) {
    this.volume -= amount;
    if (this.volume <= 0) {
      this.volume = 0;
    }
  }

  reset() {
    this.volume = 50;
    this.channel = 1;
  }

  status() {
    return (
      this.brand + " at channel " + this.channel + ", volume  " + this.volume
    );
  }
}

window.onload = () => {
  displayTvBrand(myTv);
  displayTvChannel(myTv);
  displayTvVolume(myTv);
  displayTvStatus(myTv);
  addEvents(myTv);
};

const myTv = new Tv("Samsung", 1, 50);

const displayTvBrand = (myTv) => {
  const brandText = document.getElementById("tv-brand");
  brandText.innerHTML = myTv.brand;
};

const displayTvChannel = (myTv) => {
  const channelText = document.getElementById("tv-channel");
  channelText.innerHTML = myTv.channel;
};

const displayTvVolume = (myTv) => {
  const volumeText = document.getElementById("tv-volume");
  volumeText.innerHTML = myTv.volume;
};

const displayTvStatus = (myTv) => {
  const statusText = document.getElementById("tv-status");
  statusText.innerHTML = myTv.status(myTv);
};

const addEvents = (myTv) => {
  const increaseVolumeButton = document.getElementById("increase-volume");
  increaseVolumeButton.addEventListener("click", () => increaseVolume(myTv));
  const decreaseVolumeButton = document.getElementById("decrease-volume");
  decreaseVolumeButton.addEventListener("click", () => decreaseVolume(myTv));
  const channelButton = document.getElementById("change-channel");
  channelButton.addEventListener("click", () => setChannel(myTv));
  const deleteButton = document.getElementById("reset");
  deleteButton.addEventListener("click", () => resetTv(myTv));
};

const increaseVolume = (myTv) => {
  myTv.increase(5);
  displayTvVolume(myTv);
  displayTvStatus(myTv);
};

const decreaseVolume = (myTv) => {
  myTv.decrease(5);
  displayTvVolume(myTv);
  displayTvStatus(myTv);
};

const setChannel = (myTv) => {
  const channelInput = document.getElementById("channel");
  let newChannel = channelInput.value;
  if (newChannel < 1) {
    newChannel = 1;
  } else if (newChannel > 50) {
    newChannel = 50;
  }
  myTv.channel = newChannel;
  displayTvChannel(myTv);
  displayTvStatus(myTv);
};

const resetTv = (myTv) => {
  myTv.reset();
  displayTvVolume(myTv);
  displayTvChannel(myTv);
  displayTvStatus(myTv);
};

//1) Create a TV class with properties like brand, channel and volume.
//    Specify brand in a constructor parameter. Channel should be 1 by default. Volume should be 50 by default.
//2) Add methods to increase and decrease volume. Volume can't never be below 0 or above 100.
//3) Add a method to set the channel. Let's say the TV has only 50 channels so if you try to set channel 60 the TV will stay at the current channel.
//4) Add a method to reset TV so it goes back to channel 1 and volume 50. (Hint: consider using it from the constructor).
//5) It's useful to write a status, that returns info about the TV status like: "Panasonic at channel 8, volume 75".
