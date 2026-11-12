/**
 * WildAppy | wildappy.com
 * Copyright (c) 2026 WildAppy. All rights reserved.
 * Boomer interactions and the self-contained Secret Carrot Club game.
 * No third-party JavaScript dependencies or external data collection.
 */

'use strict';
const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());

// -----------------------------------------------------------------------------
// Boomer mascot: click-to-react Easter egg
// -----------------------------------------------------------------------------
const boomerButton = document.getElementById('boomer-button');
const boomerSpeech = document.getElementById('boomer-speech');
const boomerHint = document.getElementById('boomer-hint');
const boomerLines = [
  'Did somebody say snacks?',
  'I was not eating the fence.',
  'Neigh means hello. Usually.',
  'I am the quality control horse.',
  'More apples. Less meetings.',
  'The games are coming. I checked.',
  'Who left this hay here? Oh, me.',
  'I demand a carrot bonus.'
];
let boomerClicks = 0;
let previousLine = -1;
if (boomerButton && boomerSpeech) {
  boomerButton.addEventListener('click', () => {
    boomerClicks += 1;
    let index;
    do { index = Math.floor(Math.random() * boomerLines.length); }
    while (index === previousLine);
    previousLine = index;
    boomerSpeech.textContent = boomerClicks === 5 ? 'Psst... the Carrot Club is open! 🥕' : boomerLines[index];
    boomerButton.classList.remove('is-booming');
    boomerSpeech.classList.remove('pop');
    // Restart the small animations when repeatedly clicked.
    void boomerButton.offsetWidth;
    boomerButton.classList.add('is-booming');
    boomerSpeech.classList.add('pop');
    if (boomerHint) boomerHint.textContent = boomerClicks >= 5 ? '🥕 Secret unlocked! Tap Boomer to play again.' : 'Boomer says: one more time!';
    if (boomerClicks === 5 || (boomerClicks > 5 && carrotModal?.hidden)) openCarrotClub();
  });
  boomerButton.addEventListener('animationend', () => boomerButton.classList.remove('is-booming'));
}

// -----------------------------------------------------------------------------
// Secret Carrot Club: local-only carrot-catching mini-game
// -----------------------------------------------------------------------------
const carrotModal = document.getElementById('carrot-modal');
const carrotDialog = carrotModal?.querySelector('.carrot-dialog');
const carrotClose = document.getElementById('carrot-close');
const carrotPlay = document.getElementById('carrot-play');
const carrotScoreText = document.getElementById('carrot-score');
const carrotTimeText = document.getElementById('carrot-time');
const carrotMessage = document.getElementById('carrot-message');
const carrotHoles = Array.from(document.querySelectorAll('.carrot-hole'));
const carrotGoal = 10;
let carrotScore = 0;
let carrotTime = 25;
let activeCarrot = -1;
let carrotClock = null;
let carrotMover = null;
let carrotPlaying = false;
let lastFocus = null;

function resetCarrotTimers() {
  clearInterval(carrotClock);
  clearInterval(carrotMover);
  carrotClock = null;
  carrotMover = null;
}
function paintCarrotPatch() {
  carrotHoles.forEach((hole, i) => {
    const carrot = carrotPlaying && i === activeCarrot;
    hole.textContent = carrot ? '🥕' : '';
    hole.classList.toggle('has-carrot', carrot);
    hole.setAttribute('aria-label', carrot ? `Catch carrot in patch ${i + 1}` : `Empty patch ${i + 1}`);
    hole.disabled = !carrotPlaying;
  });
}
function moveCarrot() {
  const possibilities = carrotHoles.map((_, i) => i).filter(i => i !== activeCarrot);
  activeCarrot = possibilities[Math.floor(Math.random() * possibilities.length)];
  paintCarrotPatch();
}
function endCarrotGame(won) {
  carrotPlaying = false;
  resetCarrotTimers();
  activeCarrot = -1;
  paintCarrotPatch();
  carrotMessage.textContent = won
    ? '🏆 You did it! Boomer declares you Chief Carrot Officer.'
    : `🐴 Boomer ate ${carrotScore} carrot${carrotScore === 1 ? '' : 's'}. He requests a rematch.`;
  carrotPlay.textContent = 'Play again 🥕';
  carrotPlay.hidden = false;
  carrotPlay.focus();
}
function startCarrotGame() {
  resetCarrotTimers();
  carrotScore = 0;
  carrotTime = 25;
  carrotPlaying = true;
  carrotScoreText.textContent = '0';
  carrotTimeText.textContent = '25';
  carrotMessage.textContent = 'Quick! The carrots are popping up!';
  carrotPlay.hidden = true;
  activeCarrot = -1;
  moveCarrot();
  carrotMover = setInterval(moveCarrot, 1050);
  carrotClock = setInterval(() => {
    carrotTime--;
    carrotTimeText.textContent = String(carrotTime);
    if (carrotTime <= 0) endCarrotGame(false);
  }, 1000);
}
function openCarrotClub() {
  if (!carrotModal) return;
  lastFocus = document.activeElement;
  carrotModal.hidden = false;
  document.body.classList.add('carrot-open');
  resetCarrotTimers();
  carrotPlaying = false;
  carrotScore = 0;
  carrotTime = 25;
  activeCarrot = -1;
  carrotScoreText.textContent = '0';
  carrotTimeText.textContent = '25';
  carrotMessage.textContent = 'Boomer has never met a carrot he didn’t like.';
  carrotPlay.textContent = 'Start feeding 🥕';
  carrotPlay.hidden = false;
  paintCarrotPatch();
  carrotPlay.focus();
}
function closeCarrotClub() {
  if (!carrotModal || carrotModal.hidden) return;
  resetCarrotTimers();
  carrotPlaying = false;
  carrotModal.hidden = true;
  document.body.classList.remove('carrot-open');
  lastFocus?.focus?.();
}
carrotHoles.forEach((hole, i) => {
  hole.addEventListener('click', () => {
    if (!carrotPlaying || i !== activeCarrot) return;
    carrotScore++;
    carrotScoreText.textContent = String(carrotScore);
    carrotMessage.textContent = ['Nom nom! 🐴', 'Boomer approves! ⭐', 'Crunch! 🥕', 'Keep them coming!', 'Excellent carrot work!'][carrotScore % 5];
    if (carrotScore >= carrotGoal) endCarrotGame(true);
    else moveCarrot();
  });
});
carrotPlay?.addEventListener('click', startCarrotGame);
carrotClose?.addEventListener('click', closeCarrotClub);
carrotModal?.querySelector('[data-close-game]')?.addEventListener('click', closeCarrotClub);
document.addEventListener('keydown', event => {
  if (!carrotModal || carrotModal.hidden) return;
  if (event.key === 'Escape') closeCarrotClub();
  if (event.key === 'Tab') {
    const focusable = [carrotClose, ...carrotHoles.filter(h => !h.disabled), carrotPlay].filter(el => el && !el.hidden);
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {event.preventDefault(); last.focus();}
    else if (!event.shiftKey && document.activeElement === last) {event.preventDefault(); first.focus();}
  }
});
