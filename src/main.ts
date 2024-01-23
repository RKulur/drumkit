import "./style.css";
document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <main class="border-2 border-black h-screen flex flex-col items-center justify-center gap-4 md:gap-6 lg:gap-8">
    <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold">DRUM KIT</h1>
    <section id="drumkit" class="select-none flex gap-4 md:gap-6 lg:gap-8 flex-wrap items-center justify-center px-4"> </section>
 </main>
`;

interface SrcObj {
  key: string[];
  src: string[];
}

const srcObj = {
  key: ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  src: [
    "../sounds/tom.wav",
    "../sounds/tink.wav",
    "../sounds/boom.wav",
    "../sounds/clap.wav",
    "../sounds/kick.wav",
    "../sounds/ride.wav",
    "../sounds/hihat.wav",
    "../sounds/snare.wav",
    "../sounds/openhat.wav",
  ],
};

function importElements(parentElement: Element, srcObj: SrcObj) {
  for (let i = 0; i < srcObj.src.length; i++) {
    const audio = new Audio();
    audio.src = srcObj.src[i];
    audio.dataset.key = srcObj.key[i];

    const keyElem = document.createElement("kbd");
    keyElem.classList.add(
      "border",
      "border-black",
      "py-4",
      "px-6",
      "rounded-md",
    );
    keyElem.id = srcObj.key[i];
    keyElem.innerText = srcObj.key[i].toUpperCase();

    const p = document.createElement("p");
    p.classList.add("text-gray-500", "text-center");
    p.innerText = extractFileName(srcObj.src[i]);

    const div = document.createElement("div");
    div.classList.add("flex", "flex-col", "gap-2");
    div.appendChild(audio);
    div.appendChild(keyElem);
    div.appendChild(p);

    parentElement.appendChild(div);
  }
}

function extractFileName(src: string) {
  const splitSrc = src.split("/");
  return capitalize(splitSrc[splitSrc.length - 1].split(".")[0]);
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.substring(1);
}

const drumkit = document.querySelector("#drumkit");
if (drumkit) importElements(drumkit, srcObj);

document.addEventListener("keydown", (e) => {
  if (e.repeat) return;
  playDrum(e.key);
});

drumkit?.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  playDrum(target.id);
});

function playDrum(key: string) {
  const audio = drumkit?.querySelector(
    `[data-key="${key}"]`,
  ) as HTMLAudioElement;
  const keyElem = drumkit?.querySelector(`#${key}`);
  if (!audio) {
    return;
  }
  audio.currentTime = 0;
  audio.play();

  const classesToAdd = [
    "bg-orange-500",
    "text-white",
    "scale-110",
    "transition-all",
    "font-bold",
    "border-orange-800",
    "drop-shadow-lg",
  ];
  keyElem?.classList.add(...classesToAdd);
  audio.addEventListener("ended", () => {
    keyElem?.classList.remove(...classesToAdd);
  });
}
